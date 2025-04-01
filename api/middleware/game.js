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


/**
 * Test tout les midlleware Game
 * 
 * @returns             req.body
 * @returns             req.body.success
 */
exports.testAll = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testAll"

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

    req.auth.userId = "67a4c9208dbb3ff2526fed16"
    req.body.save = {
        success: {}
    }
    req.body.save.userId = "67a4c9208dbb3ff2526fed16"

    req.body.userId = req.body.save.userId

    await this.findGamesV2(req)
        .then(value => {
            req.body.save.success.findGamesV2 = "Success"
            req.data.push({
                name: "this.findGamesV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findGamesV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.userId = req.body.save.userId

    await this.createGameV2(req)
        .then(value => {
            req.body.save.success.createGameV2 = "Success"
            req.data.push({
                name: "this.createGameV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.createGameV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.save.gameId = req.body.game._id
    req.body.save.firstPlayerId = req.body.players[0]._id

    req.body.userId = req.body.save.userId
    req.body.gameId = req.body.save.gameId
    req.body.clientId = req.body.save.firstPlayerId

    await this.joinGameV2(req)
        .then(value => {
            req.body.save.success.joinGame = "Success"
            req.data.push({
                name: "this.joinGameV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.joinGameV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.save.firstPlayerId = req.body.players[0]._id
    req.body.save.seconPlayerId = req.body.players[1]._id
    req.body.save.phrase = [
        {
            "content": "test",
            "phrasePosition": "1",
            "boardPosition": "Get A"
        },
        {
            "content": "test2",
            "phrasePosition": "2",
            "boardPosition": "Get B"
        }
    ]

    req.body.userId = req.body.save.userId
    req.body.gameId = req.body.save.gameId
    req.body.clientId = req.body.save.firstPlayerId
    req.body.phrase = req.body.save.phrase

    await this.startGameV2(req)
        .then(value => {
            req.body.save.success.startGameV21 = "Success"
            req.data.push({
                name: "this.startGameV2-1",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.startGameV2-1",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.player = undefined

    req.body.userId = req.body.save.userId
    req.body.gameId = req.body.save.gameId
    req.body.clientId = req.body.save.seconPlayerId
    req.body.phrase = req.body.save.phrase

    await this.startGameV2(req)
        .then(value => {
            req.body.save.success.startGameV22 = "Success"
            req.data.push({
                name: "this.startGameV2-2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.startGameV2-2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.userId = req.body.save.userId
    req.body.gameId = req.body.save.gameId
    req.body.clientId = req.body.save.firstPlayerId
    req.body.targetId = req.body.save.seconPlayerId
    req.body.phrase = req.body.save.phrase
    req.method = "GET"
    req.route = "a"

    await this.tryCaseV2(req)
        .then(value => {
            req.body.save.success.tryCaseV21 = "Success"
            req.data.push({
                name: "this.tryCaseV2-1",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryCaseV2-1",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.userId = req.body.save.userId
    req.body.gameId = req.body.save.gameId
    req.body.clientId = req.body.save.seconPlayerId
    req.body.targetId = req.body.save.firstPlayerId
    req.body.phrase = req.body.save.phrase
    req.method = "GET"
    req.route = "b"

    await this.tryCaseV2(req)
        .then(value => {
            req.body.save.success.tryCaseV22 = "Success"
            req.data.push({
                name: "this.tryCaseV2-2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryCaseV2-2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    req.body.userId = req.body.save.userId
    req.body.gameId = req.body.save.gameId
    req.body.clientId = req.body.save.firstPlayerId
    req.body.targetId = req.body.save.seconPlayerId
    req.body.phrase = req.body.save.phrase

    await this.tryPhraseV2(req)
        .then(value => {
            req.body.save.success.tryPhraseV2 = "Success"
            req.data.push({
                name: "this.tryPhraseV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryPhraseV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await this.endGameV2(req)
        .then(value => {
            req.body.save.success.endGameV2 = "Success"
            req.data.push({
                name: "this.endGameV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.endGameV2",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.body
}

/**
 * retourne une liste de partie
 * 
 * @param {*} optional  req.body.gameIdV2/gameId
 * @param {*} optional  req.body.creatorId
 * @param {*} optional  req.body.gameStatus
 * 
 * @returns             req.body.games
 * @returns             req.body.game.players
 * @returns             req.body.game.player.words
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

    if (req.body.targetUserId === undefined) {
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

    await utilGeneralV2.findWordsForPlayersForGames(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.findWordsForPlayersForGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.findWordsForPlayersForGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }


    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.body
}

/**
 * Crée une partie
 * 
 * @param {*} obligatory    req.body.userId
 * 
 * @returns                 req.body.game
 * @returns                 req.body.player
 */
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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.filteredFindGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.filteredFindGamer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.filteredFindGame",
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

/**
 * Enregistre la phrase du client et commence la partie
 * 
 * @param {*} obligatory    req.body.gameIdV2/gameId
 * @param {*} obligatory    req.body.clientId
 * @param {*} obligatory    req.body.Phrase
 * 
 * @returns                 req.body.game.players
 * @returns                 req.body.game.player.words
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

    if (req.body.gameIdV2 === undefined && req.body.gameId === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No GameId"
        req.data.push({
            name: "req.body.gameIdV2 === undefined && req.body.gameId === undefined",
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

    req.body.userId = undefined
    req.body.playerId = req.body.clientId

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

    for (const player in req.body.players) {
        if (req.body.players[player]._id.toString() === req.body.playerId.toString()) {
            req.body.player = req.body.players[player]
        }
    }

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    if (req.body.player === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "Bad clientId"
        req.data.push({
            name: "req.body.player.status === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
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

    for (const word in req.body.phrase) {

        req.body.content = req.body.phrase[word].content
        req.body.playerId = req.body.player._id
        req.body.phrasePosition = req.body.phrase[word].phrasePosition
        req.body.boardPosition = req.body.phrase[word].boardPosition

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



    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }
    const clientPlayerId = req.body.playerId
    req.body.playerId = undefined

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

    for (const player in req.body.players) {
        if (req.body.players[player]._id.toString() === clientPlayerId.toString()) {
            req.body.player = req.body.players[player]

            if (req.body.player._id === req.body.players[0]._id) {
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
        }
    }

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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.filteredFindGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.filteredFindGamer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.filteredFindGame",
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


/**
 * Permet à un utilisateur de rejoindre une partie
 * 
 * @param {*} obligatory    req.body.gameIdV2/gameId
 * @param {*} obligatory    req.body.req.body.userId
 * 
 * @returns                 req.body.game.players
 */
exports.joinGameV2 = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinGameV2"

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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.filteredFindGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.filteredFindGamer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.filteredFindGame",
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

/**
 * Met fin à la partie
 * 
 * @param {*} obligatory    req.body.gameIdV2/gameId
 * 
 * @returns                 req.body.game
 */
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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.filteredFindGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.filteredFindGamer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.filteredFindGame",
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

/**
 * Test une phrase proposer par le client
 * 
 * @param {*} obligatory    req.body.gameIdV2/gameId
 * @param {*} obligatory    req.body.clientId
 * @param {*} obligatory    req.body.targetId
 * @param {*} obligatory    req.body.phrase
 * 
 * @returns                 req.body.game.players
 * @returns                 req.body.game.player.words
 */
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

    req.body.playerId = req.body.targetId

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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.filteredFindGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.filteredFindGamer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.filteredFindGame",
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

/**
 * Test une case selon sa route et methode
 * 
 * @param {*} obligatory    req.body.gameIdV2/gameId
 * @param {*} obligatory    req.body.clientId
 * @param {*} obligatory    req.body.targetId
 * 
 * @returns                 req.body.game.players
 * @returns                 req.body.game.player.words
 */
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

    // stop la méthode en cas d'échèque du test
    if (req.body.player.status === "WAIT") {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "It isn't this player turn"
        req.data.push({
            name: "req.body.player.status === WAIT",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    req.body.playerId = req.body.targetId

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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    await utilGeneralV2.filteredFindGame(req)
        .then(value => {
            req.data.push({
                name: "utilGeneralV2.filteredFindGamer",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGeneralV2.filteredFindGame",
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

