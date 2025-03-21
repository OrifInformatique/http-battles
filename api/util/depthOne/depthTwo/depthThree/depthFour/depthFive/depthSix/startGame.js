// import le schema d'un utilisateur
const Game = require("../../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../../../user')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthSeven/startGame')

// import les fonction utiles pour utilisateur
const utilUpdateGame = require('./depthSeven/updateGame')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSix/startGame"

// choisit aléatoirement le premier utilisateur à commencer
exports.startCoinFlip = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startCoinFlip"

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

    await utilStartGame.coinFlipStartMode(req)
        .then(value => {
            // stoque cette id dans la requete
            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.package.game.state = value.game.state
            req.data.push({
                name: "utilStartGame.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update la parite dans la base de donnée
    await utilUpdateGame.updateGame(req)
        .then(value => {
            req.package.game.state = value.state
            req.game.state = value.state

            req.data.push({
                name: "utilUpdateGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.startUserId
}

// test si il s'agit du tour du client et renvoie l'identifiant du client qui commence
exports.testTurnUserId = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTurnUserId"

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

    // test quel utilisateur commence
    await utilStartGame.testTurn(req, res)
        .then(value => {
            // retourn le résultat et le stoque dans la requete
            req.turn = value

            req.data.push({
                name: "utilStartGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // suivant le resultat du test
    if (req.turn.message === "Your turn") {
        // stoque l'id du clien dans la requet en tant que l'utilisateur qui commence
        req.startUserId = req.auth.userId

        // retourne la variable traité pour la gestion d'erreur
        return req.auth.userId

    } else if (req.turn.message === "Wait") {
        // retourn l'id de l'adversaire du client
        await utilStartGame.getOtherUserId(req)
            .then(value => {
                // stoque cette id dans la requete
                req.startUserId = value

                req.data.push({
                    name: "this.getOtherUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.getOtherUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
        // retourne la variable traité pour la gestion d'erreur
        return req.startUserId
    } else {
        return null
    }
}
