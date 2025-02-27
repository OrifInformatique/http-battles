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
    const game = await utilGame.createGame(req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to createGame", res) })

    // sauvegarde la partie
    const newGame = await utilGame.saveGame(game)
        .catch(() => { utilRes.sendError(500, "failed to saveGame", res) })

    utilRes.sendSuccess(200, {
        message: "Partie créé !",
        state: newGame.state,
        gameId: newGame._id
    }, res)
}

// trouve une partie 
exports.findGame = async (req, res, next) => {
    // récupère la partie en fonction de son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGames", res) })

    // formate la partie pour le client
    const formatedGame = await utilGame.formatedGame(game)
        .catch(() => { utilRes.sendError(500, "failed to formatedGame", res) })

    utilRes.sendSuccess(200, formatedGame, res)
}

// liste les parties
exports.listGames = async (req, res, next) => {
    // récupère les parties
    const games = await utilGame.getGames()
        .catch(() => { utilRes.sendError(404, "failed to getGames", res) })

    // formates les parties
    const formattedGames = await utilGame.formatedGames(games)
        .catch(() => { utilRes.sendError(500, "failed to formatedGames", res) })

    utilRes.sendSuccess(200, formattedGames, res)
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

    const check = await utilGame.checkStartStat(game)
        .catch(() => { utilRes.sendError(404, "failed to checkStartStat", res) })

    if (check) {
        // récupère l'identifiant de l'utilisateur qui commence
        var startUserId = await utilGame.startCoinFlip(game)
            .catch(() => { utilRes.sendError(400, "failed to startCoinFlip", res) })

        // crée et récupère la grille de jeux du createur
        var board = await utilBoard.createBoard(game, req.body.userId)
            .catch(() => { utilRes.sendError(400, "failed to createBoard", res) })
    } else {
        // récupère l'identifiant de l'utilisateur qui commence
        var startUserId = await utilGame.getOtherUserId(game, req.body.userId)
            .catch(() => { utilRes.sendError(400, "failed to getOtherUserId", res) })
        // crée et récupère la grille de jeux du createur
        var board = await utilBoard.createBoard(game, req.body.userId)
            .catch(() => { utilRes.sendError(400, "failed to createBoard", res) })
    }

    const userPhrase = await utilPhrase.createPhrase(board._id, req.body.phrase)
        .catch(() => { utilRes.sendError(400, "failed to createPhrase", res) })

    const filledBoard = await utilBoard.fillBoard(board, userPhrase)
        .catch(() => { utilRes.sendError(404, "failed to fillBoard", res) })

    await utilBoard.insertPhrase(filledBoard, userPhrase)
        .catch(() => { utilRes.sendError(404, "failed to insertPhrase", res) })

    // construit le message à renvoyer à l'utilisateur suivant le role de l'utilisateur et l'état de la partie (qui commence) ainsi que l'identifiant de la grille
    const resultMessage = await utilGame.startMessage(req.body.userId, startUserId, filledBoard)
        .catch(() => { utilRes.sendError(404, "failed to startMessage", res) })

    utilRes.sendSuccess(200, resultMessage, res)
}

// vérifie si c'est le tour de l'utilisateur
exports.checkTurn = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const message = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPhrase = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const message = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (message !== "Your turn") {
        utilRes.sendSuccess(200, message, res)
    }

    const adversaireId = await utilGame.getOtherUserId(game, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to getOtherUserId", res) })

    const advBoard = await utilBoard.getBoardGameUser(game._id, adversaireId)
        .catch(() => { utilRes.sendError(404, "failed to getBoardGameUser", res) })

    const wordCount = advBoard.phrase.words.length
    var wordCounter = 0
    for (const keyAdv in advBoard.phrase.words) {
        for (const keyReq in req.body.phrase) {
            if (advBoard.phrase.words[keyAdv].content === req.body.phrase[keyReq].word.content && keyAdv === keyReq) {
                var wordCounter = wordCounter + 1
            }
        }
    }

    if (wordCounter === wordCount) {
        await utilGame.endGame(game._id)
            .catch(() => { utilRes.sendError(404, "failed to endGame", res) })
        utilRes.sendSuccess(200, { message: "Success!" }, res)
    } else {
        utilRes.sendSuccess(200, { message: "Wrong phrase" }, res)
    }
}

// termine la partie
exports.endGame = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })


    // termine la partie
    await utilGame.endGame(game._id)
        .catch(() => { utilRes.sendError(404, "failed to endGame", res) })

    utilRes.sendSuccess(200, {
        message: "Game Over"
    }, res)
}

/**
 * série de fonctions pour les case du jeux
 */

exports.tryGetA = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Get", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryGetB = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Get", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)

}

exports.tryGetC = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Get", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryGetD = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Get", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}


exports.tryPostA = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Post", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPostB = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Post", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPostC = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Post", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPostD = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Post", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutA = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Put", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutB = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Put", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutC = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Put", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryPutD = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Put", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteA = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Delete", "A", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteB = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Delete", "B", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteC = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Delete", "C", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}

exports.tryDeleteD = async (req, res, next) => {
    // récupère la partie suivant son id
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => { utilRes.sendError(404, "failed to getGame", res) })

    // construit le message en fonction de la partie et de l'utilisateur
    const messageCheck = await utilGame.testTurn(game, req.body.userId)
        .catch(() => { utilRes.sendError(500, "failed to testTurn", res) })

    if (messageCheck !== "Your turn") {
        utilRes.sendSuccess(200, messageCheck, res)
    }

    const message = await utilGame.tryCase("Delete", "D", req.body.gameId, req.body.userId)
        .catch(() => { utilRes.sendError(404, "failed to tryCase", res) })

    utilRes.sendSuccess(200, message, res)
}


