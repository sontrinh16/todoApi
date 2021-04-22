const Todo = require('./../models/todo');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');


exports.getTodos = catchAsync( async (req, res, next) => {
    let todos = await Todo.find({belongTo: req.user._id});

    res.status(200).json({
        status: 'success',
        todos
    })
})

exports.newTodo = catchAsync( async (req, res, next) => {
    let todo = new Todo(req.body);
    todo.belongTo = req.user._id 

    todo = await todo.save();
    res.status(200).json({
        status: 'success',
        todo
    })
})

exports.checkTodo = catchAsync( async (req, res, next) => {
    let todo = await Todo.findOneAndUpdate({_id: req.params.id},{checked: true}, {
        new: true
    });
    res.status(200).json({
        status: 'success',
        todo
    });
})

exports.deleteTodo = catchAsync( async (req, res, next) => {
    await Todo.findOneAndDelete({_id: req.params.id});
    res.status(200).json({
        status: 'success',
    });
})
