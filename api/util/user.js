// import le schema d'un utilisateur
const User = require("../models/User")

exports.getUserById = (userId) => {
    return User.findOne({ _id: userId })
        .then(user => user)
        .catch(error => console.log(error))
}

