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
 * @param {*}   obligatory: req.body.games[game]
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

    // test de la donnée et retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.games === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No games"
        req.data.push({
            name: "req.body.games === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }


    // initialise la variable all dans la quel l'on va stoquer les données Games et les données connectéé
    req.body.all = []

    // ajoute la partie de la requete à la liste de parties de la requete si la list est vide
    if (req.body.game !== undefined) {
        req.body.games = [req.body.game]
    }

    // parcoure la list de game de la requete
    for (const game in req.body.games) {

        // test de la donnée et retourne une erreur et met fin à la fonction si la elle n'existe pas
        if (req.body.games[game] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No games[game]"
            req.data.push({
                name: "req.body.games[game] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        // stoque l'id de la partie de cette boucle dans la requete
        req.body.gameIdV2 = req.body.games[game]._id

        // push un object contenant la partie de cette boucle et une liste de player vide
        req.body.all.push({
            game: req.body.games[game],
            players: []
        })

        // cherche les player correspondant à l'id de cette partie
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

        // parcour les player trouver et les ajoute à la liste de player de cette partie
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
 * @param {*}   obligatory: req.body.all[game]
 * @param {*}   obligatory: req.body.all[game].players
 * @param {*}   obligatory: req.body.all[game].players[player]
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

    // test de la donnée et retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.all === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No all"
        req.data.push({
            name: "req.body.all === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    // parcoure les games contenu dans all
    for (const game in req.body.all) {

        if (req.body.all[game] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No all[game]"
            req.data.push({
                name: "req.body.all[game] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.all[game].players === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No all[game].players"
            req.data.push({
                name: "req.body.all[game].players === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        // parcoure les players contenu dans chaque game
        for (const player in req.body.all[game].players) {

            if (req.body.all[game].players[player] === undefined) {
                var error = new Error()
                error.name = "Bad Request"
                error.message = "No all[game].players[player]"
                req.data.push({
                    name: "req.body.all[game].players[player] === undefined",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
                return null
            }

            // ajoute l'id du player de la boucle dans la variable playerId
            req.body.playerId = req.body.all[game].players[player].player._id

            // initialise la variable words pour chaque player
            req.body.all[game].players[player].words = []

            // trouve les mots pour l'id de ce player et les stoque dans req.body.words
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

            // parcoure les mots trouvé pour les insérer un par un dans le tableaux
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
 * @param {*}   obligatory: req.body.all[game]
 * @param {*}   obligatory: req.body.all[game].players
 * @param {*}   obligatory: req.body.all[game].players[player]
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

    // test de la donnée et retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.all === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No all"
        req.data.push({
            name: "req.body.all === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    // parcoure les games contenu dans all
    for (const game in req.body.all) {

        if (req.body.all[game] === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No all[game]"
            req.data.push({
                name: "req.body.all[game] === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        if (req.body.all[game].players === undefined) {
            var error = new Error()
            error.name = "Bad Request"
            error.message = "No all[game].players"
            req.data.push({
                name: "req.body.all[game].players === undefined",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
            return null
        }

        // parcoure les players contenu dans chaque game
        for (const player in req.body.all[game].players) {

            // parcoure les players contenu dans chaque game
            if (req.body.all[game].players[player] === undefined) {
                var error = new Error()
                error.name = "Bad Request"
                error.message = "No all[game].players[player]"
                req.data.push({
                    name: "req.body.all[game].players[player] === undefined",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
                return null
            }

            // ajoute l'id du player de la boucle dans la variable playerId
            req.body.userId = req.body.all[game].players[player].player.userId

            // initialise la variable user pour chaque player
            req.body.all[game].players[player].user = []

            // trouve l'id du user pour chaque player (un utilisateur dans un tavleau user normalment dans un tableaux user)
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

            // parcour le tableau users et ajout l'username de l'utilisateur au player
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

    // traduit la variable gameId en gameIdV2
    if (req.body.gameId !== undefined) {
        req.body.gameIdV2 = req.body.gameId
    }

    // test de la donnée et retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.gameIdV2 === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No gameId"
        req.data.push({
            name: "req.body.gameIdV2 === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    // filtre les variables non désirée
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

    // trouve les informations connecté à la partie à travers le middleware findGamesV2 (simule une requete de recherche pour toute les informations de cette partie)
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

    // test des données et retourne une erreur et met fin à la fonction si la une n'existe pas
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

    // parcoure les mot de la phrase de la requete
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

        // assigne les variable du mot de cette boucle pour la créations du mot
        req.body.content = req.body.phrase[word].content
        req.body.playerId = req.body.player._id
        req.body.phrasePosition = req.body.phrase[word].phrasePosition
        req.body.boardPosition = req.body.phrase[word].boardPosition

        // crée le mot et l'enregistre dans la base de données
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

    // test des données et retourne une erreur et met fin à la fonction si la une n'existe pas
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

    // parcour les players contenu dans la requetes
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

        // test si le player de cette boucle est celui du client de la requete
        if (req.body.players[player]._id.toString() === req.body.clientId.toString()) {
            // si oui stoque ce player dans la requete
            req.body.player = req.body.players[player]

            // test si ce player est le premier dans la list (ordonnée par Id) et, si oui, lui donne le status du joueur avec le premier tour, si non, lui dit d'attendre
            if (req.body.player._id === req.body.players[0]._id) {
                req.body.playerStatus = "PLAYER_TURN"
            } else {
                req.body.playerStatus = "WAIT"
            }

            // update le player et son status dans la base de données
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

    // test des données et retourne une erreur et met fin à la fonction si la une n'existe pas
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

    // initialise les variable pour compter les mot de l'adversaire et les mots que le client à trouver
    var wordCount = 0
    var wordFound = 0

    // parcours la phrase de la cible
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

        // incremente le compte des mot de la cible
        wordCount = wordCount + 1

        // parcours les mot de la phrase proposé par le client
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
            // si un mot est juste (à le même contenu) et se trouve à la bonne position, incremente le conte de mot trouvé
            if (req.body.phrase[wordTest].content === req.body.words[wordFind].content && req.body.phrase[wordTest].phrasePosition === req.body.words[wordFind].phrasePosition) {

                wordFound = wordFound + 1

            }
        }
    }

    // si le nombre de mot trouvé est le même que le nombre de mot de la cible
    if (wordCount === wordFound && wordFound !== 0) {

        // change l'état de la partie en tant que partie gagnée
        req.body.gameStatus = "WON"

        // enregistre le changement dans la base de donée
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
        // sinon, change le toure
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

    // test des données et retourne une erreur et met fin à la fonction si la une n'existe pas
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

    // intinialise la variable de test
    var test = 0

    // parcours les joueurs de la parties
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

        // si c'est le toure du player de cette boucle
        if (req.body.players[player].status === "PLAYER_TURN") {

            // stoque le player dans la requete
            req.body.player = req.body.players[player]

            // change le status du player pour lui dire que ce n'est plus sont tour
            req.body.playerStatus = "WAIT"

            // enregistre les modification dans la base de données
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

            // incremente le test pour signifier que c'est le tour du prochain joueur 
            test = 1

        // si ce n'est pas le tour du player de cette boucle test si le player précedent l'était
        } else if (test === 1) {
            // si oui, incremente le test pour le signifier
            test = 2

            // stoque le player dans la requete
            req.body.player = req.body.players[player]
            // change son statu pour signifier qu'il s'agit de son tour
            req.body.playerStatus = "PLAYER_TURN"

            // enregistre les modifications dans la base de données
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

    // si le joueur dont c'était le tour étais le dernier de la list, update le premier joueur pour signifer que c'est son tour
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