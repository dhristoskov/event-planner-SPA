const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true, minlength: 6 },
    password: { type: String, required: true, minlength: 6},
    events: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Event' }]
});

module.exports = mongoose.model('User', userSchema);

