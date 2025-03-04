// import le schema d'un utilisateur
const Game = require("../models/Game")

// import les fonction utiles pour utilisateur
const utilUser = require('../util/user')

// import les fonction utiles pour board
const utilBoard = require('../util/board')

// import les fonction utiles pour board
const utilWord = require('../util/word')

// import fonctions util pour res
const utilRes = require('../util/res')

const middleGame = require('../middleware/game')

exports.checkCreatorNotNull = async (createur) => {
    if (createur !== null) {
        var createurUsername = createur.username
    } else {
        var createurUsername = "unknown"
    }
    return createurUsername
}

exports.formatedMessage = async (game, createurUsername) => {

    var message = {
        state: game.state,
        createurUsername: createurUsername,
        gameId: game._id
    }

    return message
}



exports.updateGameChallenger = async (gameId, challengerId) => {
    await Game.updateOne({ _id: gameId }, {
        $set: {
            challengerId: challengerId
        }
    })
}

exports.checkStartStat = async (req) => {
    if (req.game.state === "SETTINGS") {
        return true
    } else {
        return false
    }
}

// choisit aléatoirement le premier utilisateur à commencer
exports.startCoinFlip = async (req, res) => {
    // sort aléatoirement un résultat true or false et le stock dans une constante
    const coinFlip = Math.floor(Math.random() * 2) == 0

    const startUserId = await this.coinFlipStartUserId(coinFlip, req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: startCoinFlip error: failed to this.coinFlipStartUserId", res)
        })

    if (startUserId === null) {
        console.log("file: ../util/game methode: startCoinFlip error: startUserId is null")

        utilRes.sendError(404, "file: ../util/game methode: startCoinFlip error: startUserId is null", res)
    }

    const startGameState = await this.coinFlipStartGameState(coinFlip)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: startCoinFlip error: failed to this.coinFlipStartGameState", res)
        })

    if (startGameState === null) {
        console.log("file: ../util/game methode: startCoinFlip error: startGameState is null")

        utilRes.sendError(404, "file: ../util/game methode: startCoinFlip error: startGameState is null", res)
    }

    req.newState = startGameState

    await middleGame.updateGame(req, res)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: startCoinFlip error: failed to middleGame.updateGame", res)
        })

    return startUserId
}

exports.coinFlipStartUserId = async (coinFlip, req) => {

    if (coinFlip) {

        return req.game.createurId

    } else {

        return req.game.challengerId

    }
}

exports.coinFlipStartGameState = async (coinFlip) => {

    if (coinFlip) {

        return "CREATEUR_TURN"

    } else {

        return "CHALLENGER_TURN"

    }
}

// construit le message de départ
exports.getOtherUserId = async (req) => {

    if (req.body.userId === req.game.createurId) {

        return req.game.challengerId

    } else {

        return req.game.createurId

    }
}


exports.startMessageTest = async (userId, startUserId) => {
    if (userId === startUserId) {
        return "You start"
    } else {
        return "Your opponent start"
    }
}

exports.testTurnUserId = async (req, res) => {

    const turn = await middleGame.testTurn(req, res)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: testTurnUserId error: failed to middleGame.testTurn", res)
        })

    if (turn === null) {
        console.log("file: ../util/game methode: testTurnUserId error: turn is null")

        utilRes.sendError(404, "file: ../util/game methode: testTurnUserId error: turn is null", res)
    }

    if (turn === "Your turn") {

        return req.body.userId

    } else if (turn === "Wait") {

        return await this.getOtherUserId(req)
            .catch(error => {
                console.log(error)

                utilRes.sendError(404, "file: ../util/game methode: testTurnUserId error: failed to this.getOtherUserId", res)
            })

    }
}


exports.testUserTurn = async (gameUserId, reqId) => {

    // test si le client est le créateur
    // si oui
    if (gameUserId === reqId) {

        // renvoi un message pour informer que c'est le tour du client
        return { message: "Your turn" }

        // si non
    } else {

        // renvoi un message pour informer que ce n'est pas le tour du client
        return { message: "Wait" }

    }
}

exports.switchArrayY = async (requestMode) => {

    switch (requestMode) {

        case "GET":

            return arrayY = 0

        case "POST":

            return arrayY = 1

        case "PUT":

            return arrayY = 2

        case "DELETE":

            return arrayY = 3

    }
}

exports.switchArrayX = async (requestRoad) => {

    switch (requestRoad) {

        case "A":

            return arrayX = 0

        case "B":

            return arrayX = 1


        case "C":

            return arrayX = 2

        case "D":

            return arrayX = 3

    }
}


exports.getCreateur = async (req) => {
    const createur = await utilUser.getUserById(req.game.createurId)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: getCreateur error: failed to utilUser.getUserById", res)
        })

    return createur
}

exports.updateGameChallenger = async (req, res) => {

    await Game.updateOne({ _id: req.body.gameId }, {
        $set: {
            challengerId: req.newChallenger
        }
    })
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: updateGameChallenger error: failed to Game.updateOne", res)
        })

    await middleGame.getGame(req, res)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../util/game methode: updateGameChallenger error: failed to middleGame.getGame", res)
        })
}

exports.updateGameState = async (req, res) => {

    await Game.updateOne({ _id: req.body.gameId }, {
        $set: {
            state: req.newState
        }
    })
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../util/game methode: updateGameState error: failed to Game.updateOne", res)
        })

    await middleGame.getGame(req, res)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../util/game methode: updateGameState error: failed to middleGame.getGame", res)
        })
}
