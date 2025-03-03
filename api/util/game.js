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

// crée un objet jeux et le retourn
exports.createGame = async (userId) => {

    var game = new Game({
        state: "WAITING_PLAYER",
        createurId: userId
    })

    const savedGame = await this.saveGame(game)

    return savedGame
}

// sauvegarde un jeux et le retourne
exports.saveGame = async (game) => {
    return game.save()
}

// permet à un utilisateur de rejoindre une partie
exports.joinGame = async (gameId, challengerId) => {
    await this.updateGame(gameId, "SETTINGS", challengerId)
}

exports.updateGame = async (gameId, state, challengerId) => {
    if (typeof state !== 'undefined') {
        await this.updateGameState(gameId, state)
    }

    if (typeof challengerId !== 'undefined') {
        await this.updateGameChallenger(gameId, challengerId)
    }
}

exports.updateGameState = async (gameId, state) => {
    await Game.updateOne({ _id: gameId }, {
        $set: {
            state: state
        }
    })
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
exports.startCoinFlip = async (req) => {

    // sort aléatoirement un résultat true or false et le stock dans une constante
    const coinFlip = Math.floor(Math.random() * 2) == 0

    const startUserId = this.coinFlipStartUserId(coinFlip, req)

    const startGameState = this.coinFlipStartGameState(coinFlip)

    await this.updateGame(req.game._id, startGameState)

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

// construit le message de départ
exports.startMessage = async (req) => {
    
    const startUserId = await this.checkStartUserId(req)
    
    const board = await utilBoard.fillBoard(req)

    const message = await this.startMessageTest(req.body.userId, startUserId)

    return {
        message: message,
        boardId: board._id
    }
}

exports.startMessageTest = async (userId, startUserId) => {
    if (userId === startUserId) {
        return "You start"
    } else {
        return "Your opponent start"
    }
}

exports.testTurnUserId = async (req) => {

    const turn = await this.testTurn(req)

    if (turn === "Your turn") {

        return req.body.userId

    } else if (turn === "Wait") {

        return await getOtherUserId(req)

    }
}

exports.checkStartUserId = async (req) => {
    
    const check = await this.checkStartStat(req)
    
    if (check) {

        return await this.startCoinFlip(req.body.gameId)

    } else {

        return await this.testTurnUserId(req)
    }
}

exports.tryPhraseResult = async (req) => {

    const adversaireId = await this.getOtherUserId(req)

    const check = await utilBoard.tryPhrase(adversaireId, req)

    if (check) {

        await this.endGame(req.body.gameId)

        return "Success!"

    } else {

        return "Wrong phrase!"

    }
}

// test si c'est le tour de l'utilisateur ou de son adversaire
exports.testTurn = async (req) => {

    // teste l'état de la partie
    // si c'est le tour du créateur
    if (req.game.state === "CREATEUR_TURN") {

        return await this.testUserTurn(req.game.createurId, req.body.userId)

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {


        return await this.testUserTurn(req.game.challengerId, req.body.userId)

        // si c'est le tour de personne
    } else {

        // renvoi un message pour informer que la partie est términer
        return { message: "Game Over" }

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

// test une case de la grille
exports.tryCase = async (requestMode, requestRoad, req) => {

    const adversaireId = await this.getOtherUserId(req)

    const arrayY = await this.switchArrayY(requestMode)

    const arrayX = await this.switchArrayX(requestRoad)

    const check = await utilBoard.checkBoard(arrayY, arrayX, req.body.gameId, adversaireId)

    if (check.result) {

        var message = {
            case: requestMode + " " + requestRoad,
            result: "Touché!",
            word: check.word.content
        }

    } else {

        var message = {
            case: requestMode + " " + requestRoad,
            result: "Manqué!"
        }
    }

    this.switchTurn(req)

    return message
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

// change le toour 
exports.switchTurn = async (req) => {

    if (req.game.state === "CREATEUR_TURN") {

        await this.updateGame(req.game._id, "CHALLENGER_TURN")

    } else if (req.game.state === "CHALLENGER_TURN") {

        await this.updateGame(req.game._id, "CREATEUR_TURN")

    }
}

// fini la partie
exports.endGame = async (gameId) => {
    await this.updateGame(gameId, "ENDED")
}


exports.getCreateur = async (req) => {
    const createur = await utilUser.getUserById(req.game.createurId)

    return createur
}

exports.joinSuccessMessage = async (req) => {
    await this.joinGame(req.body.gameId, req.body.userId)
    const createur = await this.getCreateur(req)
    const challenger = await utilUser.getUserById(req.body.userId)
    return {
        message: "Partie rejointe !",
        state: req.game.state,
        createurUsername: createur.username,
        challengerUsername: challenger.username
    }
}
