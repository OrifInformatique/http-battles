// import le schema d'un utilisateur
const Game = require("../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../../user')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthSix/startGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/depthThree/depthFour/depthFive/startGame"

exports.checkStartStat = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartStat"

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

    // retourne true si la party est en mode settings
    if (req.game.state === "SETTINGS" || req.game.state === "ENDED") {
        return true
    } else {
        return false
    }
}

exports.checkStartUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartUserId"

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

    // test si la partie a déjà commencé
    if (req.check) {
        // si non (true) décide aléatoirement quel joueur commence et retourn son id
        await utilStartGame.startCoinFlip(req)
            .then(value => {
                // stoque l'id du joueur qui commence
                req.startUserId = value

                req.data.push({
                    name: "utilStartGame.startCoinFlip",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilStartGame.startCoinFlip",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

    } else {
        // si oui (false), test de quel joueur c'est le tour et retourn son id
        await utilStartGame.testTurnUserId(req)
            .then(value => {
                // stoque l'id du joueur qui commence
                req.startUserId = value

                req.data.push({
                    name: "utilStartGame.testTurnUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilStartGame.testTurnUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startUserId
}