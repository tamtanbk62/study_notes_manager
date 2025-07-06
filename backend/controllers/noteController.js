const note = require('../models/Note');

const getNotes = async (req, res) => {
    try {
        const notes = await note.find({userId: req.userId});
        return res.status(200).json(notes);
    }
    catch (err) {
        return res.status(500).json({message: err});
    }
};

const createNote = async (req, res) => {
    try {
        const {title, description, completed, deadline} = req.body;
        const newNote = await note.create({
            title : title,
            description: description,
            completed: completed || false,
            deadline: deadline,
            userId: req.userId
        });
        return res.status(201).json(newNote);
    }
    catch (err) {
        return res.status(500).json({message: err});
    }
};

const updateNoteById = async (req, res) => {
    try{
        const {title, description, completed, deadline} = req.body;
        const updatedNote = await note.findOneAndUpdate({_id: req.params.id, userId: req.userId}, {
            title : title,
            description: description,
            completed: completed || false,
            deadline: deadline,
        }, {new: true});

        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        return res.status(200).json(updatedNote);
    }
    catch (err) {
        return res.status(500).json({message: err});
    }
};

const deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await note.findOneAndDelete({_id: req.params.id, userId: req.userId});
        if(!deletedNote){
            return res.status(404).json({message: "Note not found"});
        }
        return res.status(200).json({message: "Note deleted successfully"});
    }
    catch (err) {
        return res.status(500).json({message: err});
    }
};

module.exports = {getNotes, createNote, updateNoteById, deleteNoteById};