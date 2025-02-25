// import mongoose
const mongoose = require('mongoose')

// crée un schema
const boardSchema = mongoose.Schema({
    gameId: { type: String, required: true},

    userId: { type: String, required: true},

    board: { type: Array, required: true }
})

boardSchema.index({gameId: 1, userId: 1}, {unique: true})

// exporte le shema
module.exports = mongoose.model('Board', boardSchema)