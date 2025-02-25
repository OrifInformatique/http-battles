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


// crée une partie
exports.createGame = async (req, res, next) => {
    // crée une partie à partir d'un schema
    const game = await utilGame.createGame(req.body.userId)
        .catch(() => res.status(500).json({ error: "failed to createGame" }))

    // sauvegarde la partie
    const newGame = await utilGame.saveGame(game)
        .catch(() => res.status(500).json({ error: "failed to saveGame" }))

    // envoie les informations utiles au client
    try {
        res.status(201).json({
            message: "Partie créé !",
            state: newGame.state,
            gameId: newGame._id
        })
    } catch (error) { console.log(error) }

}

// trouve une partie 
exports.findGame = async (req, res, next) => {
    // récupère la partie en fonction de son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGames" }))

    // formate la partie pour le client
    const formatedGame = await utilGame.formatedGame(game)
        .catch(() => res.status(500).json({ error: "failed to formatedGame" }))

    // envoie les informations utiles au client
    try {
        res.status(200).json(formatedGame)
    } catch (error) { console.log(error) }

}

// liste les parties
exports.listGames = async (req, res, next) => {
    // récupère les parties
    const games = await utilGame.getGames()
        .catch(() => res.status(404).json({ error: "failed to getGames" }))

    // formates les parties
    const formattedGames = await utilGame.formatedGames(games)
        .catch(() => res.status(500).json({ error: "failed to formatedGames" }))

    // envoie les informations utiles au client
    try {
        res.status(200).json(formattedGames)
    } catch (error) { console.log(error) }

}

// permet au client de rejoindre une party dont il a entré la clef
exports.joinGame = async (req, res, next) => {
    // recupère la partie en fonction de son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    // recupère le créateur de la partie en fonction de son identifiant contenue dans la partie
    const createur = await utilUser.getUserById(game.createurId)
        .catch(() => res.status(404).json({ error: "failed to getUserById - créateur" }))

    // récupère le challenger en fonction de l'id contenu dans son id
    const challenger = await utilUser.getUserById(req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to getUserById - challenger" }))

    // rejoin la partie et update son état ainsi que le challenger
    await utilGame.joinGame(req.body.gameId, challenger._id)
        .catch(() => res.status(404).json({ error: "failed to joinGame" }))

    // envoie les informations utiles au client
    try {
        res.status(200).json({
            message: "Partie rejointe !",
            state: game.state,
            createurUsername: createur.username,
            challengerUsername: challenger.username
        })
    } catch (error) { console.log(error) }


}

// commence la partie
exports.startGame = async (req, res, next) => {
    // récupère le jeux suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    const check = await utilGame.checkStartStat(game)
        .catch(() => res.status(404).json({ error: "failed to checkStartStat" }))



    if (check) {
        // récupère l'identifiant de l'utilisateur qui commence
        var startUserId = await utilGame.startCoinFlip(game)
            .catch(() => res.status(404).json({ error: "failed to startCoinFlip" }))

        // crée et récupère la grille de jeux du createur
        var board = await utilBoard.createBoard(game, req.body.userId)
            .catch(() => res.status(400).json({ error: "failed to createBoard" }))
    } else {
        // récupère l'identifiant de l'utilisateur qui commence
        var startUserId = utilGame.getOtherUserId(game, req.body.userId)
        // crée et récupère la grille de jeux du createur
        var board = await utilBoard.createBoard(game, req.body.userId)
            .catch(() => res.status(400).json({ error: "failed to createBoard" }))
    }

    const userPhrase = await utilPhrase.createPhrase(board._id, req.body.phrase)
        .catch(() => res.status(400).json({ error: "failed to createPhrase" }))

    const filledBoard = await utilBoard.fillBoard(board, userPhrase)
        .catch(() => res.status(404).json({ error: "failed to fillBoard" }))

    // construit le message à renvoyer à l'utilisateur suivant le role de l'utilisateur et l'état de la partie (qui commence) ainsi que l'identifiant de la grille
    const resultMessage = await utilGame.startMessage(req.body.userId, startUserId, filledBoard)
        .catch(() => res.status(404).json({ error: "failed to startMessage" }))

    // envoie les informations utiles au client
    try {
        res.status(200).json(resultMessage)
    } catch (error) { console.log(error) }
}

// vérifie si c'est le tour de l'utilisateur
exports.checkTurn = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    // construit le message en fonction de la partie et de l'utilisateur
    const message = await utilGame.testTurn(game, req.body.userId)
        .catch(() => res.status(500).json({ error: "failed to testTurn" }))

    // envoie les informations utiles au client
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

// termine la partie
exports.endGame = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    // termine la partie
    await utilGame.endGame(game._id)
        .catch(() => res.status(404).json({ error: "failed to endGame" }))

    //  envoie les informations utiles au client
    try {
        res.status(200).json({
            message: "Game Over"
        })
    } catch (error) { console.log(error) }
}

/**
 * série de fonctions pour les case du jeux
 */

exports.tryGetA = async (req, res, next) => {
    message = await utilGame.tryCase("Get", "A", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryGetB = async (req, res, next) => {
    message = await utilGame.tryCase("Get", "B", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryGetC = async (req, res, next) => {
    message = await utilGame.tryCase("Get", "C", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryGetD = async (req, res, next) => {
    message = await utilGame.tryCase("Get", "D", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}


exports.tryPostA = async (req, res, next) => {
    message = await utilGame.tryCase("Post", "A", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPostB = async (req, res, next) => {
    message = await utilGame.tryCase("Post", "B", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPostC = async (req, res, next) => {
    message = await utilGame.tryCase("Post", "C", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPostD = async (req, res, next) => {
    message = await utilGame.tryCase("Post", "D", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPutA = async (req, res, next) => {
    message = await utilGame.tryCase("Put", "A", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPutB = async (req, res, next) => {
    message = await utilGame.tryCase("Put", "B", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPutC = async (req, res, next) => {
    message = await utilGame.tryCase("Put", "C", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryPutD = async (req, res, next) => {
    message = await utilGame.tryCase("Put", "D", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryDeleteA = async (req, res, next) => {
    message = await utilGame.tryCase("Delete", "A", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryDeleteB = async (req, res, next) => {
    message = await utilGame.tryCase("Delete", "B", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryDeleteC = async (req, res, next) => {
    message = await utilGame.tryCase("Delete", "C", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.tryDeleteD = async (req, res, next) => {
    message = await utilGame.tryCase("Delete", "D", req.body.gameId, req.body.userId)
        .catch(() => res.status(404).json({ error: "failed to tryCase" }))
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}


