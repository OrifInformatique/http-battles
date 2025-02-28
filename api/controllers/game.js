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

// import fonctions util pour res
const utilRes = require('../util/res')
const { util } = require('webpack')

// crée une partie
exports.createGame = async (req, res, next) => {
    // crée une partie à partir d'un schema
    const game = await utilGame.createGame(req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to createGame", res) })
    utilRes.sendSuccess(200, {
        message: "Partie créé !",
        state: game.state,
        gameId: game._id
    }, res)
}

// trouve une partie 
exports.findGame = async (req, res, next) => {
    // récupère la partie en fonction de son id
    const game = await utilGame.formatedGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to findAndFormatGame", res) })

    utilRes.sendSuccess(200, game, res)
}

// liste les parties
exports.listGames = async (req, res, next) => {
    // récupère les parties
    const games = await utilGame.formatedGames()
        .catch(() => { utilRes.sendError(404, "failed to formatedGames", res) })

    utilRes.sendSuccess(200, games, res)
}

// permet au client de rejoindre une party dont il a entré la clef
exports.joinGame = async (req, res, next) => {
    const message = await utilGame.joinSuccessMessage(req)
        .catch(() => { utilRes.sendError(404, "failed to joinSuccessMessage", res) })
    utilRes.sendSuccess(200, message, res)

}

// commence la partie
exports.startGame = async (req, res, next) => {
    // construit le message à renvoyer à l'utilisateur suivant le role de l'utilisateur et l'état de la partie (qui commence) ainsi que l'identifiant de la grille
    const resultMessage = await utilGame.startMessage(req)
        .catch(() => { utilRes.sendError(404, "failed to startMessage", res) })

    utilRes.sendSuccess(200, resultMessage, res)
}

// vérifie si c'est le tour de l'utilisateur
exports.checkTurn = async (req, res, next) => {

    // construit le message en fonction de la partie et de l'utilisateur
    const message = await utilGame.testTurn(req)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPhrase = async (req, res, next) => {

    const finalMessage = await utilGame.tryPhraseResult(req)
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

exports.tryCase = async (req, res, next) => {

    const message = await utilGame.tryCase(req.method, req.route, req)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)

}

