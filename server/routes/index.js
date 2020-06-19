const router = require('express').Router();
const UserController = require('../controller/UserController');
const taskRouter = require('./task');
const {authentication} = require('../middleware/auth');
router.get('/',(req,res)=>{
  res.send('kanban aplication')
})


router.post('/login',UserController.login);
router.post('/register',UserController.register);
router.post('/google-sign-in',UserController.googleSignIn);
router.use(authentication)
router.use('/tasks',taskRouter);


module.exports= router;