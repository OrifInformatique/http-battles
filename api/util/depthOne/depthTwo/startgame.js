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

// import fonctions util pour user
const utilBoard = require('../../board')

// import les fonction utiles pour utilisateur
const utilGetUser = require('./depthThree/depthFour/depthFive/depthSix/depthSeven/depthEight/getUserById')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthTwo/depthThree/joinGame')

// import les fonction utiles pour utilisateur
const utilStartGame = require('.//depthThree/startGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/startGame"

exports.getGameCheckStartAddBoardAndPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameCheckStartAddBoardAndPhrase"

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

    await utilStartGame.getGameAndCheckStart(req)
        .then(value => {
            req.package.game = value.game
            req.game = value.game

            req.package.check = value.check
            req.check = value.check

            req.data.push({
                name: "utilStartGame.getGameAndCheckStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.getGameAndCheckStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.createBoardAndInsertPhrase(req)
        .then(value => {
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
                name: "utilBoard.createBoardAndInsertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.createBoardAndInsertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.startMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessage"

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

    // test si le client est l'utilisateur qui commence la partie
    await utilGame.startMessageTest(req)
        .then(value => {
            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.package.startMessageContent = value
            req.startMessageContent = value

            req.data.push({
                name: "utilGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilGame.startMessageCreation(req)
        .then(value => {
            req.package.startMessage = value
            req.startMessage = value

            req.data.push({
                name: "utilGame.startMessageCreation",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.startMessageCreation",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}