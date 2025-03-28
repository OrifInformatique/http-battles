// import mongoose
const mongoose = require('mongoose')

// crée un schema definissant un Player
const playerV2Schema = mongoose.Schema({
    gameId: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, required: false }
})

// exporte le shema de Player
module.exports = mongoose.model('PlayerV2', playerV2Schema)