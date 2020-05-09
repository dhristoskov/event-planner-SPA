const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    age: {type: Number, required: true, min: 10, max: 100},
    email: { type: String, required: true, minlength: 6 },
    gender: { type: String, required: true, default: 'male'},
    isConfirmed: { type: Boolean, default: false },
    toEvent: {type: mongoose.Types.ObjectId, required: true, ref: 'Event'}
})

module.exports = mongoose.model('Guest', guestSchema);