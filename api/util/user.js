// import le schema d'un utilisateur
const User = require("../models/User")

exports.getUsername = (userId) =>{
    User.findOne({ _id: userId })
        .then()
        .catch()
}