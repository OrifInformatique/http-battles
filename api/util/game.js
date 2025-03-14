// import le schema d'un utilisateur
const Game = require("../models/Game")

// import les fonction utiles pour utilisateur
const utilUser = require('../util/user')

// import fonctions util pour check
const utilCheck = require('../util/check')

// import fonctions middleware pour game
const middleGame = require('../middleware/game')

// import fonctions middleware pour user
const middleUser = require('../middleware/user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game"

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

    // récupère le créateur suivant l'id contenu dans le jeux dans la requete
    await middleUser.getCreatorById(req)
        .then(value => {
            // stoque le créateur dans la requete
            req.createur = value

            req.data.push({
                name: "middleUser.getCreatorById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "middleUser.getCreatorById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction middleUser.getCreatorById qui sont attendue à cause des donnée invalides
    await utilCheck.dataValidityFilter(req, "middleUser.getCreatorById")
        .then(value => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction utilUser.getUserById qui sont attendue à cause des donnée invalides
    await utilCheck.dataValidityFilter(req, "utilUser.getUserById")
        .then(value => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction User.findOne qui sont attendue à cause des donnée invalides
    await utilCheck.dataValidityFilter(req, "User.findOne")
        .then(value => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'username de l'objet createur contenu dans la requete
    await middleGame.getCreateurUsername(req)
        .then(value => {
            // stoque cette username dans la requete
            req.createurUsername = value

            req.data.push({
                name: "middleGame.getCreateurUsername",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.getCreateurUsername",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction middleUser.getCreatorById qui sont attendue à cause des donnée invalides
    await utilCheck.dataValidityFilter(req, "middleUser.getCreatorById")
        .then(value => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilCheck.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // formate la partie contenu dans la requete
    await middleGame.formatedGame(req)
        .then(value => {
            // stoque le jeux formaté dans la requete
            req.formatedGame = value

            req.data.push({
                name: "middleGame.formatedGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.formatedGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

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
exports.formatedMessage = async (game, createurUsername, req) => {
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
        state: game.state,
        createurUsername: createurUsername,
        gameId: game._id
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
    if (req.game.state === "SETTINGS") {
        return true
    } else {
        return false
    }
}

// choisit aléatoirement le premier utilisateur à commencer
exports.startCoinFlip = async (req, res) => {
    const LOC_LOC = "methode: startCoinFlip"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    // sort aléatoirement un résultat true or false et le stock dans une constante
    const coinFlip = Math.floor(Math.random() * 2) == 0

    await this.coinFlipStartUserId(coinFlip, req)
        .then(value => {
            req.startUserId = value
            req.data.push({
                name: "this.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.coinFlipStartGameState(coinFlip)
        .then(value => {
            req.newState = value
            req.data.push({
                name: "this.coinFlipStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.coinFlipStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await middleGame.updateGame(req, res)
        .then(value => {
            req.newState = value.newState

            req.data.push({
                name: "middleGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.startUserId
}

exports.coinFlipStartUserId = async (coinFlip, req) => {

    if (coinFlip) {

        return req.game.createurId

    } else {

        return req.game.challengerId

    }
}

exports.coinFlipStartGameState = async (coinFlip) => {

    if (coinFlip) {

        return "CREATEUR_TURN"

    } else {

        return "CHALLENGER_TURN"

    }
}

// construit le message de départ
exports.getOtherUserId = async (req) => {

    if (req.auth.userId === req.game.createurId) {

        return req.game.challengerId

    } else {

        return req.game.createurId

    }
}


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

    if (req.auth.userId === req.startUserId) {
        return "You start"
    } else {
        return "Your opponent start"
    }
}

exports.testTurnUserId = async (req, res) => {
    const LOC_LOC = "methode: testTurnUserId"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await middleGame.testTurn(req, res)
        .then(value => {
            req.turn = value

            req.data.push({
                name: "middleGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.turn.message === "Your turn") {

        return req.auth.userId

    } else if (req.turn.message === "Wait") {

        await this.getOtherUserId(req)
            .then(value => {
                req.testTurnUserId = value

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
        return req.testTurnUserId
    }

}


exports.testUserTurn = async (gameUserId, reqId) => {

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

exports.switchArrayY = async (requestMode) => {

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

exports.switchArrayX = async (requestRoad) => {

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


exports.getCreateur = async (req) => {
    const LOC_LOC = "methode: getCreateur"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilUser.getUserById(req.game.createurId, req)
        .then(value => {
            req.createur = value
            console.log(value)
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.createur
}

exports.updateGameChallenger = async (req, res) => {
    const LOC_LOC = "methode: updateGameChallenger"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await Game.updateOne({ _id: req.body.gameId }, {
        $set: {
            challengerId: req.newChallenger
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
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await middleGame.getGame(req, res)
        .then(value => {
            req.game = value

            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.game
}

exports.updateGameState = async (req, res) => {
    const LOC_LOC = "methode: updateGameState"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }
    console.log(typeof req.newState.toString())
    await Game.updateOne({ _id: req.body.gameId }, {
        $set: {
            state: req.newState
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
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await middleGame.getGame(req, res)
        .then(value => {
            req.game = value

            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.game
}

