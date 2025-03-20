// import le schema d'un utilisateur
const Game = require("../models/Game")

// import fonctions util pour check
const utilCheck = require('../util/check')

// import les fonction utiles pour utilisateur
const utilUser = require('../util/user')

// import les fonction utiles pour utilisateur
const utilCreateGame = require('../util/depthOne/createGame')

// import les fonction utiles pour utilisateur
const utilFindGame = require('../util/depthOne/findGame')



// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game"

// import les fonction utiles pour board
const utilBoard = require('../util/board')

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

exports.switchArrays = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrays"

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

    // retourne la position X de la case sur le plateaux en fonction de la route utilisée
    await this.switchArrayX(req.route, req)
        .then(value => {
            // stoque la position X du plateau dans la requette
            req.package.arrayX = value
            req.arrayX = value

            req.data.push({
                name: "this.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la position y de la case sur le plateaux en fonction de la méthode utilisée
    await this.switchArrayY(req.method, req)
        .then(value => {
            // stoque la position Y du plateau dans la requette
            req.package.arrayY = value
            req.arrayY = value

            req.data.push({
                name: "this.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.constructTryCase = async (req) => {
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

    await this.tryCaseAndSwitchTurn(req)
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
                name: "this.tryCaseAndSwitchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryCaseAndSwitchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await this.updateGame(req)
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

exports.tryCaseAndSwitchTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryCaseAndSwitchTurn"

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

    await this.getOtherBoardAndTryCase(req)
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

            req.data.push({
                name: "this.getOtherBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getOtherBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.switchTurn(req)
        .then(value => {
            req.package.state = value
            req.state = value

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

    return req.package
}

exports.getOtherBoardAndTryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getOtherBoardAndTryCase"

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

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await this.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value
            req.otherUserId = value

            req.data.push({
                name: "this.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.checkArrayBoardAndTryCase(req)
        .then(value => {
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

            req.data.push({
                name: "this.checkArrayBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.checkArrayBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.checkArrayBoardAndTryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkArrayBoardAndTryCase"

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

    await this.switchArrays(req)
        .then(value => {
            // stoque la position X du plateau dans la requette
            req.package.arrayX = value.arrayX
            req.arrayX = value.arrayX

            // stoque la position Y du plateau dans la requette
            req.package.arrayY = value.arrayY
            req.arrayY = value.arrayY

            req.data.push({
                name: "this.switchArrays",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.switchArrays",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.checkBoardAndTryCase(req)
        .then(value => {
            // stoque le resultat (inclue le mot si réussi)
            req.check = value.check
            req.package.check = value.check

            req.tryCaseMessage = value.tryCaseMessage
            req.package.tryCaseMessage = value.tryCaseMessage

            req.data.push({
                name: "this.checkBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.checkBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.checkBoardAndTryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoardAndTryCase"

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

    // test une case du plateau
    await utilBoard.checkBoard(req.arrayY, req.arrayX, req.body.gameId, req.otherUserId, req)
        .then(value => {
            // stoque le resultat (inclue le mot si réussi)
            req.check = value
            req.package.check = value

            req.data.push({
                name: "utilBoard.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.tryCase(req)
        .then(value => {
            req.tryCaseMessage = value
            req.package.tryCaseMessage = value

            req.data.push({
                name: "this.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findUpdateAndEndGame = async (req) => {
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

    await this.findAndEndGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            req.package.state = value.state
            req.state = value.state

            req.data.push({
                name: "this.findAndEndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findAndEndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await this.updateGame(req)
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

exports.findAndEndGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findAndEndGame"

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

    await this.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.endGame(req)
        .then(value => {
            req.package.state = value
            req.state = value

            req.data.push({
                name: "this.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.formatJoin = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatJoin"

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

    await utilUser.getCreatorAndChallenger(req)
        .then(value => {
            req.package.createur = value.createur
            req.createur = value.createur

            req.package.user = value.user
            req.user = value.user

            req.data.push({
                name: "utilUser.getCreatorAndChallenger",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUser.getCreatorAndChallenger",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stoque un message de success pour la partie rejointe qui contient le message, l'état de la partie, l'username du créateur, l'username du client
    await this.joinSuccessMessage(req)
        .then(value => {
            req.package.joinSuccessMessage = value
            req.joinSuccessMessage = value

            req.data.push({
                name: "this.joinSuccessMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.joinSuccessMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.checkStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStart"

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

    // check si la partie a commencé (true = non, false = oui)
    await this.checkStartStat(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value
            req.check = value

            req.data.push({
                name: "this.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.checkStartUserId(req)
        .then(value => {
            // stoque l'id du joueur qui commence
            req.package.startUserId = value
            req.startUserId = value

            req.data.push({
                name: "this.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.package
}
exports.getGameCheckStartAddBoardAndPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameCheckStartAddBoardAndPhrase"

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

    await this.getGameAndCheckStart(req)
        .then(value => {
            req.package.game = value.game
            req.game = value.game

            req.package.check = value.check
            req.check = value.check

            req.data.push({
                name: "this.getGameAndCheckStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGameAndCheckStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.createBoardAndInsertPhrase(req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            // stoque le plateu après update dans la requete
            req.package.board = value.board
            req.board = value.board

            req.data.push({
                name: "utilBoard.createBoardAndInsertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.createBoardAndInsertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.getGameAndCheckStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameAndCheckStartStat"

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

    await this.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // check si la partie a commencé (true = non, false = oui)
    await this.checkStart(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value.check
            req.check = value.check

            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.data.push({
                name: "this.checkStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.checkStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findUpdateFormateAndJoinGame = async (req) => {
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

    await this.findUpdateAndJoinGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.package.state = value.state
            req.package.challenger = value.challenger
            req.game = value.game
            req.state = value.state
            req.challenger = value.challenger

            req.data.push({
                name: "this.findUpdateAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findUpdateAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.formatJoin(req)
        .then(value => {
            req.package.createur = value.createur
            req.createur = value.createur

            req.package.user = value.user
            req.user = value.user

            req.package.joinSuccessMessage = value.joinSuccessMessage
            req.joinSuccessMessage = value.joinSuccessMessage

            req.data.push({
                name: "this.formatJoin",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.formatJoin",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findUpdateAndJoinGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findUpdateAndJoinGame"

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

    await this.findAndJoinGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.package.state = value.state
            req.package.challenger = value.challenger
            req.game = value.game
            req.state = value.state
            req.challenger = value.challenger

            req.data.push({
                name: "this.findAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await this.updateGame(req)
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

exports.findAndJoinGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findAndJoinGame"

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

    await this.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.joinGame(req)
        .then(value => {
            req.package.state = value.state
            req.package.challenger = value.challenger
            req.state = value.state
            req.challenger = value.challenger

            req.data.push({
                name: "this.joinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.joinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.package
}

// formate et filtres une liste de jeux
exports.formatAndFilterGames = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatAndFilterGame"

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
    // initialise la liste de jeux formatté dans la requete
    req.formatedGames = []

    // parcoure la liste de jeux dans la requet
    for (const game of req.games) {
        // enregistre le jeux de chaque boucle dans la requet
        req.game = game

        // formate le jeu et filtre les erreurs due aux donnée invalide
        await this.formatAndFilterGame(req)
            .then(value => {
                // stocke la partie formaté dans la list contenu dans la requet
                req.formatedGames.push(value)

                req.data.push({
                    name: "this.formatAndFilterGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.formatAndFilterGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traité pour la gestion d'erreur
    return req.formatedGames
}

// formate une partie et filtre les erreures due au données invalide
exports.formatAndFilterGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatAndFilterGame"

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
    req.formatedGame = {}
    // récupère l'utilisateur en fonction de son id en parametre (ici l'id du créateur contenu dans le jeux)
    await utilUser.getUserById(req.game.createurId, req)
        .then(value => {
            // stock l'username utilisateur trouvé dans la requete
            req.formatedGame.createur = value.username

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction utilUser.getCreatorById qui sont attendue à cause des donnée invalides
    await utilCheck.dataValidityFilterListGame(req)
        .then(value => {

            req.data.push({
                name: "utilCheck.dataValidityFilterListGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityFilterListGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    req.formatedGame.game = req.game

    // retourne la variable traité pour la gestion d'erreur
    return req.formatedGame
}


// test si le créateur exist et si il a un username, si non, retourn "unknown" 
exports.checkCreatorNotNull = async (createur, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkCreatorNotNull"

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

    // test si le créateur exist et si il a un username, si non, retourn "unknown" 
    if (createur === null || createur === undefined) {
        var createurUsername = "unknown"
    } else if (createur.username === undefined) {
        var createurUsername = "unknown"
    } else {
        var createurUsername = createur.username
    }
    // retourne la variable 
    return createurUsername
}

// formate le message
exports.formatedMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatedMessage"

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

    // formate le message
    var message = {
        game: req.game,
        createur: req.createur.username
    }
    // retourn le message
    return message
}


exports.checkStartStat = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartStat"

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

    // retourne true si la party est en mode settings
    if (req.game.state === "SETTINGS" || req.game.state === "ENDED") {
        return true
    } else {
        return false
    }
}

// choisit aléatoirement le premier utilisateur à commencer
exports.startCoinFlip = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startCoinFlip"

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

    await this.coinFlipStartMode(req)
        .then(value => {
            // stoque cette id dans la requete
            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.package.game.state = value.game.state
            req.data.push({
                name: "this.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update la parite dans la base de donnée
    await this.updateGame(req)
        .then(value => {
            req.package.game.state = value.state
            req.game.state = value.state

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

    // retourne la variable traité pour la gestion d'erreur
    return req.startUserId
}

exports.coinFlipStartMode = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartMode"

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
    // sort aléatoirement un résultat true or false et le stock dans une constante
    req.coinFlip = Math.floor(Math.random() * 2) == 0

    // retourn l'id de l'utilisateur en fonctions du resultat du test
    await this.coinFlipStartUserId(req.coinFlip, req)
        .then(value => {
            // stoque cette id dans la requete
            req.startUserId = value
            req.package.startUserId = value

            req.data.push({
                name: "this.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourn l'état de la partie en fonction du résultat du test
    await this.coinFlipStartGameState(req.coinFlip, req)
        .then(value => {
            // stoque le nouvel étàt de la partie dans la requete
            req.game.state = value
            req.package.state = value
            req.data.push({
                name: "this.coinFlipStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.coinFlipStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

// retourn l'id utilisateur qui commence
exports.coinFlipStartUserId = async (coinFlip, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartUserId"

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

    // retourn l'id utilisateur contenu dans la partie en fonction du test
    if (coinFlip) {

        return req.game.createurId

    } else {

        return req.game.challengerId

    }
}

//  retourn l'état de la partie en fonction du resultat du test
exports.coinFlipStartGameState = async (coinFlip, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartGameState"

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

    //  retourn l'état de la partie en fonction du résultat du test
    if (coinFlip) {

        return "CREATEUR_TURN"

    } else {

        return "CHALLENGER_TURN"

    }
}

// construit le message de départ
exports.getOtherUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getOtherUserId"

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

    // si le client est le créateur, retourn l'id du challenger
    if (req.auth.userId === req.game.createurId) {

        return req.game.challengerId

    } else {
        // sinon retourn l'id du créateur créateur
        return req.game.createurId

    }
}

// renvoie le message de départ décrivamt qui commence par rapport au client à l'origin de la requete
exports.startMessageTest = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessageTest"

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

    // renvoit le message de dépar, si le client est l'utilisateur qui commence, l'informe de cela
    if (req.auth.userId === req.startUserId) {
        return "You start"
    } else {
        // sinon, communique que l'autre utilisateur commence
        return "Your opponent start"
    }
}

// test si il s'agit du tour du client et renvoie l'identifiant du client qui commence
exports.testTurnUserId = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTurnUserId"

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

    // test quel utilisateur commence
    await this.testTurn(req, res)
        .then(value => {
            // retourn le résultat et le stoque dans la requete
            req.turn = value

            req.data.push({
                name: "this.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // suivant le resultat du test
    if (req.turn.message === "Your turn") {
        // stoque l'id du clien dans la requet en tant que l'utilisateur qui commence
        req.startUserId = req.auth.userId

        // retourne la variable traité pour la gestion d'erreur
        return req.auth.userId

    } else if (req.turn.message === "Wait") {
        // retourn l'id de l'adversaire du client
        await this.getOtherUserId(req)
            .then(value => {
                // stoque cette id dans la requete
                req.startUserId = value

                req.data.push({
                    name: "this.getOtherUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.getOtherUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
        // retourne la variable traité pour la gestion d'erreur
        return req.startUserId
    } else {
        return null
    }
}

// test quel utilisateur commence
exports.testUserTurn = async (gameUserId, reqId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testUserTurn"

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

    // test si le client est le créateur
    // si oui
    if (gameUserId === reqId) {

        // renvoi un message pour informer que c'est le tour du client
        return { message: "Your turn" }

        // si non
    } else {

        // renvoi un message pour informer que ce n'est pas le tour du client
        return { message: "Wait" }

    }
}

// retourn la position y sur le plateau en fonction de la methode utilisée
exports.switchArrayY = async (requestMode, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrayY"

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

    // retourn la position y sur le plateau en fonction de la methode utilisée
    switch (requestMode) {

        case "GET":

            return arrayY = 0

        case "POST":

            return arrayY = 1

        case "PUT":

            return arrayY = 2

        case "DELETE":

            return arrayY = 3

    }
}

// retourn la position x sur le plateau en fonction de la route utilisée
exports.switchArrayX = async (requestRoad, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrayX"

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

    // retourn la position x sur le plateau en fonction de la route utilisée
    switch (requestRoad) {

        case "A":

            return arrayX = 0

        case "B":

            return arrayX = 1


        case "C":

            return arrayX = 2

        case "D":

            return arrayX = 3

    }
}

// uodate la partie
exports.updateGame = async (req) => {

    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateGame"

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

    if (req.state !== undefined) {
        req.game.state = req.state
    }
    if (req.challenger !== undefined) {
        req.game.challengerId = req.challenger
    }

    // update l'état de la partie
    await Game.updateOne({ _id: req.body.gameId }, {
        $set: {
            state: req.game.state,
            challengerId: req.game.challengerId
        }
    })
        .then(value => {
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la partie après l'update
    await this.getGame(req)
        .then(value => {
            // stoque la partie dans la requete
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.game
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

exports.getFormatedGameAndCreator = async (req) => {
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
    await this.formatedMessage(req)
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

exports.findFormatAndFilterGames = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findFormatAndFilterGames"

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

    await this.findGames(req)
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
    await this.formatAndFilterGames(req)
        .then(value => {
            // stoque les jeux formatter pour le client dans la requette
            req.package.formatedGames = value
            req.formatedGames = value
            req.data.push({
                name: "this.formatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.formatAndFilterGames",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findGames = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGames"

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

    return req.games
}

exports.getGameAndCreator = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameAndCreator"

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

    await this.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'utilisateur en fonction de son id en parametre (ici l'id du créateur contenu dans le jeux)
    await utilUser.getUserById(req.game.createurId, req)
        .then(value => {
            // stock l'objet utilisateur trouvé dans la requete
            req.package.createur = value

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.joinGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinGame"

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

    // stock le nouelle état de la partie et le nouveaux challenger dans la requette
    req.state = "SETTINGS"
    req.challenger = req.auth.userId

    if (req.package === undefined) {
        req.package = {}
    }

    req.package.state = "SETTINGS"
    req.package.challenger = req.auth.userId

    return req.package
}

exports.constructAndSaveStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: constructAndSaveStart"

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

    await this.constructStart(req)
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
                name: "this.constructStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.constructStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await this.updateGame(req)
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

exports.constructCheckTurn = async (req) => {
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

    await this.checkTurn(req)
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
                name: "this.checkTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.checkTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.getBoardGameUserAndAdversaire(req)
        .then(value => {
            // stoque le plateau de l'utilisateur dans le message dans la requete pour le client
            req.package.testTurnMessage.userBoard = value.testTurnMessage.userBoard
            req.testTurnMessage.userBoard = value.testTurnMessage.userBoard

            // stoque le plateau de l'adversaire dans le message dans la requete pour le client
            req.package.testTurnMessage.adversaireBoard = value.testTurnMessage.adversaireBoard
            req.testTurnMessage.adversaireBoard = value.testTurnMessage.adversaireBoard

            req.data.push({
                name: "utilBoard.getBoardGameUserAndAdversaire",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.getBoardGameUserAndAdversaire",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.checkTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkTurn"

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

    await this.findGameAndTestTurn(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            // stocke le message de réponse dans la requete
            req.package.testTurnMessage = value.testTurnMessage
            req.testTurnMessage = value.testTurnMessage

            req.data.push({
                name: "this.findGameAndTestTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findGameAndTestTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await this.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value
            req.otherUserId = value

            req.data.push({
                name: "this.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getOtherUserId",
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

    await this.tryAndFormatePhrase(req)
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
                name: "this.tryAndFormatePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryAndFormatePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si oui update l'état de la partie
    await this.updateGame(req)
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

exports.tryAndFormatePhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryAndFormatePhrase"

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

    await this.findGameAndTryBoardPhrase(req)
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

            req.data.push({
                name: "this.findGameAndTryBoardPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findGameAndTryBoardPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.tryPhraseResult(req)
        .then(value => {
            req.package.tryPhraseResultMessage = value
            req.tryPhraseResultMessage = value
            req.data.push({
                name: "this.tryPhraseResultt",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "this.tryPhraseResult",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findGameAndTryBoardPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGameAndTryBoardPhrase"

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

    await this.findGameAndOtherUserId(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            req.data.push({
                name: "this.findGameAndOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.findGameAndOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la phrase de l'adversaire est celle de la requete 
    await utilBoard.tryPhrase(req.otherUserId, req)
        .then(value => {
            // stoque le resultat dans la requet
            req.package.check = value
            req.check = value

            req.data.push({
                name: "utilBoard.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.findGameAndOtherUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGameAndOtherUserId"

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

    await this.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await this.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value
            req.otherUserId = value

            req.data.push({
                name: "this.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getOtherUserId",
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

    await this.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // teste l'état de la partie
    await this.testTurn(req)
        .then(value => {
            // stocke le message de réponse dans la requete
            req.package.testTurnMessage = value
            req.testTurnMessage = value

            req.data.push({
                name: "this.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.constructStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: constructStart"

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

    await this.getGameCheckStartAddBoardAndPhrase(req)
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

            req.data.push({
                name: "this.getGameCheckStartAddBoardAndPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGameCheckStartAddBoardAndPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.startMessage(req)
        .then(value => {
            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.package.startMessageContent = value.startMessageContent
            req.startMessageContent = value.startMessageContent

            req.package.startMessage = value.startMessage
            req.startMessage = value.startMessage

            req.data.push({
                name: "this.startMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.startMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.startMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessage"

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

    // test si le client est l'utilisateur qui commence la partie
    await this.startMessageTest(req)
        .then(value => {
            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.package.startMessageContent = value
            req.startMessageContent = value

            req.data.push({
                name: "this.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.startMessageCreation(req)
        .then(value => {
            req.package.startMessage = value
            req.startMessage = value

            req.data.push({
                name: "this.startMessageCreation",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.startMessageCreation",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.startMessageCreation = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessageCreation"

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

    // stoque le message de départ dans la requette ainsi que l'id du plateux du client
    req.startMessage = {
        message: req.startMessageContent,
        boardId: req.board._id
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startMessage
}

exports.joinSuccessMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinSuccessMessage"

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

    // stoque un message de success pour la partie rejointe qui contient le message, l'état de la partie, l'username du créateur, l'username du client
    req.joinSuccessMessage = {
        message: "Partie rejointe !",
        state: req.game.state,
        createurUsername: req.createur.username,
        challengerUsername: req.user.username
    }

    return req.joinSuccessMessage
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
        await this.testUserTurn(req.game.createurId, req.auth.userId, req)
            .then(value => {
                // stocke le message de réponse dans la requete
                req.testTurnMessage = value

                req.data.push({
                    name: "this.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {
        // test si le client est le challenger et renvoit un message pour lui indiquer si c'est son tour
        await this.testUserTurn(req.game.challengerId, req.auth.userId, req)
            .then(value => {
                req.testTurnMessage = value

                req.data.push({
                    name: "this.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.testUserTurn - CHALLENGER_TURN",
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

exports.tryPhraseResult = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseResult"

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

    // si la phrase est juste
    if (req.check) {
        // termine la partie
        await this.endGame(req)
            .then(value => {
                req.state = value
                req.data.push({
                    name: "this.endGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.endGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // stoque un message de success dans la requette
        req.tryPhraseResultMessage = "Success!"

    } else {
        // si la phrase est fausse, stoque un message d'échèque dans la requette
        req.tryPhraseResultMessage = "Wrong phrase!"

    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.tryPhraseResultMessage
}

exports.endGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: endGame"

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

    // stoque le nouvelle état de lapartie dans la requete
    req.state = "ENDED"

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.state
}

exports.tryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryCase"

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

    // si le test de la case est réussi
    if (req.check.result) {

        // stoque  un message de success contenant le text, la case testé, le mot et sa position dans la requette
        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Touché!",
            word: req.check.word.content,
            position: req.check.word.position
        }
        // si le test est un echèque
    } else {
        // stoque un message d'échque avec la case testée
        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Manqué!"
        }
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.tryCaseMessage

}

exports.switchTurn = async (req) => {
    // location local pour la gestion d'erreur
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

    // test l'état de la partie
    if (req.game.state === "CREATEUR_TURN") {
        // si c'est le tour du créateur, donne le tour du challenger comme état à appliquer
        req.state = "CHALLENGER_TURN"

    } else if (req.game.state === "CHALLENGER_TURN") {
        // si c'est le tour du challenger, donne le tour du créateur comme état à appliquer
        req.state = "CREATEUR_TURN"
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.state
}

exports.checkStartUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartUserId"

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

    // test si la partie a déjà commencé
    if (req.check) {
        // si non (true) décide aléatoirement quel joueur commence et retourn son id
        await this.startCoinFlip(req)
            .then(value => {
                // stoque l'id du joueur qui commence
                req.startUserId = value

                req.data.push({
                    name: "this.startCoinFlip",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.startCoinFlip",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

    } else {
        // si oui (false), test de quel joueur c'est le tour et retourn son id
        await this.testTurnUserId(req)
            .then(value => {
                // stoque l'id du joueur qui commence
                req.startUserId = value

                req.data.push({
                    name: "this.testTurnUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.testTurnUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startUserId
}