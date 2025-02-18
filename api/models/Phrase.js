// import mongoose
const mongoose = require('mongoose')

// crée un schema
const phraseSchema = mongoose.Schema({

    boardId: { type: String, required: true, unique: true },

    words: { type: Array, required: true }
})

// exporte le shema
module.exports = mongoose.model('Phrase', phraseSchema)