const express = require('express');
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

const router = express.Router({ mergeParams: true});

router.use(userController.isLogin);

router.get('/', todoController.getTodos);

router.post('/newTodo', todoController.newTodo);

router.get('/:id/checkTodo', todoController.checkTodo);

router.delete('/:id/deleteTodo', todoController.deleteTodo);

module.exports = router;