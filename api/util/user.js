// import le schema d'un utilisateur
const User = require("../models/User")

// import fonctions util pour board
const utilCheck = require('../util/check')

const LOC_GLOB = "file: ../util/user"

exports.getUserById = async (userId, req) => {
    const LOC_LOC = "methode: getUserById"

    if (await utilCheck.dataValidityTest(req)) {
        return null
    }
    
    return await User.findOne({ _id: userId })
        .then(value => {
            req.data.push({
                name: "User.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })

            return value
        })
        .catch(error => {
            req.data.push({
                name: "User.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })

            return error
        })
}

