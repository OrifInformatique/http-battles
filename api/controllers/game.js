// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

const utilUser = require('../util/user')
const utilGame = require('../util/game')
const utilBoard = require('../util/board')


// crée une partie
exports.createGame = async (req, res, next) => {

    // crée une partie à partir d'un schema
    const game = await utilGame.createGame(req.body.userId)
        .catch(() => res.status(500).json({ error: "failed to createGame" }))
    const newGame = await utilGame.saveGame(game)
        // en cas d'erreure, envoie l'erreur
        .catch(() => res.status(500).json({ error: "failed to saveGame" }))

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
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGames" }))

    const formatedGame = await utilGame.formatedGame(game)
        .catch(() => res.status(500).json({ error: "failed to formatedGame" }))

    try {
        res.status(200).json(formatedGame)
    } catch (error) { console.log(error) }

}

// liste les parties en attente de challenger
exports.listGames = async (req, res, next) => {
    const games = await utilGame.getGames()
        .catch(() => res.status(404).json({ error: "failed to getGames" }))

    const formattedGames = await await utilGame.formatedGames(games)
        .catch(() => res.status(500).json({ error: "failed to formatedGames" }))
    try {
        res.status(200).json(formattedGames)
    } catch (error) { console.log(error) }

}

// permet au client de rejoindre une party dont il a entré la clef
exports.joinGame = async (req, res, next) => {
    // recupère la partie qui correspond à la clef de la requette
    const game = await utilGame.getGame(req.body.gameId)
        // si une erreur est trouvée, envoie l'erreur
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    const createur = await utilUser.getUserById(game.createurId)
    const challenger = await utilUser.getUserById(req.body.userId)

    utilGame.joinGame(req.body.gameId, challenger._id)
        // si une erreur est trouvée, envoie l'erreur
        .catch(() => res.status(404).json({ error: "failed to joinGame" }))
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
    // récupère le jeux suivant la clef contenu dans la requette
    const game = await utilGame.getGame(req.body.gameId)
        // en cas de problème renvoit une erreur
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    const board = await utilBoard.createBoard(game._id)
        .catch(() => res.status(400).json({ error: "failed to createBoard" }))

    const startUserId = await utilGame.startCoinFlip(game)
        .catch(() => res.status(404).json({ error: "failed to startCoinFlip" }))

    // construit le message à renvoyer à l'utilisateur suivant le role de l'utilisateur et l'état de la partie (qui commence)
    const resultMessage = utilGame.startMessage(req.body.userId, startUserId, board._id)

    try {
        // renvoie le message à l'utilisateur
        res.status(200).json(resultMessage)
    } catch (error) { console.log(error) }

}

// vérifie si c'est le tour de l'utilisateur envoyant la requète suivant l'état de la partie
exports.checkTurn = async (req, res, next) => {
    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGame" }))
    const message = await utilGame.testTurn(game, req.body.userId)
        .catch(() => res.status(500).json({ error: "failed to testTurn" }))
    
    try {
        res.status(200).json(message)
    } catch (error) { console.log(error) }
}

exports.endGame = async (req, res, next) => {

    const game = await utilGame.getGame(req.body.gameId)
        .catch(() => res.status(404).json({ error: "failed to getGame" }))

    await utilGame.endGame(game._1)
        .catch(() => res.status(404).json({ error: "failed to endGame" }))

    try {
        res.status(200).json({
            message: "Game Over"
        })
    } catch (error) { console.log(error) }


}


/**
 * série de fonctions pour les case du jeux
 */

exports.tryGetA = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Get A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetB = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Get B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetC = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Get C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetD = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Get D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}


exports.tryPostA = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Post A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPostB = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Post B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPostC = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Post C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPostD = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Post D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutA = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Put A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutB = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Put B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutC = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Put C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutD = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Put D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteA = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Delete A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteB = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Delete B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteC = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Delete C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteD = (req, res, next) => {
    const gameId = req.body.gameId
    Game.findOne({ _id: gameId })
        .then(game => {
            console.log("Delete D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}


