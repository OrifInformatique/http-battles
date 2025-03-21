// import le schema d'un utilisateur
const Game = require("../../../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../../../../user')

// import les fonction utiles pour startGame
const utilStartGame = require('./depthEight/startGame')

// import les fonction utiles pour testUserTurn
const utilTestUserTurn = require('./depthEight/testUserTurn')



// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/startGame"

exports.coinFlipStartMode = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartMode"

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

    if (req.package === undefined) {
        req.package = {}
    }
    // sort aléatoirement un résultat true or false et le stock dans une constante
    req.coinFlip = Math.floor(Math.random() * 2) == 0

    // retourn l'id de l'utilisateur en fonctions du resultat du test
    await utilStartGame.coinFlipStartUserId(req.coinFlip, req)
        .then(value => {
            // stoque cette id dans la requete
            req.startUserId = value
            req.package.startUserId = value

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

    // retourn l'état de la partie en fonction du résultat du test
    await utilStartGame.coinFlipStartGameState(req.coinFlip, req)
        .then(value => {
            // stoque le nouvel étàt de la partie dans la requete
            req.game.state = value
            req.package.state = value
            req.data.push({
                name: "utilStartGame.coinFlipStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.coinFlipStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.testTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTurn"

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

    // teste l'état de la partie
    // si c'est le tour du créateur
    if (req.game.state === "CREATEUR_TURN") {
        // test si le client est le créateur et renvoit un message pour lui indiquer si c'est son tour
        await utilTestUserTurn.testUserTurn(req.game.createurId, req.auth.userId, req)
            .then(value => {
                // stocke le message de réponse dans la requete
                req.testTurnMessage = value

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {
        // test si le client est le challenger et renvoit un message pour lui indiquer si c'est son tour
        await utilTestUserTurn.testUserTurn(req.game.challengerId, req.auth.userId, req)
            .then(value => {
                req.testTurnMessage = value

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour de personne
    } else {
        // renvoi un message pour informer que la partie est términer
        req.testTurnMessage = { message: req.game.state }
    }

    return req.testTurnMessage
}

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