const utilFindPlayerV2 = require('../player/find')

const utilFindWordV2 = require('../word/find')

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
 * @returns                 req.body.gamesPlayers
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

    req.body.gamesPlayers = []

    if (req.body.game !== undefined) {
        req.body.games = [req.body.game]
    }

    for (const game in req.body.games) {

        req.body.gameIdV2 = req.body.games[game]._id

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


        req.body.gamesPlayers.push({
            game: req.body.games[game],
            players: req.body.players
        })

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
 * @param {*}   obligatory: req.body.gamesPlayers
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