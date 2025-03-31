
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
const utilUpdateWordV2 = require('../util/word/update')

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
 * 
 * @returns             req.body
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

    if(req.body.targetUserId === undefined){
        req.body.userId = undefined
    }

    req.body.userId = req.body.targetUserId

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

    req.body.all = []

    for (const game in req.body.gamesPlayers) {
        req.body.all.push({
            game: req.body.gamesPlayers[game].game,
            players: []
        })
        for (const player in req.body.gamesPlayers[game].players) {
            req.body.all[game].players.push({
                player: req.body.gamesPlayers[game].players[player],
                words: []
            })
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
                
            req.body.all[game].players[player].words.push(req.body.words)
            console.log(req.body.gamesPlayers[0])
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


/**
 * 
 * @param {*} obligatory    req.body.gameIdV2
 * @param {*} obligatory    req.body.userId
 * @param {*} optional      req.body.playerId
 * 
 * @returns                 req.body
 */
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

    if (req.body.player.status === "PLAYER_TURN" || req.body.player.status === "WAIT") {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "Player already started"
        req.data.push({
            name: "req.body.player.status !== PLAYER_TURN && req.body.player.status !== WAIT",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }


    if (req.body.player.userId === req.body.userId && req.body.player._id.toString() === req.body.playerId) {

        for (const word in req.body.phrase) {

            req.body.content = req.body.phrase[word].content
            req.body.playerId = req.body.player._id
            req.body.phrasePosition = req.body.phrase[word].phrasePosition
            req.body.boardPosition = req.body.phrase[word].boardPosition
            console.log(req.body)
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

// fini la partie
exports.endGameV2 = async (req, res, next) => {
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

    req.body.gameStatus = "ENDED"

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

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.body
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

exports.tryPhraseV2 = async (req, res, next) => {
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

    req.body.clientId = req.body.playerId

    req.body.playerId = req.body.targetPlayerId

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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    var wordCount = 0
    var wordFound = 0

    for (const wordFind in req.body.words) {

        wordCount = wordCount + 1

        for (const wordTest in req.body.phrase)

            if (req.body.phrase[wordTest].content === req.body.words[wordFind].content && req.body.phrase[wordTest].phrasePosition === req.body.words[wordFind].phrasePosition) {

                wordFound = wordFound + 1

            }
    }

    if (wordCount === wordFound && wordFound !== 0) {

        req.body.gameStatus = "WON"

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
    }

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.playerId = req.body.clientId

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

    req.body.playerStatus = "WINNER"
    await utilUpdatePlayerV2.updatePlayer(req)
        .then(value => {
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


    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    return req.body

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

// ecrit le message du test de la case à renvoyer au client
exports.tryCaseV2 = async (req, res, next) => {
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

    console.log(req.method)
    console.log(req.route)

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

    req.body.userId = undefined

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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    for (const word in req.body.words) {
        if (req.body.words[word].boardPosition.toUpperCase() === (req.method + " " + req.route).toUpperCase()) {
            req.body.word = req.body.words[word]
            req.body.wordStatus = "FOUND"

            await utilUpdateWordV2.updateWord(req)
                .then(value => {
                    req.data.push({
                        name: "utilUpdateWordV2.updateWord",
                        loc: LOC_GLOB + " " + LOC_LOC,
                        value: value
                    })
                })
                .catch(error => {
                    console.log(error)
                    req.data.push({
                        name: "utilUpdateWordV2.updateWord",
                        loc: LOC_GLOB + " " + LOC_LOC,
                        error: error
                    })
                })

            req.body.words[word] = req.body.word
        }
    }

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.playerId = undefined
    req.body.userId = undefined
    req.body.playerStatus = undefined

    await utilFindPlayerV2.findPlayer(req)
        .then(value => {
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

    var test = 0

    for (const player in req.body.players) {

        if (req.body.players[player].status === "PLAYER_TURN") {
            req.body.player = req.body.players[player]
            req.body.playerStatus = "WAIT"

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
            test = 1

        } else if (test === 1) {

            test = 2

            req.body.player = req.body.players[player]
            req.body.playerStatus = "PLAYER_TURN"

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

        }
    }

    if (test === 1) {
        req.body.player = req.body.players[0]
        req.body.playerStatus = "PLAYER_TURN"

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
    }

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.package
}

