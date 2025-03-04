// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour res
const utilGame = require('../util/game')

// import fonctions util pour res
const utilUser = require('../util/user')

// import fonctions util pour res
const utilBoard = require('../util/board')

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

        if (next !== undefined) {
            next()
        }
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
        console.log("file: ../middleware/game methode: formatedGames error: formatedGamesList is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: formatedGames error: formatedGamesList is empty", res)
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

    /*if (createur === null) {
        console.log("file: ../middleware/game methode: formatedGame error: createur is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: createur is empty", res)
    }*/

    const createurUsername = await utilGame.checkCreatorNotNull(createur)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: failed to utilGame.checkCreatorNotNull", res)
        })

    if (createurUsername === null) {
        console.log("file: ../middleware/game methode: formatedGame error: createurUsername is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: createurUsername is empty", res)
    }


    const formatedGame = await utilGame.formatedMessage(req.game, createurUsername)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: failed to this.formatedMessage", res)
        })

    if (formatedGame === null) {
        console.log("file: ../middleware/game methode: formatedGame error: formatedGamesList is empty")

        utilRes.sendError(404, "file: ../middleware/game methode: formatedGame error: formatedGamesList is empty", res)
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

    req.game = game

    if (next !== undefined) {
        next()
    }
}

// sauvegarde un jeux et le retourne
exports.saveGame = async (req, res, next) => {
    const savedGame = await req.game.save()
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: saveGame error: failed to req.game.save", res)
        })

    if (savedGame === null) {
        console.log("file: ../middleware/game methode: saveGame error: savedGame is null")

        utilRes.sendError(404, "file: ../middleware/game methode: saveGame error: savedGame is null", res)
    } else {
        req.savedGame = savedGame

        if (next !== undefined) {
            next()
        }
    }
}

// permet à un utilisateur de rejoindre une partie
exports.joinGame = async (req, res, next) => {
    req.newState = "SETTINGS"
    req.newChallenger = req.body.userId

    if (next !== undefined) {
        next()
    }
}

// construit le message de départ
exports.startMessage = async (req, res, next) => {

    const board = await utilBoard.fillBoard(req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: startMessage error: failed to utilBoard.fillBoard", res)
        })

    if (board === null) {
        console.log("file: ../middleware/game methode: startMessage error: board is null")

        utilRes.sendError(404, "file: ../middleware/game methode: startMessage error: board is null", res)
    }

    const startMessage = await utilGame.startMessageTest(req.body.userId, req.startUserId)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: startMessage error: failed to utilGame.startMessageTest", res)
        })

    if (startMessage === null) {
        console.log("file: ../middleware/game methode: startMessage error: message is null")

        utilRes.sendError(404, "file: ../middleware/game methode: startMessage error: message is null", res)
    } else {
        req.startMessage = {
            message: startMessage,
            boardId: board._id
        }

        if (next !== undefined) {
            next()
        }
    }
}

exports.joinSuccessMessage = async (req, res, next) => {

    const createur = await utilGame.getCreateur(req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: joinSuccessMessage error: failed to utilGame.getCreateur", res)
        })

    if (createur === null) {
        console.log("file: ../middleware/game methode: joinSuccessMessage error: createur is null")

        utilRes.sendError(404, "file: ../middleware/game methode: joinSuccessMessage error: createur is null", res)
    }

    const challenger = await utilUser.getUserById(req.body.userId)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: joinSuccessMessage error: failed to utilUser.getUserById", res)
        })

    if (challenger === null) {
        console.log("file: ../middleware/game methode: joinSuccessMessage error: challenger is null")

        utilRes.sendError(404, "file: ../middleware/game methode: joinSuccessMessage error: challenger is null", res)
    } else {
        req.joinSuccessMessage = {
            message: "Partie rejointe !",
            state: req.game.state,
            createurUsername: createur.username,
            challengerUsername: challenger.username
        }

        if (next !== undefined) {
            next()
        }
    }
}

// test si c'est le tour de l'utilisateur ou de son adversaire
exports.testTurn = async (req, res, next) => {

    // teste l'état de la partie
    // si c'est le tour du créateur
    if (req.game.state === "CREATEUR_TURN") {

        var testTurnMessage = await utilGame.testUserTurn(req.game.createurId, req.body.userId)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: testTurn error: failed to utilGame.testUserTurn - CREATEUR_TURN", res)
            })

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {


        var testTurnMessage = await utilGame.testUserTurn(req.game.challengerId, req.body.userId)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: testTurn error: failed to utilGame.testUserTurn - CHALLENGER_TURN", res)
            })

        // si c'est le tour de personne
    } else {

        // renvoi un message pour informer que la partie est términer
        var testTurnMessage = { message: "Game Over" }

    }

    if (testTurnMessage === null) {
        console.log("file: ../middleware/game methode: testTurn error: testTurnMessage is null")

        utilRes.sendError(404, "file: ../middleware/game methode: testTurn error: testTurnMessage is null", res)
    } else {
        req.testTurnMessage = testTurnMessage

        if (next !== undefined) {
            next()
        }
    }
}

