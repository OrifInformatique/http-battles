// import mongoose
const mongoose = require('mongoose')

// crée un schema definissant une Party
const gameSchema = mongoose.Schema({
    // text à propos de l'état de la partie
    state: { type: String, required: true },
    // id du créateur
    createurId: { type: String, required: true },
    // id du challenger
    challengerId: { type: String, required: false }
})

// exporte le shema de la party en tant que Game
module.exports = mongoose.model('Game', gameSchema)