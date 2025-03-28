
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

// import fonctions util pour res
const utilRes = require('../util/res')
const { util } = require('webpack')

// crée une partie
exports.createGame = async (req, res, next) => {
    utilRes.sendSuccess(200, {
        message: "Partie créé !",
        state: req.gameCreated.state,
        gameId: req.gameCreated._id
    }, res)
}

// crée une partie
exports.createGameV2 = async (req, res, next) => {
    utilRes.sendSuccess(200, {
        game: req.body.game,
        player: req.body.player
    }, res)
}

// trouve une partie 
exports.findGame = async (req, res, next) => {

    utilRes.sendSuccess(200, req.formatedGame, res)
}

// trouve une partie 
exports.findGamesV2 = async (req, res, next) => {
    utilRes.sendSuccess(200, {
        games: req.body.games
    }, res)
}

// liste les parties
exports.listGames = async (req, res, next) => {

    utilRes.sendSuccess(200, req.formatedGames, res)
}

// permet au client de rejoindre une party dont il a entré la clef
exports.joinGame = async (req, res, next) => {

    utilRes.sendSuccess(200, req.joinSuccessMessage, res)

}

// commence la partie
exports.startGame = async (req, res, next) => {

    utilRes.sendSuccess(200, req.startMessage, res)
}

// vérifie si c'est le tour de l'utilisateur
exports.checkTurn = async (req, res, next) => {

    utilRes.sendSuccess(200, req.testTurnMessage, res)
}

exports.tryPhrase = async (req, res, next) => {

    utilRes.sendSuccess(200, { message: req.tryPhraseResultMessage }, res)
}

// termine la partie
exports.endGame = async (req, res, next) => {

    utilRes.sendSuccess(200, {
        message: "Game Over"
    }, res)
}

/**
 * série de fonctions pour les case du jeux
 */

exports.tryCase = async (req, res, next) => {

    utilRes.sendSuccess(200, req.tryCaseMessage, res)

}

