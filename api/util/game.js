// import le schema d'un utilisateur
const Game = require("../models/Game")

const utilUser = require('../util/user')

exports.formatedGames = async (games) => {
    const newGameList = []
    for (const game of games) {
        const createur = await utilUser.getUserById(game.createurId)
        
        try {
            const createurUsername = createur.username
            newGameList.push({
                state: game.state,
                createurUsername: createurUsername,
                gameId: game._id
            })
        } catch (error) {
            console.log(error)
            continue
        }
    }
    return newGameList
}

exports.formatedGame = async (game) => {
    try {
        const createurId = game.createurId
        const createur = await utilUser.getUserById(createurId)
        const createurUsername = createur.username
        return {
            state: game.state,
            createurUsername: createurUsername
        }
    } catch (error) {
        console.log(error)
    }
}

exports.startMessage = (reqId, startUserId) => {

    if (reqId === startUserId) {
        var resultMessage = {
            "message": "You start"
        }
    } else {
        var resultMessage = {
            "message": "Your opponent start"
        }
    }

    return resultMessage
}

exports.switchTurn = (game) => {
    if (game.state === "CREATEUR_TURN") {
        Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CHALLENGER_TURN"
            }
        })
            .then(
                console.log("CREATEUR_TURN to CHALLENGER_TURN")
            )
            .catch(error => console.log(error))
    } else if (game.state === "CHALLENGER_TURN") {
        Game.updateOne({ _id: game._id }, {
            $set: {
                state: "CREATEUR_TURN"
            }
        })
            .then(
                console.log("CHALLENGER_TURN to CREATEUR_TURN")
            )
            .catch(error => console.log(error))
    }
}

exports.getGame = async (gameId) => {
    return Game.findOne({ _id: gameId })
        .then(game => { return game })
}

exports.getGames = async () => {
    return Game.find()
        .then(games => { return games })
}