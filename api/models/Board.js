// import mongoose
const mongoose = require('mongoose')

// crée un schema
const boardSchema = mongoose.Schema({
    gameId: { type: String, required: true},

    userId: { type: String, required: true},

    board: { type: Array, required: true }
})

// exporte le shema
module.exports = mongoose.model('Board', boardSchema)