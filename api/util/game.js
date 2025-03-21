// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour check
const utilCheck = require('../util/check')

// import les fonction utiles pour utilisateur
const utilUser = require('../util/user')

// import les fonction utiles pour createGame
const utilCreateGame = require('../util/depthOne/createGame')

// import les fonction utiles pour findGame
const utilFindGame = require('../util/depthOne/findGame')

// import les fonction utiles pour listGames
const utilListGames = require('../util/depthOne/listGames')

// import les fonction utiles pour joinGames
const utilJoinGame = require('../util/depthOne/joinGame')

// import les fonction utiles pour startGame
const utilStartGame = require('../util/depthOne/startGame')

// import les fonction utiles pour checkTurn
const utilCheckturn = require('../util/depthOne/checkTurn')

// import les fonction utiles pour endGame
const utilEndGame = require('../util/depthOne/endGame')

// import les fonction utiles pour endGame
const utilTryPhrase = require('../util/depthOne/tryPhrase')

// import les fonction utiles pour tryCase
const utilTryCase = require('../util/depthOne/tryCase')

// import les fonction utiles pour testTurn
const utilTestTurn = require('../util/depthOne/depthTwo/depthThree/testTurn')

// import les fonction utiles pour testUserTurn
const utilTestUserTurn = require('../util/depthOne/depthTwo/depthThree/depthFour/testUserTurn')

// import les fonction utiles pour getGame
const utilGetGame = require('../util/depthOne/depthTwo/depthThree/depthFour/getGame')


// import les fonction utiles pour updateGame
const utilUpdateGame = require('./depthOne/depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/updateGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game"

exports.getGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGame"

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

    // recherche le jeux en fonction de son id dams la base de données
    await Game.findOne({ _id: req.body.gameId })
        .then(value => {
            // stock l'objet jeux dans la requette
            req.game = value

            req.data.push({
                name: "Game.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.game
}


exports.tryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: constructTryCase"

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

    await utilTryCase.tryCaseAndSwitchTurn(req)
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

            req.data.push({
                name: "utilTryCase.tryCaseAndSwitchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.tryCaseAndSwitchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await utilUpdateGame.updateGame(req)
        .then(value => {

            // stoque le nouvel état de la partie dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.endGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findUpdateAndEndGame"

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

    if (req.package === undefined) {
        req.package = {}
    }

    await utilEndGame.findAndEndGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            req.package.state = value.state
            req.state = value.state

            req.data.push({
                name: "utilEndGame.findAndEndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilEndGame.findAndEndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await utilUpdateGame.updateGame(req)
        .then(value => {

            // stoque le nouvel état de la partie dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilUpdateGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.joinGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findUpdateFormateAndJoinGame"

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

    await utilJoinGame.findUpdateAndJoinGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.package.state = value.state
            req.package.challenger = value.challenger
            req.game = value.game
            req.state = value.state
            req.challenger = value.challenger

            req.data.push({
                name: "utilJoinGame.findUpdateAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilJoinGame.findUpdateAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilJoinGame.formatJoin(req)
        .then(value => {
            req.package.createur = value.createur
            req.createur = value.createur

            req.package.user = value.user
            req.user = value.user

            req.package.joinSuccessMessage = value.joinSuccessMessage
            req.joinSuccessMessage = value.joinSuccessMessage

            req.data.push({
                name: "utilJoinGame.formatJoin",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilJoinGame.formatJoin",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.createGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createGame"

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

    await utilCreateGame.createGame(req)
        .then(value => {
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilCreateAndSaveGame.createGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreateAndSaveGame.createGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilCreateGame.saveGame(req)
        .then(value => {
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilCreateAndSaveGame.saveGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreateAndSaveGame.saveGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getFormatedGameAndCreator"

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

    await utilFindGame.getGameAndCreator(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package = value
            req.game = value.game
            req.createur = value.createur

            req.data.push({
                name: "utilFindGame.getGameAndCreator",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGame.getGameAndCreator",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // formate le jeux pour le client
    await utilFindGame.formatedMessage(req)
        .then(value => {
            req.package.formatedGame = value
            // stoque le jeux formaté dans la requete
            req.formatedGame = value

            req.data.push({
                name: "utilFindGame.formatedMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGame.formatedMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.listGames = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: listGames"

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

    req.package = {}

    await utilListGames.findGames(req)
        .then(value => {
            // stocke les jeux dans la requette
            req.package.games = value
            req.games = value

            req.data.push({
                name: "this.findGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // formate les jeux de la requette et filtre les erreurs attendues due aux données obsolettes et invalides
    await utilListGames.formatAndFilterGames(req)
        .then(value => {
            // stoque les jeux formatter pour le client dans la requette
            req.package.formatedGames = value
            req.formatedGames = value
            req.data.push({
                name: "utilListGames.formatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilListGames.formatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}


exports.startGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startGame"

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

    await utilStartGame.constructStart(req)
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
                name: "utilStartGame.constructStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.constructStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await utilUpdateGame.updateGame(req)
        .then(value => {
            // stoque le nouvel état de la partie dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.checkTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: constructCheckTurn"

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

    await utilCheckturn.checkTurn(req)
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

            req.data.push({
                name: "utilCheckturn.checkTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheckturn.checkTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilCheckturn.getBoardGameUserAndAdversaire(req)
        .then(value => {
            // stoque le plateau de l'utilisateur dans le message dans la requete pour le client
            req.package.testTurnMessage.userBoard = value.testTurnMessage.userBoard
            req.testTurnMessage.userBoard = value.testTurnMessage.userBoard

            // stoque le plateau de l'adversaire dans le message dans la requete pour le client
            req.package.testTurnMessage.adversaireBoard = value.testTurnMessage.adversaireBoard
            req.testTurnMessage.adversaireBoard = value.testTurnMessage.adversaireBoard

            req.data.push({
                name: "utilCheckturn.getBoardGameUserAndAdversaire",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheckturn.getBoardGameUserAndAdversaire",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.tryPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhrase"

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

    await utilTryPhrase.tryAndFormatePhrase(req)
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
                name: "utilTryPhrase.tryAndFormatePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.tryAndFormatePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await utilUpdateGame.updateGame(req)
        .then(value => {

            // stoque le nouvel état de la partie dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findGameAndTestTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGameAndTestTurn"

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

    if (req.package === undefined) {
        req.package = {}
    }

    await utilGetGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // teste l'état de la partie
    await utilTestTurn.testTurn(req)
        .then(value => {
            // stocke le message de réponse dans la requete
            req.package.testTurnMessage = value
            req.testTurnMessage = value

            req.data.push({
                name: "utilTestTurn.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilTestTurn.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.testTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTurn"

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

    // teste l'état de la partie
    // si c'est le tour du créateur
    if (req.game.state === "CREATEUR_TURN") {
        // test si le client est le créateur et renvoit un message pour lui indiquer si c'est son tour
        await utilTestUserTurn.testUserTurn(req.game.createurId, req.auth.userId, req)
            .then(value => {
                // stocke le message de réponse dans la requete
                req.testTurnMessage = value

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {
        // test si le client est le challenger et renvoit un message pour lui indiquer si c'est son tour
        await utilTestUserTurn.testUserTurn(req.game.challengerId, req.auth.userId, req)
            .then(value => {
                req.testTurnMessage = value

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour de personne
    } else {
        // renvoi un message pour informer que la partie est términer
        req.testTurnMessage = { message: req.game.state }
    }

    return req.testTurnMessage
}