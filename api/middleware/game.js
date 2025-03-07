// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour game
const utilGame = require('../util/game')

// import fonctions util pour user
const utilUser = require('../util/user')

// import fonctions util pour board
const utilBoard = require('../util/board')

// import fonctions util pour board
const utilCheck = require('../util/check')

const LOC_GLOB = "file: ../middleware/game"


// retourne une partie selon sont id
exports.getGame = async (req, res, next) => {
    const LOC_LOC = "methode: getGame"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value

            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await Game.findOne({ _id: req.body.gameId })
        .then(value => {
            req.game = value

            req.data.push({
                name: "Game.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "Game.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }



    return req.game
}

// retourne toute les partie
exports.getGames = async (req, res, next) => {
    const LOC_LOC = "methode: getGames"
    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await Game.find()
        .then(value => {
            req.games = value

            req.data.push({
                name: "Game.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "Game.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }
}

exports.formatedGames = async (req, res, next) => {
    const LOC_LOC = "methode: formatedGames"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    const formatedGamesList = []

    for (const game of req.games) {
        req.game = game

        await this.formatedGame(req, res)
            .then(value => {
                formatedGamesList.push(value)

                req.data.push({
                    name: "this.formatedGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.formatedGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    await utilCheck.dataValidityFilter(req, "utilUser.getUserById")
    await utilCheck.dataValidityFilter(req, "User.findOn")


    req.formatedGames = formatedGamesList

    if (next !== undefined) {
        next()
    }
}

// formate un jeux
exports.formatedGame = async (req, res, next) => {
    const LOC_LOC = "methode: formatedGame"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }


    await utilUser.getUserById(req.game.createurId, req)
        .then(value => {
            req.createur = value

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    await utilGame.checkCreatorNotNull(req.createur)
        .then(value => {
            req.createurUsername = value

            req.data.push({
                name: "utilGame.checkCreatorNotNull",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.checkCreatorNotNull",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    await utilGame.formatedMessage(req.game, req.createurUsername)
        .then(value => {
            req.formatedGame = value

            req.data.push({
                name: "utilGame.formatedMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.formatedMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }
    return req.formatedGame

}

// crée un objet jeux et le retourn
exports.createGame = async (req, res, next) => {

    var game = new Game({
        state: "WAITING_PLAYER",
        createurId: req.body.userId
    })

    req.game = game

    if (next !== undefined) {
        next()
    }
}

// sauvegarde un jeux et le retourne
exports.saveGame = async (req, res, next) => {
    const LOC_LOC = "methode: saveGame"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await req.game.save()
        .then(value => {
            req.savedGame = value

            req.data.push({
                name: "req.game.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "req.game.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

}

// permet à un utilisateur de rejoindre une partie
exports.joinGame = async (req, res, next) => {
    const LOC_LOC = "methode: joinGame"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    req.newState = "SETTINGS"
    req.newChallenger = req.body.userId

    if (next !== undefined) {
        next()
    }
}

// construit le message de départ
exports.startMessage = async (req, res, next) => {
    const LOC_LOC = "methode: startMessage"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilGame.startMessageTest(req.body.userId, req.startUserId)
        .then(value => {
            req.startMessageContent = value

            req.data.push({
                name: "utilGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    req.startMessage = {
        message: req.startMessageContent,
        boardId: req.board._id
    }

    if (next !== undefined) {
        next()
    }
}

exports.joinSuccessMessage = async (req, res, next) => {
    const LOC_LOC = "methode: joinSuccessMessage"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilGame.getCreateur(req)
        .then(value => {
            req.createur = value

            req.data.push({
                name: "utilGame.getCreateur",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.getCreateur",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilUser.getUserById(req.body.userId, req)
        .then(value => {
            req.challenger = value

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    req.joinSuccessMessage = {
        message: "Partie rejointe !",
        state: req.game.state,
        createurUsername: req.createur.username,
        challengerUsername: req.challenger.username
    }

    if (next !== undefined) {
        next()
    }
}

// test si c'est le tour de l'utilisateur ou de son adversaire
exports.testTurn = async (req, res, next) => {
    const LOC_LOC = "methode: testTurn"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    // teste l'état de la partie
    // si c'est le tour du créateur
    if (req.game.state === "CREATEUR_TURN") {
        await utilGame.testUserTurn(req.game.createurId, req.body.userId)
            .then(value => {
                req.testTurnMessage = value

                req.data.push({
                    name: "utilGame.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGame.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {


        await utilGame.testUserTurn(req.game.challengerId, req.body.userId)
            .then(value => {
                req.testTurnMessage = value

                req.data.push({
                    name: "utilGame.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGame.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour de personne
    } else {
        // renvoi un message pour informer que la partie est términer
        req.testTurnMessage = { message: "Game Over" }
    }

    await utilBoard.getBoardGameUser(req.body.gameId, req.body.userId)
        .then(value => {
            req.testTurnMessage.userBoard = value.board

            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.getBoardGameUser(req.body.gameId, req.game.challengerId)
        .then(value => {
            req.testTurnMessage.adversairBoard = value.board

            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

    return req.testTurnMessage
}

exports.tryPhraseResult = async (req, res, next) => {
    const LOC_LOC = "methode: tryPhraseResult"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilGame.getOtherUserId(req)
        .then(value => {
            req.adversaireId = value

            req.data.push({
                name: "utilGame.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.tryPhrase(req.adversaireId, req)
        .then(value => {
            req.check = value

            req.data.push({
                name: "utilBoard.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.check) {
        await this.endGame(req, res)
            .then(value => {
                req.data.push({
                    name: "this.endGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.endGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        req.tryPhraseResultMessage = "Success!"

    } else {

        req.tryPhraseResultMessage = "Wrong phrase!"

    }

    if (next !== undefined) {
        next()
    }
}

// fini la partie
exports.endGame = async (req, res, next) => {
    const LOC_LOC = "methode: endGame"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    req.newState = "ENDED"

    if (next !== undefined) {
        next()
    }

    return req.newState
}

// test une case de la grille
exports.tryCase = async (req, res, next) => {
    const LOC_LOC = "methode: tryCase"

    if (await utilCheck.dataValidityTest(req, next)) {
        return null
    }

    await utilGame.getOtherUserId(req)
        .then(value => {
            req.adversaireId = value

            req.data.push({
                name: "utilGame.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilGame.switchArrayY(req.method)
        .then(value => {
            req.arrayY = value

            req.data.push({
                name: "utilGame.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilGame.switchArrayX(req.route)
        .then(value => {
            req.arrayX = value

            req.data.push({
                name: "utilGame.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.checkBoard(req.arrayY, req.arrayX, req.body.gameId, req.adversaireId)
        .then(value => {
            req.check = value

            req.data.push({
                name: "utilBoard.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.getGame(req, res)
        .then(value => {
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.check.result) {

        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Touché!",
            word: req.check.word.content,
            position: req.check.word.position
        }

    } else {

        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Manqué!"
        }
    }

    if (next !== undefined) {
        next()
    }
}

exports.updateGame = async (req, res, next) => {
    const LOC_LOC = "methode: updateGame"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value

            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    if (typeof req.newState !== 'undefined') {
        await utilGame.updateGameState(req, res)
            .then(value => {
                req.data.push({
                    name: "utilGame.updateGameState",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGame.updateGameState",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    if (typeof req.newChallenger !== 'undefined') {
        await utilGame.updateGameChallenger(req, res)
            .then(value => {
                req.data.push({
                    name: "utilGame.updateGameChallenger",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGame.updateGameChallenger",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    if (next !== undefined) {
        next()
    }
}

// change le toour 
exports.switchTurn = async (req, res, next) => {
    const LOC_LOC = "methode: switchTurn"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    if (req.game.state === "CREATEUR_TURN") {
        req.newState = "CHALLENGER_TURN"

    } else if (req.game.state === "CHALLENGER_TURN") {
        req.newState = "CREATEUR_TURN"
    }

    if (next !== undefined) {
        next()
    }
}

exports.checkStartUserId = async (req, res, next) => {
    const LOC_LOC = "methode: checkStartUserId"

    if (await utilCheck.dataValidityTest(req, next)) {
        return null
    }

    await utilGame.checkStartStat(req)
        .then(value => {
            req.check = value

            req.data.push({
                name: "utilGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.check) {
        await utilGame.startCoinFlip(req, res)
            .then(value => {
                req.startUserId = value

                req.data.push({
                    name: "utilGame.startCoinFlip",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGame.startCoinFlip",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

    } else {

        await utilGame.testTurnUserId(req, res)
            .then(value => {
                req.startUserId = value

                req.data.push({
                    name: "utilGame.testTurnUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGame.testTurnUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    if (next !== undefined) {
        next()
    }
}