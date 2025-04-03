const utilUpdateGameV2 = require('../game/update')

const utilFindPlayerV2 = require('../player/find')

const utilUpdatePlayerV2 = require('../player/update')

const utilFindWordV2 = require('../word/find')

const utilCreateWordV2 = require('../word/create')

const utilFindUsers = require('../user/find')

const middleFindGameV2 = require('../../middleware/game')

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/general/general"


/**
 * Trouve les joueurs pour une liste de parties
 * 
 * @param {*}   obligatory: req.body.games
 * 
 * @returns                 req.body.all
 */
exports.findPlayerForGame = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findPlayerForGame"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    req.body.all = []

    if (req.body.game !== undefined) {
        req.body.games = [req.body.game]
    }

    for (const game in req.body.games) {

        req.body.gameIdV2 = req.body.games[game]._id

        req.body.all.push({
            game: req.body.games[game],
            players: []
        })

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
            req.body.all[game].players.push({
                player: req.body.players[player]
            })
        }

        // stop la méthode en cas d'échèque du test
        if (req.utilCheck) {
            return null
        }
    }

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}

/**
 * Trouve les mots des joueurs d'une liste de parties
 * 
 * @param {*}   obligatory: req.body.all
 * 
 * @returns                 req.body.all
 */
exports.findWordsForPlayersForGames = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findWordsForPlayersForGames"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    for (const game in req.body.all) {

        for (const player in req.body.all[game].players) {

            req.body.playerId = req.body.all[game].players[player].player._id
            req.body.all[game].players[player].words = []

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

            for (const word in req.body.words) {
                req.body.all[game].players[player].words.push({
                    word: req.body.words[word]
                })
            }
        }
    }

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }


    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}

/**
 * Trouve les users des joueurs d'une liste de parties
 * 
 * @param {*}   obligatory: req.body.all
 * 
 * @returns                 req.body.all
 */
exports.findUsersForPlayersForGames = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findUsersForPlayersForGames"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    for (const game in req.body.all) {

        for (const player in req.body.all[game].players) {

            req.body.userId = req.body.all[game].players[player].player.userId
            req.body.all[game].players[player].user = []

            await utilFindUsers.findUser(req)
                .then(value => {
                    req.data.push({
                        name: "utilFindUsers.findUser",
                        loc: LOC_GLOB + " " + LOC_LOC,
                        value: value
                    })
                })
                .catch(error => {
                    console.log(error)
                    req.data.push({
                        name: "utilFindUsers.findUser",
                        loc: LOC_GLOB + " " + LOC_LOC,
                        error: error
                    })
                })

            for (const user in req.body.users) {
                req.body.all[game].players[player].user.push(req.body.users[user].username)
            }
        }
    }

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }


    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}


/**
 * Trouve une partie, ses joueur et leurs mots après avoir filtrer la requete de toute variable parasite
 * 
 * @param {*}   obligatory: req.body.gameId
 * 
 * @returns                 req.body.all
 */
