const {User} = require('../models');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const {jwtSign} = require('../helper/jwtHelper')
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')

class UserController {
  static login(req,res,next){
    let userLogin = {
      email: req.body.email,
      password: req.body.password
    }
    console.log("userlogin>>>  ", req.body);
    User.findOne({
      where: {
        [Op.or]: [{email: userLogin.email}, {username: userLogin.email}]
      }
    })
    .then(data=>{
      console.log(">>Sign Berhasil")
      if(!data){
        next({name:"USER_NOT_FOUND"})
      }
      if (bcrypt.compareSync(userLogin.password, data.password)){
        let token = jwtSign({id: data.id, username:data.username})
        return res.status(200).json({
          access_token:token,
          currentUser: {
            id:data.id,
            email:data.email,
            username:data.username
          }
        })
      } else {
        return res.status(403).json('password salah')
      }
    })
    .catch(err =>{
      console.log(">>Sign Gagal",err)
      res.status(500).json(err)
    })
  }

  static register(req,res,next){
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
    .then(data=>{
      res.status(201).json({
        id:data.id,
        username:data.username,
        email:data.email
      })
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static googleSignIn(req,res,next){
    const token = req.body.id_token;
    let recent_email = null

    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      console.log(ticket);
      const payload = ticket.getPayload();
      recent_email = payload.email;
      return User.findOne({
      where: { email: recent_email }
      })
    })
    .then( isUser => {
      if (isUser) {
        const access_token = jwt.sign( {id: isUser.id, email: isUser.email}, process.env.SECRET)
        return res.status(200).json({
        access_token,
        currentUser:{
          id: isUser.id,
          username: isUser.email,
          email: isUser.email
        }
      })
      } else { 
        return User.create({
          username: 'User' + Math.floor(Math.random()*100000).toString() ,
          email: recent_email,
          password: 'randomPassword'
        })
      }
    })
    .then(newUser =>{
        const access_token = jwt.sign( {id: newUser.id, email: newUser.email}, process.env.SECRET)
        res.status(200).json({
            access_token,
            currentUser:{
              id: newUser.id,
              username: newUser.email,
              email: newUser.email
            }
        })
    })
    .catch(err => {
      console.log(err);
        next(err)
    })        
  }
  
}

module.exports= UserController;