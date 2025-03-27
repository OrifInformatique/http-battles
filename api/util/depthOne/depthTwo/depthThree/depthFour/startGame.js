

// import fonctions util pour check
const utilCheck = require('../../../../check')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthFive/startGame')

// import les fonction utiles pour utilisateur
const utilCheckStartState = require('./depthFive/depthSix/depthBottom/checkStartState')

// import les fonction utiles pour utilisateur
const utilUpdateBoardXgetBoard = require('./depthFive/depthSix/crossRoad/updateBoardXgetBoard')

// import les fonction utiles pour utilisateur
const utilGetOtherUserId = require('./depthFive/depthSix/depthBottom/getOtherUserId')

// import les fonction utiles pour utilisateur
const utilUpdateXgetGame = require('./depthFive/depthSix/crossRoad/updateXgetGame')

// import les fonction utiles pour testUserTurn
const utilTestUserTurn = require('./depthFive/depthSix/depthBottom/testUserTurn')

const utilGetStartUserId = require('./depthFive/depthSix/depthBottom/getStartUserId')

const utilGetStartGameState = require('./depthFive/depthSix/depthBottom/getStartGameState')

const utilCoinFlip = require('./depthFive/depthSix/depthBottom/coinFlip')

const utilInsertWord = require('./depthFive/depthSix/depthBottom/insertWord')

const utilInsertBlank = require('./depthFive/depthSix/depthBottom/insertBlank')

const utilCreateWord = require('./depthFive/depthSix/depthBottom/createWord')

const utilSaveWord = require('./depthFive/depthSix/depthBottom/saveWord')

const utilCreatePhrase = require('./depthFive/depthSix/depthBottom/createPhrase')

