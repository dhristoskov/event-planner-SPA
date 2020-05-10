const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Guest = require('../models/guest');
const Event = require('../models/event');

const addNewGuest = async ( req, res ) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: 'Invalid inputs, please check your data.'});
    }

    const { firstName, lastName, age, email, gender, isConfirmed, toEvent } = req.body;

    const newGuest = new Guest({
        firstName,
        lastName, 
        age,
        email,
        gender,
        isConfirmed,
        toEvent
    });

    let event;
    try{
        event = await Event.findById(toEvent);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Creating guest failed, please try again');
    };

    if(!event){
        return res.status(404).json({msg: 'Could not find event with this id.'});
    };

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await newGuest.save({session: session});
        event.guests.push(newGuest);
        await event.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message);
        res.status(500).send('Creating task failed, please try again');
    };
        res.status(201).json({ guest: newGuest });
};

const getGuestsByEventId = async ( req, res ) => {

    let guestsByEventId;
    try{
        guestsByEventId = await Event.findById(req.params.id).populate('guests');
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }

    if(!guestsByEventId || guestsByEventId === 0){
        return res.status(404).json({msg: 'Could not find guests with this id.'});
    }

    res.json({ guests: guestsByEventId.guests.map(guest => guest.toObject({ getters: true })) });
};

const getGuestById = async ( req, res ) => {

    let guestById;
    try{
        guestById = await Guest.findById(req.params.id);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    if(!guestById){
        return res.status(404).json({ msg: 'Guest not found' });
    };

    res.json({guest: guestById.toObject({ getters: true}) });
};

const deleteGuest = async ( req, res ) => {

    let guestToDelete
    try{
        guestToDelete = await Guest.findById(req.params.id).populate('toEvent');     
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error, could not delete guest');
    }

    if(!guestToDelete){
        return res.status(404).json({ msg: 'Could not find guest for this id' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await guestToDelete.remove({session: session});
        guestToDelete.toEvent.guests.pull(guestToDelete);
        await guestToDelete.toEvent.save({session: session});
        await session.commitTransaction();
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error, could not delete guest');
    };    

        res.status(200).json({msg: 'Guest Deleted.'});
};

const updateStatus = async ( req, res ) => {

    const { isConfirmed } = req.body;
    let guestToUpdate;
    try{
        guestToUpdate = await Guest.findById(req.params.id);
        if (!guestToUpdate) {
            return res.status(404).json({ msg: 'Guest not found' });
        }

        guestToUpdate.isConfirmed = isConfirmed;
        await guestToUpdate.save();
        res.status(200).json({ guest: guestToUpdate.toObject({ getters: true }) });
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    }
};

const updateGuest = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: 'Invalid inputs, please check your data.'});
    }
    const { firstName, lastName, age, email, gender } = req.body;

    let guestToUpdate;
    try{
        guestToUpdate = await Guest.findById(req.params.id);
        if(!guestToUpdate){
            return res.status(404).json({ msg: 'Guest not found' });
        }

        guestToUpdate.firstName = firstName;
        guestToUpdate.lastName = lastName;
        guestToUpdate.age = age;
        guestToUpdate.email = email;
        guestToUpdate.gender = gender;

        await guestToUpdate.save();
        res.status(200).json({ guest: guestToUpdate.toObject({ getters: true }) });
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addNewGuest = addNewGuest;
exports.getGuestsByEventId = getGuestsByEventId;
exports.getGuestById = getGuestById;
exports.deleteGuest = deleteGuest;
exports.updateGuest = updateGuest;
exports.updateStatus = updateStatus;