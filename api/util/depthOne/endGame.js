// import le schema d'un utilisateur
const Game = require("../../models/Game")

// import fonctions util pour check
const utilCheck = require('../check')

// import fonctions util pour game
const utilGame = require('../game')
// import fonctions util pour board
const utilBoard = require('../board')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthTwo/depthThree/depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthOne/depthTwo/joinGame')

// import les fonction utiles pour utilisateur
const utilUpdategame = require('./depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/updateGame')

// import les fonction utiles pour utilisateur
const utilEndGame = require('./depthTwo/endGame')

// import les fonction utiles pour utilisateur
const utilGetOtherUserId = require('./depthTwo/getOtherUserId')

// import fonctions util pour user
const utilUser = require('../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/endGame"

exports.findAndEndGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findAndEndGame"

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

    await utilGetGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilEndGame.endGame(req)
        .then(value => {
            req.package.state = value
            req.state = value

            req.data.push({
                name: "utilEndGame.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilEndGame.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}