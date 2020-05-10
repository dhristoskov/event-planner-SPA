const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Task = require('../models/task');
const Event = require('../models/event');

const createTask = async ( req, res ) => { 

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: 'Invalid inputs, please check your data.'});
    }

    const { task, endDate, isDone, toEvent } = req.body;

    const newToDo= new Task({
        task,
        endDate, 
        isDone,
        toEvent
    });

    let event;
    try{
        event = await Event.findById(toEvent);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Creating task failed, please try again');
    };

    if(!event){
        return res.status(404).json({msg: 'Could not find event with this id.'});
    };

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await newToDo.save({session: session});
        event.tasks.push(newToDo);
        await event.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message);
        res.status(500).send('Creating task failed, please try again');
    };

        res.status(201).json({ task: newToDo });
};

const getAllTasks = async ( req, res ) => {

    let tasks;
    try{
        tasks = await Task.find({})
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }

    res.json({ tasks: tasks.map(task => task.toObject({ getters: true })) });
};

const getTasksByEventId = async ( req, res ) => {

    let tasksByEventId;
    try{
        tasksByEventId = await Event.findById(req.params.id).populate('tasks');
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }

    if(!tasksByEventId || tasksByEventId === 0){
        return res.status(404).json({msg: 'Could not find tasks with this id.'});
    }

    res.json({ tasks: tasksByEventId.tasks.map(task => task.toObject({ getters: true })) });
};

const deleteTask = async ( req, res ) => {

    let taskToDelete
    try{
        taskToDelete = await Task.findById(req.params.id).populate('toEvent');     
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error, could not delete task');
    }

    if(!taskToDelete){
        return res.status(404).json({ msg: 'Could not find task for this id' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await taskToDelete.remove({session: session});
        taskToDelete.toEvent.tasks.pull(taskToDelete);
        await taskToDelete.toEvent.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error, could not delete task');
    }    

        res.status(200).json({msg: 'Task Deleted.'})
};

const updateStatus = async ( req, res ) => {

    const { isDone } = req.body;
    let taskToUpdate;
    try{
        taskToUpdate = await Task.findById(req.params.id);
        if (!taskToUpdate) {
            return res.status(404).json({ msg: 'Task not found' })
        }

        taskToUpdate.isDone = isDone;
        await taskToUpdate.save();
        res.status(200).json({ task: taskToUpdate.toObject({ getters: true }) });
    }catch(err){
        console.errors(err.message)
        res.status(500).send('Server Error')
    }
};

exports.createTask = createTask;
exports.getAllTasks = getAllTasks;
exports.deleteTask = deleteTask;
exports.updateStatus = updateStatus;
exports.getTasksByEventId = getTasksByEventId;