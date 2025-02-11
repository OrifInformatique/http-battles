// import mongoose
const mongoose = require('mongoose')

// crée un schema definissant une Party
const gameSchema = mongoose.Schema({
    // text à propos de l'état de la partie
    state: { type: String, required: true},
    // mail de l'utilisateur qui à créé la party
    createurId: { type: String, required: true},
    // nom d'ut'ilisateur du challenger
    challengerId: { type: String, required: false},

    key: { type: String, required: true, unique: true}
})

// exporte le shema de la party en tant que Game
module.exports = mongoose.model('Game', gameSchema)