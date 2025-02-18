// import mongoose
const mongoose = require('mongoose')

// crée un schema
const phraseSchema = mongoose.Schema({

    gameId: { type: String, required: true, unique: true },

    userId: { type: String, required: true},

    words: { type: Array, required: true }
})

// exporte le shema
module.exports = mongoose.model('Phrase', phraseSchema)