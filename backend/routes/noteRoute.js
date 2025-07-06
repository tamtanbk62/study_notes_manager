const express = require('express');
const {getNotes, createNote, updateNoteById, deleteNoteById} = require('../controllers/noteController');
const auth = require('../middlewares/authMiddleware');

const noteRouter = express.Router();

noteRouter.get('/', auth, getNotes);
noteRouter.post('/', auth, createNote);
noteRouter.put('/:id', auth, updateNoteById);
noteRouter.delete('/:id', auth, deleteNoteById);

module.exports = noteRouter;