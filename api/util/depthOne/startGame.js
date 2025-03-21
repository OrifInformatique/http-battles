// import le schema d'un utilisateur
const Game = require("../../models/Game")

// import fonctions util pour check
const utilCheck = require('../check')

// import fonctions util pour game
const utilGame = require('../game')

// import les fonction utiles pour utilisateur
const utilGetUser = require('./depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/depthEight/getUserById')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthOne/depthTwo/joinGame')

// import les fonction utiles pour utilisateur
const utilUpdategame = require('./depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/updateGame')

// import les fonction utiles pour utilisateur
const utilStartGame = require('../depthOne/depthTwo/startGame')

// import fonctions util pour user
const utilUser = require('../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/startGame"

exports.constructStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: constructStart"

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

    await utilStartGame.getGameCheckStartAddBoardAndPhrase(req)
        .then(value => {
            req.package.game = value.game
            req.game = value.game

            req.package.check = value.check
            req.check = value.check

            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            // stoque le plateu après update dans la requete
            req.package.board = value.board
            req.board = value.board

            req.data.push({
                name: "utilGame.getGameCheckStartAddBoardAndPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.getGameCheckStartAddBoardAndPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilStartGame.startMessage(req)
        .then(value => {
            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.package.startMessageContent = value.startMessageContent
            req.startMessageContent = value.startMessageContent

            req.package.startMessage = value.startMessage
            req.startMessage = value.startMessage

            req.data.push({
                name: "utilStartGame.startMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.startMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}