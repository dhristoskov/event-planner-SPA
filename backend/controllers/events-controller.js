const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Event = require('../models/event');
const User = require('../models/user');

const getEventsByUserID = async ( req, res ) => {

    let eventsByUserID;
    try{
        eventsByUserID = await User.findById(req.params.id).populate('events');
    }catch(err){
        console.err(err.message);
        res.status(500).send('Server Error');
    }

    if(!eventsByUserID|| eventsByUserID === 0){
        return res.status(404).json({msg: 'Could not find events with this id.'});
    }
    res.json({ events: eventsByUserID.events.map(event => event.toObject({ getters: true })) });
};

const getEventById = async ( req, res ) => {

    let eventById;
    try{
        eventById = await Event.findById(req.params.id);
    }catch(err){
        console.err(err.message);
        res.status(500).send('Server Error');
    };

    if(!eventById){
        return res.status(404).json({ msg: 'Event not found' });
    };

    res.json({event: eventById.toObject({ getters: true}) });
};

const createEvent = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: 'Invalid inputs, please check your data.'});
    };

    const { title, location, eventDate, expGuests, status, creator } = req.body;

    const event = Event({
        title,
        location,
        eventDate,
        expGuests,
        status,
        tasks: [],
        guests: [],
        creator
    });

    let user;
    try{
        user = await User.findById(creator);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    if(!user){
        return res.status(404).json({ msg: 'Could not find user for this id.' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await event.save({session: session});
        user.events.push(event);
        await user.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    res.status(201).json({ event: event });
};

const deleteEvent = async ( req, res ) => {
    
    let eventToDelete;

    try {
        eventToDelete = Event.findById(req.params.id);
        if(!eventToDelete){
            return res.status(404).json({ msg: 'Event not found' });
        }

        await Event.findByIdAndRemove(req.params.id);
        res.send('Event removed successfully');
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateEvent = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: 'Invalid inputs, please check your data.'});
    }
    const { title, location, eventDate, expGuests } = req.body;

    let eventToUpdate;
    try {
        eventToUpdate = await Event.findById(req.params.id);
        if(!eventToUpdate){
            return res.status(404).json({ msg: 'Event not found' })
        }

        eventToUpdate.title = title;
        eventToUpdate.location = location;
        eventToUpdate.eventDate = eventDate;
        eventToUpdate.expGuests = expGuests;

        await eventToUpdate.save();
        res.status(200).json({ event: eventToUpdate.toObject({ getters: true }) });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const statusUpdate = async ( req, res ) => {
    const { status } = req.body;

    let eventToUpdate;
    try {
        eventToUpdate = await Event.findById(req.params.id);
        if(!eventToUpdate){
            return res.status(404).json({ msg: 'Event not found' })
        }

        eventToUpdate.status = status;
        
        await eventToUpdate.save();
        res.status(200).json({ event: eventToUpdate.toObject({ getters: true }) });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    };
}; 

exports.getEventsByUserID = getEventsByUserID;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.updateEvent = updateEvent;
exports.statusUpdate = statusUpdate;