
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

// import fonctions util pour res
const utilRes = require('../util/res')
const { util } = require('webpack')

exports.testAll = async (req, res, next) => {
    utilRes.sendSuccess(200, req.body, res)
}

// crée une partie
exports.createGameV2 = async (req, res, next) => {
    utilRes.sendSuccess(200, req.body.all, res)
}


// trouve une partie 
exports.findGamesV2 = async (req, res, next) => {
    utilRes.sendSuccess(200, req.body.all, res)
}



// permet au client de rejoindre une party dont il a entré la clef
exports.joinGameV2 = async (req, res, next) => {

    utilRes.sendSuccess(200, req.body.all, res)

}



// commence la partie
exports.startGameV2 = async (req, res, next) => {

    utilRes.sendSuccess(200, req.body.all, res)
}



exports.tryPhraseV2 = async (req, res, next) => {

    utilRes.sendSuccess(200, req.body.all, res)
}



// termine la partie
exports.endGameV2 = async (req, res, next) => {

    utilRes.sendSuccess(200, req.body.all, res)
}



/**
 * série de fonctions pour les case du jeux
 */

exports.tryCaseV2 = async (req, res, next) => {

    utilRes.sendSuccess(200, req.body.all, res)

}


