// import le schema d'un utilisateur
const Game = require("../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../models/User")

// import le schema d'un Board
const Board = require("../../../../../models/Board")

// import fonctions util pour check
const utilCheck = require('../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../game')

// import fonctions util pour board
const utilBoard = require('../../../../board')

// import fonctions util pour user
const utilUser = require('../../../../user')

// import les fonction utiles pour tryPhrase
const utilTryCase = require('./depthFive/tryCase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/depthThree/depthFour/tryCase"

exports.switchArrays = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrays"

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

    // retourne la position X de la case sur le plateaux en fonction de la route utilisée
    await utilTryCase.switchArrayX(req.route, req)
        .then(value => {
            // stoque la position X du plateau dans la requette
            req.package.arrayX = value
            req.arrayX = value

            req.data.push({
                name: "utilTryCase.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la position y de la case sur le plateaux en fonction de la méthode utilisée
    await utilTryCase.switchArrayY(req.method, req)
        .then(value => {
            // stoque la position Y du plateau dans la requette
            req.package.arrayY = value
            req.arrayY = value

            req.data.push({
                name: "utilTryCase.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.checkBoardAndTryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoardAndTryCase"

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

    // test une case du plateau
    await utilTryCase.checkBoard(req.arrayY, req.arrayX, req.body.gameId, req.otherUserId, req)
        .then(value => {
            // stoque le resultat (inclue le mot si réussi)
            req.check = value
            req.package.check = value

            req.data.push({
                name: "utilTryCase.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilTryCase.tryCase(req)
        .then(value => {
            req.tryCaseMessage = value
            req.package.tryCaseMessage = value

            req.data.push({
                name: "utilTryCase.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}