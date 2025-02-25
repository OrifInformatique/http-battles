// import mongoose
const mongoose = require('mongoose')

// crée un schema
const wordSchema = mongoose.Schema({
    content: { type: String, required: true},
    position: { type: Array, required: true },
    revealed: {type: Boolean, required: false}
})

// exporte le shema
module.exports = mongoose.model('Word', wordSchema)