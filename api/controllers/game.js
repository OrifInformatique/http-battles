// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

// import fonctions util pour utilisateur
const utilUser = require('../util/user')

// import fonctions util pour partie
const utilGame = require('../util/game')

// import fonctions util pour board
const utilBoard = require('../util/board')

// import fonctions util pour phrase
const utilPhrase = require('../util/phrase')

// import fonctions util pour word
const utilWord = require('../util/word')

// import fonctions util pour word
const utilRes = require('../util/res')
const { util } = require('webpack')

// crée une partie
exports.createGame = async (req, res, next) => {
    // crée une partie à partir d'un schema
    const game = await utilGame.createAndSaveGame(req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to createAndSaveGame", res) })
    utilRes.sendSuccess(200, {
        message: "Partie créé !",
        state: game.state,
        gameId: game._id
    }, res)
}

// trouve une partie 
exports.findGame = async (req, res, next) => {
    // récupère la partie en fonction de son id
    const game = await utilGame.findAndFormatGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to findAndFormatGame", res) })

    utilRes.sendSuccess(200, game, res)
}

// liste les parties
exports.listGames = async (req, res, next) => {
    // récupère les parties
    const games = await utilGame.findAndFormatGames()
        .catch(() => { utilRes.sendError(404, "failed to findAndFormatGames", res) })

    utilRes.sendSuccess(200, games, res)
}

// permet au client de rejoindre une party dont il a entré la clef
exports.joinGame = async (req, res, next) => {
    // recupère la partie en fonction de son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // recupère le créateur de la partie en fonction de son identifiant contenue dans la partie
    const createur = await utilUser.getUserById(game.createurId)
        .catch(() => { utilRes.sendError(404, "failed to getUserById - créateur", res) })

    // récupère le challenger en fonction de l'id contenu dans son id
    const challenger = await utilUser.getUserById(req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to getUserById - challenger", res) })

    // rejoin la partie et update son état ainsi que le challenger
    await utilGame.joinGame(req.body.gameId, challenger._id)
        .catch(() => { utilRes.sendError(404, "failed to joinGame", res) })

    utilRes.sendSuccess(200, {
        message: "Partie rejointe !",
        state: game.state,
        createurUsername: createur.username,
        challengerUsername: challenger.username
    }, res)

}

// commence la partie
exports.startGame = async (req, res, next) => {
    // récupère le jeux suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // crée et récupère la grille de jeux du createur
    const board = await utilBoard.createBoard(game, req.body.userId)
        .catch(() => { utilRes.sendError(400, "failed to createBoard", res) })

    const userPhrase = await utilPhrase.createPhrase(board._id, req.body.phrase)
        .catch(() => { utilRes.sendError(400, "failed to createPhrase", res) })

    const filledBoard = await utilBoard.fillBoardInsertPhrase(board, userPhrase)
        .catch(() => { utilRes.sendError(404, "failed to fillBoardInsertPhrase", res) })

    // construit le message à renvoyer à l'utilisateur suivant le role de l'utilisateur et l'état de la partie (qui commence) ainsi que l'identifiant de la grille
    const resultMessage = await utilGame.startMessageUserId(game, req.body.userId, filledBoard)
        .catch(() => { utilRes.sendError(404, "failed to startMessageUserId", res) })

    utilRes.sendSuccess(200, resultMessage, res)
}

// vérifie si c'est le tour de l'utilisateur
exports.checkTurn = async (req, res, next) => {

    // construit le message en fonction de la partie et de l'utilisateur
    const message = await utilGame.getGameAndTestTurn(req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to getGameAndTestTurn", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPhrase = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    await utilRes.sendSuccessCheck(req, res)

    const adversaireId = await utilGame.getOtherUserId(game, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to getOtherUserId", res) })

    const check = await utilBoard.getBoardGameUserAndTryPhrase(game._id, adversaireId, req)
        .catch(() => { utilRes.sendError(400, "failed to getBoardGameUserAndTryPhrase", res) })

    const finalMessage = await utilGame.tryPhraseResult(check, game)
        .catch(() => { utilRes.sendError(400, "failed to tryPhraseResult", res) })

    utilRes.sendSuccess(200, { message: finalMessage }, res)
}

// termine la partie
exports.endGame = async (req, res, next) => {
    // termine la partie
    await utilGame.endGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to endGame", res) })

    utilRes.sendSuccess(200, {
        message: "Game Over"
    }, res)
}

/**
 * série de fonctions pour les case du jeux
 */

exports.tryGetA = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Get", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryGetB = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Get", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)

}

exports.tryGetC = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Get", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryGetD = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Get", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}


exports.tryPostA = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Post", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPostB = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Post", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPostC = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Post", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPostD = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Post", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutA = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Put", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutB = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Put", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutC = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Put", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutD = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Put", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteA = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Delete", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteB = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Delete", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteC = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)


    const message = await utilGame.tryCase("Delete", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteD = async (req, res, next) => {
    await utilRes.sendSuccessCheck(req, res)

    const message = await utilGame.tryCase("Delete", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}