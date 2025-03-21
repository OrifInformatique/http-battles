// import le schema d'un utilisateur
const Game = require("../../../models/Game")

// import fonctions util pour check
const utilCheck = require('../../check')

// import fonctions util pour game
const utilGame = require('../../game')
// import fonctions util pour board
const utilBoard = require('../../board')

// import les fonction utiles pour utilisateur
const utilGetUser = require('./depthThree/depthFour/depthFive/depthSix/depthSeven/depthEight/getUserById')

// import les fonction utiles pour utilisateur
const utilGetGame = require('../depthTwo/depthThree/depthFour/getGame')

// import fonctions util pour user
const utilUser = require('../../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthTwo/getOtherUserId"

exports.getOtherUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getOtherUserId"

    // test de la validité des données
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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    // si le client est le créateur, retourn l'id du challenger
    if (req.auth.userId === req.game.createurId) {

        return req.game.challengerId

    } else {
        // sinon retourn l'id du créateur créateur
        return req.game.createurId

    }
}