// import le schema d'un utilisateur
const User = require("../models/User")

exports.getUserById = async (userId) => {
    return await User.findOne({ _id: userId })
        .catch(error => error)
}

