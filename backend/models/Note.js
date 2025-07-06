const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    deadline: {
        type: Date
    }
},{timestamps: true});

module.exports = mongoose.model("Note", noteSchema);