exports.tryPhraseResult = async (req, res, next) => {

    const adversaireId = await utilGame.getOtherUserId(req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: tryPhraseResult error: failed to utilGame.getOtherUserId", res)
        })

    if (adversaireId === null) {
        console.log("file: ../middleware/game methode: testTurn error: adversaireId is null")

        utilRes.sendError(404, "file: ../middleware/game methode: testTurn error: adversaireId is null", res)
    }

    const check = await utilBoard.tryPhrase(adversaireId, req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: tryPhraseResult error: failed to utilBoard.tryPhrase", res)
        })

    if (check === null) {
        console.log("file: ../middleware/game methode: testTurn error: check is null")

        utilRes.sendError(404, "file: ../middleware/game methode: testTurn error: check is null", res)
    }

    if (check) {

        await this.endGame(req, res)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: tryPhraseResult error: failed to this.endGame", res)
            })

        req.tryPhraseResultMessage = "Success!"

        if (next !== undefined) {
            next()
        }

    } else {

        req.tryPhraseResultMessage = "Wrong phrase!"

        if (next !== undefined) {
            next()
        }
    }
}

// fini la partie
exports.endGame = async (req, res, next) => {
    req.newState = "ENDED"

    if (next !== undefined) {
        next()
    }
}

// test une case de la grille
exports.tryCase = async (req, res, next) => {

    const adversaireId = await utilGame.getOtherUserId(req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: failed to utilGame.getOtherUserId", res)
        })

    if (adversaireId === null) {
        console.log("file: ../middleware/game methode: tryCase error: adversaireId is null")

        utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: adversaireId is null", res)
    }

    const arrayY = await utilGame.switchArrayY(req.method)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: tryCase error: failed to utilGame.switchArrayY", res)
        })

    if (arrayY === null) {
        console.log("file: ../middleware/game methode: tryCase error: adversaireId is arrayY")

        utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: adversaireId is arrayY", res)
    }

    const arrayX = await utilGame.switchArrayX(req.route)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: tryCase error: failed to utilGame.switchArrayX", res)
        })

    if (arrayX === null) {
        console.log("file: ../middleware/game methode: tryCase error: adversaireId is arrayX")

        utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: adversaireId is arrayX", res)
    }

    const check = await utilBoard.checkBoard(arrayY, arrayX, req.body.gameId, adversaireId)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: tryCase error: failed to utilBoard.checkBoard", res)
        })

    if (check === null) {
        console.log("file: ../middleware/game methode: tryCase error: check is null")

        utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: check is null", res)
    }

    await this.getGame(req, res)
        .catch(error => {
            console.log(error)

            utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: failed to this.getGame", res)
        })

    if (check.result) {

        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Touché!",
            word: check.word.content,
            position: check.word.position
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
    if (typeof req.newState !== 'undefined') {
        await utilGame.updateGameState(req, res)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: updateGame error: failed to utilGame.updateGameState", res)
            })
    }

    if (typeof req.newChallenger !== 'undefined') {
        await utilGame.updateGameChallenger(req, res)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: updateGame error: failed to utilGame.updateGameChallenger", res)
            })
    }

    if (next !== undefined) {
        next()
    }
}

// change le toour 
exports.switchTurn = async (req, res, next) => {

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

    const check = await utilGame.checkStartStat(req)
        .catch(error => {
            console.log(error)

            utilRes.sendError(500, "file: ../middleware/game methode: checkStartUserId error: failed utilGame.checkStartStat", res)
        })

    if (check === null) {
        console.log("file: ../middleware/game methode: checkStartUserId error: check is null")

        utilRes.sendError(404, "file: ../middleware/game methode: tryCase error: check is null", res)
    }

    if (check) {
        req.startUserId = await utilGame.startCoinFlip(req, res)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: checkStartUserId error: failed utilGame.startCoinFlip", res)
            })

    } else {

        req.startUserId = await utilGame.testTurnUserId(req, res)
            .catch(error => {
                console.log(error)

                utilRes.sendError(500, "file: ../middleware/game methode: checkStartUserId error: failed utilGame.testTurnUserId", res)
            })
    }

    if (next !== undefined) {
        next()
    }
}