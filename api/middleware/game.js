// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour game
const utilGame = require('../util/game')

// import fonctions util pour board
const utilCheck = require('../util/check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../middleware/game"

// retourne une partie selon sont id
exports.getGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGame"

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
    await utilGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.game = value

            req.data.push({
                name: "utilGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.game
}

// retourne toute les partie
exports.getGames = async (req, res, next) => {

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
            console.log("error")
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

    // recupère la liste de toutes les parties dans la base de données
    await Game.find()
        .then(value => {
            // stocke les jeux dans la requette
            req.games = value

            req.data.push({
                name: "Game.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.games
}

exports.formatedGames = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatedGames"

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

    // formate les jeux de la requette et filtre les erreurs attendues due aux données obsolettes et invalides
    await utilGame.formatAndFilterGames(req)
        .then(value => {
            // stoque les jeux formatter pour le client dans la requette
            req.formatedGames = value
            req.data.push({
                name: "utilGame.formatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.formatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.formatedGames
}

// formate un jeux
exports.formatedGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatedGame"

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

    // formate le jeux pour le client
    await utilGame.formatedMessage(req)
        .then(value => {
            // stoque le jeux formaté dans la requete
            req.formatedGame = value

            req.data.push({
                name: "utilGame.formatedMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.formatedMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.formatedGame
}

exports.getCreateurUsername = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getCreateurUsername"

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

    // check si le créateur exist et si il a un username atribué, si oui, retourn son nom d'utilisateur
    await utilGame.checkCreatorNotNull(req.createur, req)
        .then(value => {
            // ajoute le nom d'utilisateur à la requete
            req.createurUsername = value

            req.data.push({
                name: "utilGame.checkCreatorNotNull",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.checkCreatorNotNull",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.createurUsername
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
            console.log("error")
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

    await utilGame.createAndSaveGame(req)
        .then(value => {
            req.game = value
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
    return req.game
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

    await utilGame.joinGame(req)
        .then(value => {
            req.newState = value.newState
            req.newChallenger = value.newChallenger

            req.package = value
            req.data.push({
                name: "utilGame.joinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.joinGame",
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

// construit le message de départ
exports.startMessage = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessage"

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

    await utilGame.startMessage(req)
        .then(value => {
            req.startMessage = value
            req.data.push({
                name: "utilGame.startMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.startMessaget",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startMessage
}

exports.startMessageTest = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessageTest"

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

    // test si le client est l'utilisateur qui commence la partie
    await utilGame.startMessageTest(req)
        .then(value => {
            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.startMessageContent = value

            req.data.push({
                name: "utilGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startMessageContent
}

exports.joinSuccessMessage = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinSuccessMessage"

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

    // stoque un message de success pour la partie rejointe qui contient le message, l'état de la partie, l'username du créateur, l'username du client
    await utilGame.joinSuccessMessage(req)
        .then(value => {
            req.joinSuccessMessage = value
            req.data.push({
                name: "utilGame.joinSuccessMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.joinSuccessMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.joinSuccessMessage
}

// test si c'est le tour de l'utilisateur ou de son adversaire
exports.testTurn = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTurn"

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
            console.log("error")
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

    // teste l'état de la partie
    await utilGame.testTurn(req)
        .then(value => {
            // stocke le message de réponse dans la requete
            req.testTurnMessage = value

            req.data.push({
                name: "utilGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.testTurnMessage
}

// récupère l'identifiant de l'utilisateur opposant le client dans la partie 
exports.getOtherUserId = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getOtherUserId"

    // test de la validité des données
    await utilCheck.dataValidityTest(req, next)
        .then(value => {
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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await utilGame.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.otherUserId = value

            req.data.push({
                name: "utilGame.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.otherUserId
}

// renvoit le message aproprier pour le resultat du test de phrase du client
exports.tryPhraseResult = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseResult"

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
            console.log("error")
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

    await utilGame.tryPhraseResult(req)
        .then(value => {
            req.tryPhraseResultMessage = value
            req.data.push({
                name: "utilGame.tryPhraseResultt",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilGame.tryPhraseResult",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.tryPhraseResultMessage
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

    await utilGame.endGame(req)
        .then(value => {
            req.newState = value
            req.data.push({
                name: "utilGame.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // stoque le nouvelle état de lapartie dans la requete
    req.newState = "ENDED"

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.newState
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

    await utilGame.tryCase(req)
        .then(value => {
            req.tryCaseMessage = value
            req.data.push({
                name: "utilGame.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.tryCaseMessage
}

// retourne la position y de la case sur le plateaux en fonction de la méthode utilisée
exports.switchArrayY = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrayY"

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

    // retourne la position y de la case sur le plateaux en fonction de la méthode utilisée
    await utilGame.switchArrayY(req.method, req)
        .then(value => {
            // stoque la position Y du plateau dans la requette
            req.arrayY = value

            req.data.push({
                name: "utilGame.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.arrayY
}

// retourne la position X de la case sur le plateaux en fonction de la route utilisée
exports.switchArrayX = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrayX"

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

    // retourne la position X de la case sur le plateaux en fonction de la route utilisée
    await utilGame.switchArrayX(req.route, req)
        .then(value => {
            // stoque la position X du plateau dans la requette
            req.arrayX = value

            req.data.push({
                name: "utilGame.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.arrayX
}

// met à jour la partie en fonction des variable de la requete
exports.updateGame = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateGame"

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
            console.log("error")
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

    // initialise la variable update dans la requette
    req.update = {}


    // si oui update l'état de la partie
    await utilGame.updateGame(req)
        .then(value => {

            // stoque le nouvel état de la partie dans la requette
            req.game = value

            req.data.push({
                name: "utilGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.game
}

// change le toour 
exports.switchTurn = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchTurn"

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

    await utilGame.switchTurn(req)
        .then(value => {
            req.newState = value
            req.data.push({
                name: "utilGame.switchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.switchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.newState
}

// test qui est l'utilisateur qui commence
exports.checkStartUserId = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartUserId"

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
            console.log("error")
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

    await utilGame.checkStartUserId(req)
        .then(value => {
            // stoque l'id du joueur qui commence
            req.startUserId = value

            req.data.push({
                name: "utilGame.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilGame.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startUserId
}

// test si la partie à déja commencé
exports.checkStartStat = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartStat"

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
            console.log("error")
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

    // check si la partie a commencé (true = non, false = oui)
    await utilGame.checkStartStat(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.check = value

            req.data.push({
                name: "utilGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.check
}