const utilSavePhrase = require('./depthFive/depthSix/depthBottom/savePhrase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFour/startGame"


/*
subFunctions
    -utilCheckStartState.checkStartState
    -this.testStartUserChoiceMethode
        -this.coinFlipXupdateGame
            -this.coinFlipXGetStart
                -this.getStartUserIdXGameState
                    -utilGetStartUserId.getStartUserId
                    -utilGetStartGameState.getStartGameState
            -utilUpdateXgetGame.updateXgetGame
                -utilUpdateGame.updateGame
                -utilGetGame.getGame
        -this.testTurnUserId
            -this.testGameStateXclientTurn
                -utilTestUserTurn.testUserTurn
            -this.testClientOrAdvTurn
                -utilGetOtherUserId.getOtherUserId
*/
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

    // check si la partie a commencé (true = non, false = oui)
    await utilCheckStartState.checkStartState(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value.check
            req.check = value.check

            req.data.push({
                name: "utilStartGame.checkStartState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.checkStartState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.testStartUserChoiceMethode(req)
        .then(value => {
            // stoque l'id du joueur qui commence
            req.package.startUserId = value
            req.startUserId = value

            req.data.push({
                name: "this.testStartUserChoiceMethode",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.testStartUserChoiceMethode",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.package
}

/*
subFunctions
    -this.coinFlipXupdateGame
        -this.coinFlipXGetStart
            -this.getStartUserIdXGameState
                -utilGetStartUserId.getStartUserId
                -utilGetStartGameState.getStartGameState
        -utilUpdateXgetGame.updateXgetGame
            -utilUpdateGame.updateGame
            -utilGetGame.getGame
    -this.testGameStateXclientTurn
        -this.testGameStateAndUserTurn
            -utilTestUserTurn.testUserTurn
        -this.testClientOrAdvTurn
            -utilGetOtherUserId.getOtherUserId
*/
exports.testStartUserChoiceMethode = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testStartUserChoiceMethode"

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
        await this.coinFlipXupdateGame(req)
            .then(value => {
                // stoque l'id du joueur qui commence
                req.startUserId = value

                req.data.push({
                    name: "this.coinFlipXupdateGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.coinFlipXupdateGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

    } else {
        // si oui (false), test de quel joueur c'est le tour et retourn son id
        await this.testGameStateXclientTurn(req)
            .then(value => {
                // stoque l'id du joueur qui commence
                req.startUserId = value.startUserId

                req.data.push({
                    name: "this.testGameStateXclientTurn",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.testGameStateXclientTurn",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startUserId
}

/*
subFunctions
    -this.coinFlipXGetStart
        -this.getStartUserIdXGameState
            -utilGetStartUserId.getStartUserId
            -utilGetStartGameState.getStartGameState
    -utilUpdateXgetGame.updateXgetGame
        -utilUpdateGame.updateGame
        -utilGetGame.getGame
*/
// choisit aléatoirement le premier utilisateur à commencer
exports.coinFlipXupdateGame = async (req, res) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipXupdateGame"

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

    await this.coinFlipXGetStart(req)
        .then(value => {
            // stoque cette id dans la requete
            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.package.game.state = value.game.state
            req.data.push({
                name: "this.coinFlipXGetStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.coinFlipXGetStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update la parite dans la base de donnée
    await utilUpdateXgetGame.updateXgetGame(req)
        .then(value => {
            req.package.game.state = value.game.state
            req.game.state = value.game.state

            req.data.push({
                name: "utilUpdateXgetGame.updateXgetGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateXgetGame.updateXgetGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.startUserId
}

/*
subFunctions
    -this.getStartUserIdXGameState
        -utilGetStartUserId.getStartUserId
        -utilGetStartGameState.getStartGameState
*/
exports.coinFlipXGetStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipXGetStart"

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
    await utilCoinFlip.coinFlip(req)
        .then(value => {
            // stoque cette id dans la requete
            req.coinFlip = value.coinFlip
            req.package.coinFlip = value.coinFlip

            req.data.push({
                name: "utilCoinFlip.coinFlip",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCoinFlip.coinFlip",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourn l'id de l'utilisateur en fonctions du resultat du test
    // retourn l'état de la partie en fonction du résultat du test
    await this.getStartUserIdXGameState(req)
        .then(value => {
            // stoque cette id dans la requete
            req.startUserId = value.startUserId
            req.package.startUserId = value.startUserId

            // stoque le nouvel étàt de la partie dans la requete
            req.game.state = value.game.state
            req.package.game.state = value.game.state

            req.data.push({
                name: "this.getStartUserIdXGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getStartUserIdXGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -utilGetStartUserId.getStartUserId
    -utilGetStartGameState.getStartGameState
*/
exports.getStartUserIdXGameState = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getStartUserIdXGameState"

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

    // retourn l'id de l'utilisateur en fonctions du resultat du test
    await utilGetStartUserId.getStartUserId(req.coinFlip, req)
        .then(value => {
            // stoque cette id dans la requete
            req.startUserId = value.startUserId
            req.package.startUserId = value.startUserId

            req.data.push({
                name: "utilGetStartUserId.getStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetStartUserId.getStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourn l'état de la partie en fonction du résultat du test
    await utilGetStartGameState.getStartGameState(req.coinFlip, req)
        .then(value => {
            // stoque le nouvel étàt de la partie dans la requete
            req.game.state = value.game.state
            req.package.game.state = value.game.state
            req.data.push({
                name: "utilGetStartGameState.getStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetStartGameState.getStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -this.testGameStateAndUserTurn
        -utilTestUserTurn.testUserTurn
    -this.testClientOrAdvTurn
        -utilGetOtherUserId.getOtherUserId
*/
// test si il s'agit du tour du client et renvoie l'identifiant du client qui commence
exports.testGameStateXclientTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testGameStateXclientTurn"

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
    await this.testGameStateAndUserTurn(req)
        .then(value => {
            // retourn le résultat et le stoque dans la requete
            req.turn = value.turn
            req.package.turn = value.turn

            req.data.push({
                name: "this.testGameStateAndUserTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.testGameStateAndUserTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.testClientOrAdvTurn(req)
        .then(value => {
            req.startUserId = value.startUserId
                req.package.startUserId = value.startUserId

            req.data.push({
                name: "this.testClientOrAdvTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.testClientOrAdvTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -this.testGameStateAndUserTurn
        -utilTestUserTurn.testUserTurn
    -this.testClientOrAdvTurn
        -utilGetOtherUserId.getOtherUserId
*/
// test si il s'agit du tour du client et renvoie l'identifiant du client qui commence
exports.testGameStateXclientTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testGameStateXclientTurn"

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
    await this.testGameStateAndUserTurn(req)
        .then(value => {
            // retourn le résultat et le stoque dans la requete
            req.turn = value.turn
            req.package.turn = value.turn

            req.data.push({
                name: "this.testGameStateAndUserTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.testGameStateAndUserTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.testClientOrAdvTurn(req)
        .then(value => {
            req.startUserId = value.startUserId
                req.package.startUserId = value.startUserId

            req.data.push({
                name: "this.testClientOrAdvTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.testClientOrAdvTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -utilTestUserTurn.testUserTurn
*/
exports.testGameStateAndUserTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testGameStateAndUserTurn"

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
                req.turn = value.turn
                req.package.turn = value.turn

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
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
                req.turn = value.turn
                req.package.turn = value.turn

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour de personne
    } else {
        // renvoi un message pour informer que la partie est términer
        req.turn = { message: req.game.state }
        req.package.turn = { message: req.game.state }
    }

    return req.package
}

/*
subFunctions
    -utilGetOtherUserId.getOtherUserId
*/
exports.testClientOrAdvTurn = async (req) => {
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

    // suivant le resultat du test
    if (req.turn.message === "CLIENT_TURN") {
        // stoque l'id du clien dans la requet en tant que l'utilisateur qui commence
        req.startUserId = req.auth.userId
        req.package.startUserId = req.auth.userId
    } else if (req.turn.message === "ADVERSAIRE_TURN") {
        // retourn l'id de l'adversaire du client
        await utilGetOtherUserId.getOtherUserId(req)
            .then(value => {
                // stoque cette id dans la requete
                req.startUserId = value.otherUserId
                req.package.startUserId = value.otherUserId

                req.data.push({
                    name: "utilGetOtherUserId.getOtherUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilGetOtherUserId.getOtherUserId",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    } else {
        req.startUserId = null
        req.package.startUserId = null
    }

    return req.package
}

exports.insertAndSavePhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertAndSavePhrase"

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

    await utilStartGame.createPhraseXloopTable(req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            req.data.push({
                name: "utilStartGame.createPhraseXloopTable",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.createPhraseXloopTable",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update le plateau dans la requete
    await utilUpdateBoardXgetBoard.updateBoardXgetBoard(req)
        .then(value => {
            // stoque le plateu après update dans la requete
            req.package.board = value.board
            req.board = value.board

            req.data.push({
                name: "utilUpdateBoardXgetBoard.updateBoardXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateBoardXgetBoard.updateBoardXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}


