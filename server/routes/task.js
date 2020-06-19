const TaskController = require('../controller/TaskController');
const router = require('express').Router();
const {authorization} = require('../middleware/auth');


router.get('/',TaskController.getAll);
router.post('/',TaskController.create);
router.get('/:id',authorization ,TaskController.getOne);
router.put('/:id',authorization,TaskController.edit);
router.delete('/:id',authorization,TaskController.delete);

module.exports = router;