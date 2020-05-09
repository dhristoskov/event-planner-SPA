const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    title: { type: String, required: true, minlength: 3 },
    location: { type: String, required: true, minlength: 3 },
    eventDate: { type: Date, required: true },
    expGuests: { type: Number },
    status: { type: Boolean, default: true },
    tasks:[{type: mongoose.Types.ObjectId, require: true, ref: 'Task'}],
    guests:[{type: mongoose.Types.ObjectId, require: true, ref: 'Guest'}],
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Event', eventSchema);