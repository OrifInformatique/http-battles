// import le schema d'un utilisateur
const Game = require("../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../check')

// import fonctions util pour game
const utilGame = require('../../game')

// import fonctions util pour user
const utilUser = require('../../user')

// import les fonction utiles pour utilisateur
const utilGetGame = require('../depthTwo/depthThree/getGame')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthTwo/depthThree/joinGame')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/updateGame"


// uodate la partie
exports.updateGame = async (req) => {

    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateGame"

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

    if (req.state !== undefined) {
        req.game.state = req.state
    }
    if (req.challenger !== undefined) {
        req.game.challengerId = req.challenger
    }

    // update l'état de la partie
    await Game.updateOne({ _id: req.body.gameId }, {
        $set: {
            state: req.game.state,
            challengerId: req.game.challengerId
        }
    })
        .then(value => {
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la partie après l'update
    await utilGetGame.getGame(req)
        .then(value => {
            // stoque la partie dans la requete
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.game
}