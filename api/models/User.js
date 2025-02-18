// importe mongoose
const mongoose = require('mongoose')
// importe la fonctionalité de hashage de mongoose
const uniqueValidator = require('mongoose-unique-validator')

// crée le schema d'un utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
})

// hash les donnée du shema utilisateur
userSchema.plugin(uniqueValidator)

// export le schema utilisateur en tant que User
module.exports = mongoose.model('User', userSchema)

