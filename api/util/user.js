// import le schema d'un utilisateur
const User = require("../models/User")

// import fonctions util pour board
const utilCheck = require('../util/check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/user"

exports.getUserById = async (userId, req) => {
    const LOC_LOC = "methode: getUserById"
    
    await utilCheck.dataValidityTest(req)
        .then(value => {
            req.utilCheck = value

            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await User.findOne({ _id: userId })
        .then(value => {
            req.user = value

            req.data.push({
                name: "User.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })

        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "User.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    
    return req.user
}

