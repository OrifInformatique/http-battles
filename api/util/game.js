// import le schema d'un utilisateur
const Game = require("../models/Game")

// import les fonction utiles pour utilisateur
const utilUser = require('../util/user')

// import les fonction utiles pour board
const utilBoard = require('../util/board')

// import les fonction utiles pour board
const utilWord = require('../util/word')

// retourne une partie selon sont id
exports.getGame = async (gameId) => {
    return await Game.findOne({ _id: gameId })
}

// retourne toute les partie
exports.getGames = async () => {
    return await Game.find()
}

// formate une série de jeux
exports.formatedGames = async (games) => {

    const newGameList = []

    for (const game of games) {

        newGameList.push(await exports.formatedGame(game))

    }

    return newGameList
}

// formate un jeux
exports.formatedGame = async (game) => {

    const createur = await utilUser.getUserById(game.createurId)

    if (createur === null) {
        var message = {
            state: game.state,
            createurUsername: "unknown",
            gameId: game._id
        }
    } else {
        var message = {
            state: game.state,
            createurUsername: createur.username,
            gameId: game._id
        }
    }

    return message
}

// crée un objet jeux et le retourn
exports.createGame = async (userId) => {

    var game = new Game({
        state: "WAITING_PLAYER",
        createurId: userId
    })

    return game
}

// sauvegarde un jeux et le retourne
exports.saveGame = async (game) => {
    return game.save()
}

// permet à un utilisateur de rejoindre une partie
exports.joinGame = async (gameId, challengerId) => {
    await Game.updateOne({ _id: gameId }, {
        $set: {
            state: "SETTINGS",
            challengerId: challengerId
        }
    })
}

exports.checkStartStat = async (game) => {
    if (game.state === "SETTINGS") {
        return true
    } else {
        return false
    }
}

// choisit aléatoirement le premier utilisateur à commencer
exports.startCoinFlip = async (game) => {

    // sort aléatoirement un résultat true or false et le stock dans une constante
    const coinFlip = Math.floor(Math.random() * 2) == 0
    // test le résultat aléatoire
    // si vrai
    if (coinFlip) {
        // initialise la variable définissant le joueur qui commece la partie comme étant celui qui la créé
        var startUserId = game.createurId
        // update l'état de la partie pour signifier que le créateur commence
        await Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CREATEUR_TURN"
            }
        })
        // si le résultat aléatoire est faux
    } else {
        // initialise la variable définissant le joueur qui commece la partie comme étant le challenger
        var startUserId = game.challengerId
        // update l'état de la partie pour signifier que le challenger commence
        await Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CHALLENGER_TURN"
            }
        })
    }

    return startUserId
}

// construit le message de départ
exports.getOtherUserId = async (req) => {
    const game = await this.getGame(req.body.gameId)
    if (req.body.userId === game.createurId) {

        return game.challengerId
    } else {

        return game.createurId
    }
}

// construit le message de départ
exports.startMessage = async (reqId, startUserId, board) => {

    if (reqId === startUserId) {
        var resultMessage = {
            message: "You start",
            boardId: board._id
        }
    } else {
        var resultMessage = {
            message: "Your opponent start",
            boardId: board._id
        }
    }

    return resultMessage
}

exports.testTurnUserId = async (game, req) => {
    const turn = await this.testTurn(game, req.body.userId)
    if (turn === "Your turn") {
        return req.body.userId
    } else if (turn === "Wait") {
        return await getOtherUserId(req)
    }
}

exports.checkStartUserId = async (game, req) => {
    const check = await this.checkStartStat(game)
    if (check) {
        return await this.startCoinFlip(game, req.body.userId)
    } else {
        return await this.testTurnUserId(game, req)
    }
}

exports.tryPhraseResult = async (req) => {
    const adversaireId = await this.getOtherUserId(req)
    const check = await utilBoard.getBoardGameUserAndTryPhrase(req.body.gameId, adversaireId, req)
    if (check) {
        await this.endGame(req.body.gameId)
        return "Success!"
    } else {
        return "Wrong phrase!"
    }
}

