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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
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
    if (req.game.state === "SETTINGS") {
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

    // sort aléatoirement un résultat true or false et le stock dans une constante
    const coinFlip = Math.floor(Math.random() * 2) == 0

    // retourn l'id de l'utilisateur en fonctions du resultat du test
    await this.coinFlipStartUserId(coinFlip, req)
        .then(value => {
            // stoque cette id dans la requete
            req.startUserId = value
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
    await this.coinFlipStartGameState(coinFlip)
        .then(value => {
            // stoque le nouvel étàt de la partie dans la requete
            req.newState = value
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

    // update la parite dans la base de donnée
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
            console.log(error)
            req.data.push({
                name: "middleGame.updateGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // retourne la variable traité pour la gestion d'erreur
    return req.startUserId
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
exports.coinFlipStartGameState = async (coinFlip) => {
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
    await middleGame.testTurn(req, res)
        .then(value => {
            // retourn le résultat et le stoque dans la requete
            req.turn = value

            req.data.push({
                name: "middleGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "middleGame.testTurn",
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
    }

}

// test quel utilisateur commence
exports.testUserTurn = async (gameUserId, reqId) => {
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
exports.switchArrayY = async (requestMode) => {
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
exports.switchArrayX = async (requestRoad) => {
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

// retourn l'objet du créateur de la partie en fonction de son id stocké dans la partie
exports.getCreateur = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getCreateur"

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

    // récupère un utilisateur suivant son id
    await utilUser.getUserById(req.game.createurId, req)
        .then(value => {
            // stoque cette utilisateur dans la requete en tant que createur
            req.createur = value
            console.log(value)
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

    // retourne la variable traité pour la gestion d'erreur
    return req.createur
}

// Update le challenger de la partie dans la base de donnée
exports.updateGameChallenger = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateGameChallenger"

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

    // update le challenger de la partie en fonction des informations contenu dans la requete
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
            console.log(error)
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // recupère la partie après l'update et la stoque dans la requete
    await middleGame.getGame(req, res)
        .then(value => {
            // stoque la partie dans la requete
            req.game = value

            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.game
}

// update l'état de la partie
exports.updateGameState = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateGameState"

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

    // update l'état de la partie
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
            console.log(error)
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la partie après l'update
    await middleGame.getGame(req, res)
        .then(value => {
            // stoque la partie dans la requete
            req.game = value

            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.game
}

