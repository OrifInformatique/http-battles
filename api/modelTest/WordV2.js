// import mongoose
const mongoose = require('mongoose')

// crée un schema definissant un Word
const wordV2Schema = mongoose.Schema({
    playerId: { type: String, required: true },
    content: { type: String, required: true },
    phrasePosition: { type: String, required: true },
    boardPosition: { type: String, required: true, unique: true },
    status: { type: String, required: false }

})

// exporte le shema de Word
module.exports = mongoose.model('WordV2', wordV2Schema)