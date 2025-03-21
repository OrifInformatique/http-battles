// import le schema d'un utilisateur
const Game = require("../../models/Game")

// import fonctions util pour check
const utilCheck = require('../check')

// import fonctions util pour game
const utilGame = require('../game')
// import fonctions util pour board
const utilBoard = require('../board')

// import les fonction utiles pour utilisateur
const utilGetUser = require('./depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/depthEight/getUserById')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthOne/depthTwo/joinGame')

// import les fonction utiles pour utilisateur
const utilUpdategame = require('./depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/updateGame')

// import les fonction utiles pour utilisateur
const utilCheckTurn = require('./depthTwo/checkTurn')

// import les fonction utiles pour utilisateur
const utilGetOtherUserId = require('./depthTwo/getOtherUserId')

// import fonctions util pour user
const utilUser = require('../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/checkTurn"

exports.checkTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkTurn"

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

    await utilCheckTurn.findGameAndTestTurn(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            // stocke le message de réponse dans la requete
            req.package.testTurnMessage = value.testTurnMessage
            req.testTurnMessage = value.testTurnMessage

            req.data.push({
                name: "utilCheckTurn.findGameAndTestTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheckTurn.findGameAndTestTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await utilGetOtherUserId.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value
            req.otherUserId = value

            req.data.push({
                name: "utilGetOtherUserId.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetOtherUserId.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.getBoardGameUserAndAdversaire = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardGameUserAndAdversaire"

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

    // retourn un plateau suivant l'id de l'utilisateur
    await utilCheckTurn.getBoardGameUser(req.body.gameId, req.auth.userId, req)
        .then(value => {
            // stoque le plateau de l'utilisateur dans le message dans la requete pour le client
            req.package.testTurnMessage.userBoard = value.board
            req.testTurnMessage.userBoard = value.board

            req.data.push({
                name: "utilCheckTurn.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheckTurn.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourn un plateau suivant l'id de l'utilisateur
    await utilCheckTurn.getBoardGameUser(req.body.gameId, req.otherUserId, req)
        .then(value => {
            // stoque le plateau de l'adversaire dans le message dans la requete pour le client
            req.package.testTurnMessage.adversaireBoard = value.board
            req.testTurnMessage.adversaireBoard = value.board

            req.data.push({
                name: "utilCheckTurn.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheckTurn.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}