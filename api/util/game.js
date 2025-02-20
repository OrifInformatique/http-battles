// import le schema d'un utilisateur
const Game = require("../models/Game")

// import les fonction utiles pour utilisateur
const utilUser = require('../util/user')

// retourne une partie selon sont id
exports.getGame = async (gameId) => {
    return Game.findOne({ _id: gameId })
}

// retourne toute les partie
exports.getGames = async () => {
    return Game.find()
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
    return {
        state: game.state,
        createurUsername: createur.username,
        gameId: game._id
    }

}

// crée un objet jeux et le retourn
exports.createGame = async (userId) => {
    try {
        var game = new Game({
            state: "WAITING_PLAYER",
            createurId: userId
        })
    } catch (error) { }
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
        Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CREATEUR_TURN"
            }
        })
        // si le résultat aléatoire est faux
    } else {
        // initialise la variable définissant le joueur qui commece la partie comme étant le challenger
        var startUserId = game.challengerId
        // update l'état de la partie pour signifier que le challenger commence
        Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CHALLENGER_TURN"
            }
        })
    }

    return startUserId
}

// construit le message de départ
exports.startMessage = (reqId, startUserId, boardId) => {
    if (reqId === startUserId) {
        var resultMessage = {
            message: "You start",
            boardId: boardId
        }
    } else {
        var resultMessage = {
            message: "Your opponent start",
            boardId: boardId
        }
    }

    return resultMessage
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
exports.tryCase = async (requestMode, requestRoad, gameId) => {
    const game = await exports.getGame(gameId)

    exports.switchTurn(game)

    return {message: requestMode + " " + requestRoad}
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
    Game.updateOne({ _id: gameId }, {
        $set: {
            state: "ENDED"
        }
    })
}