exports.filteredFindGame = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: filteredFindGame"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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
        return null
    }

    req.body.creatorId = undefined
    req.body.gameStatus = undefined
    req.body.playerId = undefined
    req.body.userId = undefined
    req.body.playerStatus = undefined
    req.body.wordId = undefined
    req.body.content = undefined
    req.body.playerId = undefined
    req.body.phrasePosition = undefined
    req.body.boardPosition = undefined
    req.body.wordStatus = undefined

    await middleFindGameV2.findGamesV2(req)
        .then(value => {
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

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}

/**
 * crée une list de mot à partir d'une phrase
 * 
 * @param {*}   obligatory: req.body.phrase
 * @param {*}   obligatory: req.body.phrase[word]
 * @param {*}   obligatory: req.body.phrase[word].content
 * @param {*}   obligatory: req.body.phrase[word].phrasePosition
 * @param {*}   obligatory: req.body.phrasephrase[word].boardPosition
 * @param {*}   obligatory: req.body.player
 * 
 * @returns                 req.body
 */
exports.createPhrase = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createPhrase"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    if (req.body.phrase === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No phrase"
        req.data.push({
            name: "req.body.phrase === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.player === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No player"
        req.data.push({
            name: "req.body.player === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    for (const word in req.body.phrase) {

        if (req.body.phrase[word] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No phrase[word]"
            req.data.push({
                name: "req.body.phrase[word] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.phrase[word].content === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No phrase[word].content"
            req.data.push({
                name: "req.body.phrase[word].content === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.phrase[word].phrasePosition === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No phrase[word].phrasePosition"
            req.data.push({
                name: "req.body.phrase[word].phrasePosition === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.phrase[word].boardPosition === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No phrase[word].boardPosition"
            req.data.push({
                name: "req.body.phrase[word].boardPosition === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

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

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}

/**
 * ATribue un status de début de partit au client
 * 
 * @param {*}   obligatory: req.body.clientId
 * @param {*}   obligatory: req.body.players
 * @param {*}   obligatory: req.body.players[player]
 * @param {*}   obligatory: req.body.players[player]._id
 * 
 * @returns                 req.body.player
 */
exports.startTurnAtribution = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: startTurnAtribution"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    if (req.body.clientId === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No clientId"
        req.data.push({
            name: "req.body.clientId === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    for (const player in req.body.players) {

        if (req.body.players === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No players"
            req.data.push({
                name: "req.body.players === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.players[player] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No players[player]"
            req.data.push({
                name: "req.body.players[player] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.players[player]._id === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No players[player]._id"
            req.data.push({
                name: "req.body.players[player]._id === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.players[player]._id.toString() === req.body.clientId.toString()) {
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

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}

/**
 * Test si la phrase donnée par le client est la bonne
 * 
 * @param {*}   obligatory: req.body.phrase
 * @param {*}   obligatory: req.body.phrase[word]
 * @param {*}   obligatory: req.body.words
 * @param {*}   obligatory: req.body.words[word]
 * @param {*}   obligatory: req.body.game
 * @param {*}   obligatory: req.body.game._id
 * @param {*}   obligatory: req.body.players
 * @param {*}   obligatory: req.body.players[player]
 * @param {*}   obligatory: req.body.players[player].status
 * 
 * @returns                 req.body.game
 */
exports.testPhrase = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: testPhrase"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    if (req.body.phrase === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No phrase"
        req.data.push({
            name: "req.body.phrase === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.words === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No words"
        req.data.push({
            name: "req.body.words === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.game === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No game"
        req.data.push({
            name: "req.body.game === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.game._id === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No game._id"
        req.data.push({
            name: "req.body.game._id === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    var wordCount = 0
    var wordFound = 0

    for (const wordFind in req.body.words) {

        if (req.body.words[wordFind] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No words[word]"
            req.data.push({
                name: "req.body.words[wordFind] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        wordCount = wordCount + 1

        for (const wordTest in req.body.phrase) {

            if (req.body.phrase[wordTest] === undefined) {
                var error = new Error()
                error.name = "Bad Request"
                error.message = "No phrase[word]"
                req.data.push({
                    name: "req.body.phrase[wordTest] === undefined",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
                return null
            }

            if (req.body.phrase[wordTest].content === req.body.words[wordFind].content && req.body.phrase[wordTest].phrasePosition === req.body.words[wordFind].phrasePosition) {

                wordFound = wordFound + 1

            }
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
    } else {
        this.switchTurn(req)
            .then(value => {
                req.data.push({
                    name: "this.switchTurn",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.switchTurn",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}

/**
 * passe au prochain tour
 * 
 * @param {*}   obligatory: req.body.players
 * @param {*}   obligatory: req.body.players[player]
 * @param {*}   obligatory: req.body.players[player].status
 * 
 * @returns                 req.body
 */
exports.switchTurn = async (req) => {
    // variable local de localisation
    const LOC_LOC = "methode: switchTurn"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
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

    if (req.body.players === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No players"
        req.data.push({
            name: "req.body.players === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    var test = 0

    for (const player in req.body.players) {

        if (req.body.players[player] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No players[player]"
            req.data.push({
                name: "req.body.players[player] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.players[player].status === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No players[player].status"
            req.data.push({
                name: "req.body.players[player].status === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

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


    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}