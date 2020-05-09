const mongoose = require('mongoose');

const taskSchema =  new mongoose.Schema({
    task:{ type: String, required: true, minlength: 3 },
    endDate: {type: Date, required: true},
    isDone:{type: Boolean, default: false},
    toEvent: {type: mongoose.Types.ObjectId, required: true, ref: 'Event'}
});

module.exports = mongoose.model('Task', taskSchema);