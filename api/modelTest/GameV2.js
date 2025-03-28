// import mongoose
const mongoose = require('mongoose')

// crée un schema definissant un Game
const gameV2Schema = mongoose.Schema({
    // id du créateur
    creatorId: { type: String, required: true },
    status: { type: String, required: false }
})

// exporte le shema de la party en tant que Game
module.exports = mongoose.model('GameV2', gameV2Schema)