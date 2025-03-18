// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour game
const utilGame = require('../util/game')

// import fonctions util pour user
const utilUser = require('../util/user')

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

    await utilGame.getFormatedGameAndCreator(req)
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

    await utilGame.findFormatAndFilterGames(req)
        .then(value => {
            // stocke les jeux dans la requette
            req.package.games = value.games
            req.package.formatedGames = value.formatedGames
            req.games = value.games
            req.formatedGames = value.formatedGames

            req.data.push({
                name: "utilGame.findFormatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.findFormatAndFilterGames",
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

    await utilGame.constructCheckTurn(req)
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

    await utilGame.constructAndSaveStart(req)
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

    await utilGame.findUpdateFormateAndJoinGame(req)
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