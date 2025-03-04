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
    utilRes.sendSuccess(200, {
        message: "Partie créé !",
        state: req.game.state,
        gameId: req.game._id
    }, res)
}

// trouve une partie 
exports.findGame = async (req, res, next) => {

    utilRes.sendSuccess(200, req.formatedGame, res)
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