// test si c'est le tour de l'utilisateur ou de son adversaire
exports.testTurn = async (game, userId) => {
    // teste l'état de la partie
    // si c'est le tour du créateur
    if (game.state === "CREATEUR_TURN") {
        // test si le client est le créateur
        // si oui
        if (game.createurId === userId) {
            // renvoi un message pour informer que c'est le tour du client
            return { message: "Your turn" }
            // si non
        } else {
            // renvoi un message pour informer que ce n'est pas le tour du client
            return { message: "Wait" }
        }
        // si c'est le tour du challenger
    } else if (game.state === "CHALLENGER_TURN") {
        // test si le client est le challenger
        // si oui
        if (game.challengerId === userId) {
            // renvoi un message pour informer que c'est le tour du client
            return { message: "Your turn" }
            // si non
        } else {
            // renvoi un message pour informer que ce n'est pas le tour du client
            return { message: "Wait" }
        }
        // si c'est le tour de personne
    } else {
        // renvoi un message pour informer que la partie est términer
        return { message: "Game Over" }
    }
}

// test une case de la grille
exports.tryCase = async (requestMode, requestRoad, req) => {

    const game = await this.getGame(req.body.gameId)

    const adversaireId = await this.getOtherUserId(req)

    switch (requestMode) {
        case "Get":
            var arrayY = 0
            break;
        case "Post":
            var arrayY = 1
            break;
        case "Put":
            var arrayY = 2
            break;
        case "Delete":
            var arrayY = 3
            break;
    }


    switch (requestRoad) {
        case "A":
            var arrayX = 0
            break;
        case "B":
            var arrayX = 1
            break;
        case "C":
            var arrayX = 2
            break;
        case "D":
            var arrayX = 3
            break;
    }

    const board = await utilBoard.getBoardGameUser(game._id, adversaireId)

    const check = await utilBoard.checkBoard(board, arrayY, arrayX)
    if (check.result) {
        var message = {
            message: requestMode + " " + requestRoad,
            result: "Touché!",
            word: check.word.content
        }

    } else {
        var message = {
            message: requestMode + " " + requestRoad,
            result: "Manqué!"
        }
    }
    this.switchTurn(game)

    return message
}

// change le toour 
exports.switchTurn = (game) => {
    if (game.state === "CREATEUR_TURN") {
        Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CHALLENGER_TURN"
            }
        })
    } else if (game.state === "CHALLENGER_TURN") {
        Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CREATEUR_TURN"
            }
        })
    }
}

// fini la partie
exports.endGame = async (gameId) => {
    await Game.updateOne({ _id: gameId }, {
        $set: {
            state: "ENDED"
        }
    })
}

exports.createAndSaveGame = async (userId) => {
    // crée une partie à partir d'un schema
    const game = await this.createGame(userId)
    // sauvegarde la partie
    const savedGame = await this.saveGame(game)

    return savedGame
}

exports.findAndFormatGame = async (gameId) => {
    const game = await this.getGame(gameId)
    const formatedGame = await this.formatedGame(game)

    return formatedGame
}

exports.findAndFormatGames = async () => {

    const games = await this.getGames()

    const formatedGames = await this.formatedGames(games)

    return formatedGames
}

exports.startMessageUserId = async (req) => {
    const filledBoard = await utilBoard.fillBoardInsertPhrase(req)
    const game = await this.getGame(req.body.gameId)
    // récupère l'identifiant de l'utilisateur qui commence
    const startUserId = await this.checkStartUserId(game, req)

    const resultMessage = await this.startMessage(req.body.userId, startUserId, filledBoard)

    return resultMessage
}

exports.getGameAndTestTurn = async (gameId, userId) => {
    const game = await this.getGame(gameId)
    const message = await this.testTurn(game, userId)

    return message
}

exports.getGameAndTestTurn = async (req) => {
    const game = await this.getGame(req.body.gameId)
    const message = await this.testTurn(game, req.body.userId)

    return message
}

exports.getCreateur = async (gameId) => {
    const game = await this.getGame(gameId)
    const createur = await utilUser.getUserById(game.createurId)

    return createur
}

exports.joinSuccessMessage = async (req) => {
    const game = await this.getGame(req.body.gameId)
    const createur = await this.getCreateur(req.body.gameId)
    const challenger = await utilUser.getUserById(req.body.userId)
    await this.joinGame(req.body.gameId, req.body.userId)
    return {
        message: "Partie rejointe !",
        state: game.state,
        createurUsername: createur.username,
        challengerUsername: challenger.username
    }
}
