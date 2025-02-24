// import mongoose
const mongoose = require('mongoose')

// crée un schema
const wordSchema = mongoose.Schema({
    content: { type: String, required: true, unique: true },
    position: {board: { type: Array, required: true }}
})

// exporte le shema
module.exports = mongoose.model('Word', wordSchema)