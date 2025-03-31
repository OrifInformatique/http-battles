
// import fonctions util pour game
const utilGame = require('../util/game')

// import fonctions util 
const utilCreateGameV2 = require('../util/game/create')

// import fonctions util 
const utilFindGameV2 = require('../util/game/find')

// import fonctions util 
const utilUpdateGameV2 = require('../util/game/update')

// import fonctions util 
const utilCreatePlayerV2 = require('../util/player/create')

// import fonctions util 
const utilFindPlayerV2 = require('../util/player/find')

// import fonctions util 
const utilUpdatePlayerV2 = require('../util/player/update')

// import fonctions util 
const utilCreateWordV2 = require('../util/word/create')

// import fonctions util 
const utilFindWordV2 = require('../util/word/find')

// import fonctions util 
const utilGeneralV2 = require('../util/general/general')

// import fonctions util pour board
const utilCheck = require('../util/check')
const { util } = require('webpack')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../middleware/game"

exports.findGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.findGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package = value
            req.game = value.game
            req.createur = value.createur
            req.formatedGame = value.formatedGame

            req.data.push({
                name: "utilGame.getGameAndCreator",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.getGameAndCreator",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.package
}

/**
 * 
 * @param {*} optional  req.body.gameIdV2
 * @param {*} optional  req.body.creatorId
 * @param {*} optional  req.body.gameStatus
 * @returns             req.body.gamesPlayers
 */
exports.findGamesV2 = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    await utilFindGameV2.findGame(req)
        .then(value => {
            req.data.push({
                name: "utilFindGameV2.findGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGameV2.findGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.findPlayerForGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.findPlayerForGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.findPlayerForGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.gamesPlayersWords = []

    for (const game in req.body.gamesPlayers) {
        for (const player in req.body.gamesPlayers[game].players) {

            req.body.playerId = req.body.gamesPlayers[game].players[player]._id

            await utilFindWordV2.findWord(req)
                .then(value => {

                    req.data.push({
                        name: "utilFindWordV2.findWord",
                        loc: LOC_GLOB + " " + LOC_LOC,
                        value: value
                    })
                })
                .catch(error => {
                    console.log(error)
                    req.data.push({
                        name: "utilFindWordV2.findWord",
                        loc: LOC_GLOB + " " + LOC_LOC,
                        error: error
                    })
                })

            req.body.gamesPlayers.push({
                game: req.body.gamesPlayers[game],
                players: req.body.gamesPlayers[game].players[player],
                words: req.body.words
            })
        }
    }

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }


    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.body
}

// retourne toute les partie
exports.listGames = async (req, res, next) => {

    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGames"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.listGames(req)
        .then(value => {
            // stocke les jeux dans la requette
            req.package.games = value.games
            req.package.formatedGames = value.formatedGames
            req.games = value.games
            req.formatedGames = value.formatedGames

            req.data.push({
                name: "utilGame.listGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.listGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.package
}

// crée un objet jeux et le retourn
exports.createGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.createGame(req)
        .then(value => {
            req.package.gameCreated = value.game
            req.gameCreated = value.game

            req.data.push({
                name: "utilGame.createGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.createGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.package
}

/**
 * 
 * @param {*}   obligatory: req.auth.userId
 * @returns                 req.body.game
 * @returns                 req.body.player
 */
// crée un objet jeux et le retourn
exports.createGameV2 = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createGameV2"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    req.body.gameStatus = "WAITING_CHALLENGER"

    await utilCreateGameV2.createGame(req)
        .then(value => {
            req.data.push({
                name: "utilCreateGameV2.createGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreateGameV2.createGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.gameIdV2 = req.body.game._id
    req.body.userId = req.body.game.creatorId

    await utilCreatePlayerV2.createPlayer(req)
        .then(value => {
            req.data.push({
                name: "utilCreatePlayerV2.createPlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreatePlayerV2.createPlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.body
}

exports.checkTurn = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkTurn"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.checkTurn(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            // stocke le message de réponse dans la requete
            req.package.testTurnMessage = value.testTurnMessage
            req.testTurnMessage = value.testTurnMessage

            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            // stoque le plateau de l'utilisateur dans le message dans la requete pour le client
            req.package.testTurnMessage.userBoard = value.testTurnMessage.userBoard
            req.testTurnMessage.userBoard = value.testTurnMessage.userBoard

            // stoque le plateau de l'adversaire dans le message dans la requete pour le client
            req.package.testTurnMessage.adversaireBoard = value.testTurnMessage.adversaireBoard
            req.testTurnMessage.adversaireBoard = value.testTurnMessage.adversaireBoard

            req.data.push({
                name: "utilGame.constructCheckTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.constructCheckTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    return req.package
}

exports.startGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.startGame(req)
        .then(value => {
            req.package.game = value.game
            req.game = value.game

            req.package.check = value.check
            req.check = value.check

            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            // stoque le plateu après update dans la requete
            req.package.board = value.board
            req.board = value.board

            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.package.startMessageContent = value.startMessageContent
            req.startMessageContent = value.startMessageContent

            req.package.startMessage = value.startMessage
            req.startMessage = value.startMessage

            req.data.push({
                name: "utilGame.constructAndSaveStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.constructAndSaveStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    return req.package
}

exports.startGameV2 = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startGameV2"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }



    if (req.body.gameIdV2 === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No GameId"
        req.data.push({
            name: "req.body.gameIdV2 === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    await utilFindGameV2.findGame(req)
        .then(value => {
            req.body.game = req.body.games[0]

            req.data.push({
                name: "utilFindGameV2.findGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGameV2.findGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    if (req.body.game.status !== "SETTINGS" && req.body.game.status !== "PLAYING") {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "Can't start this game"
        req.data.push({
            name: "req.body.game.status !== SETTINGS || req.body.game.status !== PLAYING",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    await utilFindPlayerV2.findPlayer(req)
        .then(value => {
            req.body.player = req.body.players[0]
            req.data.push({
                name: "utilFindPlayerV2.findPlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindPlayerV2.findPlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }


    if (req.body.player.userId === req.body.userId && req.body.player._id.toString() === req.body.playerId && (req.body.player.status !== "PLAYER_TURN" && req.body.player.status !== "WAIT")) {

        for (const word in req.body.words) {

            req.body.content = req.body.words[word].content
            req.body.playerId = req.body.player._id
            req.body.phrasePosition = req.body.words[word].phrasePosition
            req.body.boardPosition = req.body.words[word].boardPosition

            await utilCreateWordV2.createWord(req)
                .then(value => {
                    req.data.push({
                        name: "utilCreateWordV2.createWord" + word,
                        loc: LOC_GLOB + " " + LOC_LOC,
                        value: value
                    })
                })
                .catch(error => {
                    console.log(error)
                    req.data.push({
                        name: "utilCreateWordV2.createWord" + word,
                        loc: LOC_GLOB + " " + LOC_LOC,
                        error: error
                    })
                })
        }
    }


    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    if (req.body.player.userId !== req.body.userId) {
        req.body.playerStatus = "PLAYER_TURN"
    } else {
        req.body.playerStatus = "WAIT"
    }

    await utilUpdatePlayerV2.updatePlayer(req)
        .then(value => {
            req.data.push({
                name: "utilUpdatePlayerV2.updatePlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdatePlayerV2.updatePlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.gameStatus = "PLAYING"

    await utilUpdateGameV2.updateGame(req)
        .then(value => {
            req.data.push({
                name: "utilUpdateGameV2.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateGameV2.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    return req.package
}

// permet à un utilisateur de rejoindre une partie
exports.joinGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.joinGame(req)
        .then(value => {
            req.package.game = value.game
            req.package.state = value.state
            req.package.challenger = value.challenger

            req.game = value.game
            req.state = value.state
            req.challenger = value.challenger

            req.package.createur = value.createur
            req.createur = value.createur

            req.package.user = value.user
            req.user = value.user

            req.package.joinSuccessMessage = value.joinSuccessMessage
            req.joinSuccessMessage = value.joinSuccessMessage

            req.data.push({
                name: "utilGame.findUpdateFormateAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.findUpdateFormateAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn les variables traitées pour la gestion d'erreur en dehors des middleware
    return req.package
}

/**
 * 
 * @param {*} obligatory    req.body.gameIdV2
 * @param {*} optional      req.body.creatorId
 * @param {*} optional      req.body.gameStatus
 * @returns                 req.body.gamesPlayers
 */
// permet à un utilisateur de rejoindre une partie
exports.joinGameV2 = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    req.body.creatorId = undefined
    req.body.gameStatus = undefined

    await utilFindGameV2.findGame(req)
        .then(value => {
            req.data.push({
                name: "utilFindGameV2.findGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGameV2.findGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        next()
        return null
    }

    req.body.game = req.body.games[0]

    // stop la méthode en cas d'échèque du test
    if (req.body.game.status !== "WAITING_CHALLENGER") {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "The game cannot be joined"
        req.data.push({
            name: "req.body.game.status !== WAITING_CHALLENGER",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    req.body.gameIdV2 = req.body.game._id
    req.body.userId = req.body.game.creatorId

    await utilCreatePlayerV2.createPlayer(req)
        .then(value => {
            req.data.push({
                name: "utilCreatePlayerV2.createPlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreatePlayerV2.createPlayer",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.gameStatus = "SETTINGS"

    await utilUpdateGameV2.updateGame(req)
        .then(value => {
            req.data.push({
                name: "utilUpdateGameV2.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateGameV2.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.playerId = undefined
    req.body.gameIdV2 = req.body.game._id
    req.body.userId = undefined
    req.body.playerStatus = undefined

    await utilGeneralV2.findPlayerForGame(req)
        .then(value => {
            req.body.game = req.body.gamesPlayers[0].game
            req.body.players = req.body.gamesPlayers[0].players
            req.data.push({
                name: "utilGeneralV2.findPlayerForGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.findPlayerForGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn les variables traitées pour la gestion d'erreur en dehors des middleware
    return req.body
}


// fini la partie
exports.endGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: endGame"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.endGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            req.package.state = value.state
            req.state = value.state

            req.data.push({
                name: "utilGame.findUpdateAndEndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.findUpdateAndEndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.package
}

exports.tryPhrase = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhrase"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.tryPhrase(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            // stoque le resultat dans la requet
            req.package.check = value.check
            req.check = value.check

            req.package.tryPhraseResultMessage = value.tryPhraseResultMessage
            req.tryPhraseResultMessage = value.tryPhraseResultMessage

            req.data.push({
                name: "utilGame.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    return req.package

}

// ecrit le message du test de la case à renvoyer au client
exports.tryCase = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryCase"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGame.tryCase(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            // stoque la position X du plateau dans la requette
            req.package.arrayX = value.arrayX
            req.arrayX = value.arrayX

            // stoque la position Y du plateau dans la requette
            req.package.arrayY = value.arrayY
            req.arrayY = value.arrayY

            // stoque le resultat (inclue le mot si réussi)
            req.check = value.check
            req.package.check = value.check

            req.tryCaseMessage = value.tryCaseMessage
            req.package.tryCaseMessage = value.tryCaseMessage

            req.package.state = value.state
            req.state = value.state

            // stoque le nouvel état de la partie dans la requette
            req.package.game = value.game
            req.game = value.game

            req.data.push({
                name: "utilGame.constructTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.constructTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.package
}

