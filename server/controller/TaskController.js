const {User,Task} = require('../models');

class TaskController {
  static getAll(req,res,next){
    Task.findAll({
      include:[User]
    })
    .then(data=>{
      let dataTask = [];
      for (let i in data){
        dataTask.push({
          id: data[i].id,
          title: data[i].title,
          description: data[i].description,
          category: data[i].category,
          UserId: data[i].UserId,
          createdAt: data[i].createdAt,
          updatedAt: data[i].updatedAt,
          UserEmail: data[i].User.email,
          Username: data[i].User.username
        })
      }
      res.status(200).json(dataTask)
    })
    .catch(err=>{
      next(err)
    })
  }

  static create(req,res,next){
    let newTask = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      UserId: req.userData.id
    }

    Task.create(newTask)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static getOne(req,res,next){
    Task.findByPk(req.params.id)
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static edit(req,res,next){
    let newTask = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    }

    Task.update(newTask, {
      where:{
        id:req.params.id
      }
    })
    .then(data=>{
      res.status(200).json(newTask)
    })
    .catch(err=>{
      next(err)
    })
  }

  static delete(req,res,next){
    Task.destroy({
      where: {
        id:req.params.id,
        UserId:req.userData.id
      }
    })
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports=  TaskController;