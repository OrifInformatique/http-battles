// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour res
const utilGame = require('../util/game')

// import fonctions util pour res
const utilUser = require('../util/user')

// retourne une partie selon sont id
exports.getGame = async (req, res, next) => {

    const game = await Game.findOne({ _id: req.body.gameId })
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: getGame error: failed to Game.findOne", res)
        })

    if (game === null) {
        console.log("file: ../middleware/game methode: getGame error: game is null")

        utilRes.sendError(404, "file: ../middleware/game methode: getGame error: game is null", res)
    } else {
        req.game = game

        next()
    }

}

// retourne toute les partie
exports.getGames = async (req, res, next) => {
    const games = await Game.find()
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: getGame error: failed to Game.find", res)
        })

    if (games === null) {
        console.log("file: ../middleware/game methode: getGame error: failed to Game.find")

        utilRes.sendError(404, "file: ../middleware/game methode: getGames error: games is null", res)
    } else {
        req.games = games

        next()
    }
}

exports.formatedGames = async (req, res, next) => {
    const formatedGamesList = []
    for (const game of req.games) {
        if (game !== null) {
            req.game = game
            await this.formatedGame(req, res)
            formatedGamesList.push(req.formatedGame)
        } else {
            console.log("file: ../middleware/game methode: formatedGames error: game of req.games is null")
        }
    }

    if (formatedGamesList.length === 0) {
        console.log("file: ../middleware/game methode: getGames error: formatedGamesList is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: getGames error: formatedGamesList is empty", res)
    } else {
        req.formatedGames = formatedGamesList

        next()
    }
}

// formate un jeux
exports.formatedGame = async (req, res, next) => {
    const createur = await utilUser.getUserById(req.game.createurId)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: failed to utilUser.getUserById", res)
        })

    if (createurUsername === null) {
        console.log("file: ../middleware/game methode: getGames error: createurUsername is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: getGames error: createurUsername is empty", res)
    }

    const createurUsername = await utilGame.checkCreatorNotNull(createur)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: failed to utilGame.checkCreatorNotNull", res)
        })

    if (createurUsername === null) {
        console.log("file: ../middleware/game methode: getGames error: createurUsername is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: getGames error: createurUsername is empty", res)
    }


    const formatedGame = await utilGame.formatedMessage(req.game, createurUsername)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: failed to this.formatedMessage", res)
        })

    if (formatedGame === null) {
        console.log("file: ../middleware/game methode: getGames error: formatedGamesList is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: getGames error: formatedGamesList is empty", res)
    } else {
        req.formatedGame = formatedGame
        if (next !== undefined) {
            next()
        }
    }
}

// crée un objet jeux et le retourn
exports.createGame = async (req, res, next) => {

    var game = new Game({
        state: "WAITING_PLAYER",
        createurId: req.body.userId
    })



    const savedGame = await utilGame.saveGame(game)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: createGame error: failed to utilGame.saveGame", res)
        })

    return savedGame
}