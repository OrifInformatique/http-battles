

// import fonctions util pour check
const utilCheck = require('../../../../check')

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

/*
subFunctions
    -this.createPhraseXloopTable
    -utilUpdateBoardXgetBoard.updateBoardXgetBoard
*/
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

    await this.createPhraseXloopTable(req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            req.data.push({
                name: "this.createPhraseXloopTable",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.createPhraseXloopTable",
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

/*
subFunctions
    -this.loopXcreatePhrase
        -this.loopPhraseAndCreateWord
            -this.createXsaveWord
                -utilCreateWord.createWord
                -utilSaveWord.saveWord
        -this.createXsavePhrase
            -utilCreatePhrase.createPhrase
            -utilSavePhrase.savePhrase
    -this.columnLoopAndLineLoop
        -this.lineLoopAndPhraseLoop
            -this.phraseLoopAndTestCase
                -this.testTableWord
                    -utilInsertWord.insertWord
                -this.testTableVoid
                    -utilInsertBlank.insertBlank
*/
exports.createPhraseXloopTable = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createPhraseXloopTable"

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

    // crée la phrase (objet)
    await this.loopXcreatePhrase(req.body.phrase, req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.phrase
            req.board.phrase = value.phrase

            req.data.push({
                name: "this.loopXcreatePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.loopXcreatePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // insert la phrase (suite de mots) dans le plateau (table)
    await this.columnLoopAndLineLoop(req.board, req.board.phrase, req)
        .then(value => {
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.newBoardFull
            req.board.board = value.newBoardFull

            req.data.push({
                name: "this.columnLoopAndLineLoop",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.columnLoopAndLineLoop",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -this.loopPhraseAndCreateWord
        -this.createXsaveWord
            -utilCreateWord.createWord
            -utilSaveWord.saveWord
    -this.createXsavePhrase
        -utilCreatePhrase.createPhrase
        -utilSavePhrase.savePhrase
*/
// crée une phrase et l'enregistre dans la base donnée
exports.loopXcreatePhrase = async (userPhrase, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: loopXcreatePhrase"

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

    // crée et rempli un tableaux de la phrase avec des objet mot suivant la phrase de la requete
    await this.loopPhraseAndCreateWord(userPhrase, req)
        .then(value => {
            req.data.push({
                name: "this.loopPhraseAndCreateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.loopPhraseAndCreateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // crée et rempli un tableaux de la phrase avec des objet mot suivant la phrase de la requete
    await this.createXsavePhrase(req.wordObjectsArray, req)
        .then(value => {
            req.phrase = value.phrase
            req.package.phrase = value.phrase
            req.data.push({
                name: "this.createXsavePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.createXsavePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -this.createXsaveWord
        -utilCreateWord.createWord
        -utilSaveWord.saveWord
*/
// crée et rempli un tableaux de la phrase avec des objet mot suivant la phrase de la requete
exports.loopPhraseAndCreateWord = async (userPhrase, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: loopPhraseAndCreateWord"

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

    // initialise le tableaux de mot dans la requete
    req.wordObjectsArray = []
    req.package.wordObjectsArray = []

    // parcoure les mot de la phrase de l'utilisateur
    for (const mot of userPhrase) {
        // crée un objet mot
        await this.createXsaveWord(mot.word, req)
            .then(value => {
                // stoque l'objet mot dans la requete
                req.word = value.word
                req.package.word = value.word
                req.data.push({
                    name: "this.createXsaveWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.createXsaveWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // ajoute le mot au tableaux d'objet dans la requete
        req.wordObjectsArray.push(req.word)
        req.package.wordObjectsArray.push(req.word)
    }

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -utilCreateWord.createWord
    -utilSaveWord.saveWord
*/
// crée un objet mot
exports.createXsaveWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createXsaveWord"

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

    // crée un mot
    await utilCreateWord.createWord(word, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word

            req.data.push({
                name: "utilCreateWord.createWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreateWord.createWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // enregistre le mot dans la base données
    await utilSaveWord.saveWord(req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word

            req.data.push({
                name: "req.word.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "req.word.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}


/*
subFunctions
    -utilCreatePhrase.createPhrase
    -utilSavePhrase.savePhrase
*/
// crée un objet phrase
exports.createXsavePhrase = async (wordObjectsArray, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createXsavePhrase"

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

    // crée une phrase
    await utilCreatePhrase.createPhrase(wordObjectsArray, req)
        .then(value => {
            // stoque la phrase dans la requete
            req.phrase = value.phrase
            req.package.phrase = value.phrase

            req.data.push({
                name: "utilCreatePhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreatePhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // enregistre la phrase dans la base données
    await utilSavePhrase.savePhrase(req)
        .then(value => {
            // stoque la phrase dans la requete
            req.phrase = value.phrase
            req.package.phrase = value.phrase

            req.data.push({
                name: "utilSavePhrase.savePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilSavePhrase.savePhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}


/*
subFunctions
    -this.lineLoopAndPhraseLoop
        -this.phraseLoopAndTestCase
            -this.testTableWord
                -utilInsertWord.insertWord
            -this.testTableVoid
                -utilInsertBlank.insertBlank
*/
// insert les mot de la phrse dans le plateau selon leur position
exports.columnLoopAndLineLoop = async (board, userPhrase, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: columnLoopAndLineLoop"

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

    // initialise le nouveau plateau qui sera remplit
    req.newBoardFull = []
    req.package.newBoardFull = []

    // parcoure l'ancien plateau dans le plateau de la requette
    for (const keyY in board.board) {
        // Crée et remplie les ligne du plateau
        await this.lineLoopAndPhraseLoop(board, userPhrase, keyY, req)
            .then(value => {
                req.data.push({
                    name: "this.lineLoopAndPhraseLoop",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.lineLoopAndPhraseLoop",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -this.phraseLoopAndTestCase
        -this.testTableWord
            -utilInsertWord.insertWord
        -this.testTableVoid
            -utilInsertBlank.insertBlank
*/
// Crée et remplie les ligne du plateau
exports.lineLoopAndPhraseLoop = async (board, userPhrase, keyY, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: lineLoopAndPhraseLoop"

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

    // pousse une ligne dans le plateau
    req.newBoardFull.push([])
    req.package.newBoardFull.push([])

    // parcour les case de la ligne Y de l'ancient plateaux
    for (const keyX in board.board[keyY]) {
        // insert les case de la ligne du nouveaux plateaux et les remplie 
        await this.phraseLoopAndTestCase(userPhrase, keyY, keyX, req)
            .then(value => {
                req.data.push({
                    name: "this.phraseLoopAndTestCase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.phraseLoopAndTestCase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -this.testTableWord
        -utilInsertWord.insertWord
    -this.testTableVoid
        -utilInsertBlank.insertBlank
*/
// insert les case de la ligne du nouveaux plateaux et les remplie 
exports.phraseLoopAndTestCase = async (userPhrase, keyY, keyX, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: phraseLoopAndTestCase"

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

    // parcour la phrase du plateaux
    for (const keyW in userPhrase.words) {
        // insert les mot de la phrase dans les case du plateaux si leurs positions est égal
        await this.testTableWord(userPhrase, keyY, keyX, keyW, req)
            .then(value => {
                req.data.push({
                    name: "this.testTableWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.testTableWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    await this.testTableVoid(keyY, keyX, req)
        .then(value => {
            req.data.push({
                name: "this.utilTestTableVoid",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.utilTestTableVoid",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable  pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -utilInsertWord.insertWord
*/
// insert les mot de la phrase dans les case du plateaux si leurs positions est égal
exports.testTableWord = async (userPhrase, keyY, keyX, keyW, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTableWord"

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

    // test si la position de la case est égal à la postion du mot
    if (userPhrase.words[keyW].position[0].toString() === keyY && userPhrase.words[keyW].position[1].toString() === keyX) {
        // si oui, rempli la case avec le mot
        await utilInsertWord.insertWord(userPhrase, keyY, keyW, req)
            .then(value => {
                req.data.push({
                    name: "utilInsertWord.insertWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilInsertWord.insertWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -utilInsertBlank.insertBlank
*/
// insert les cases vides
exports.testTableVoid = async (keyY, keyX, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTableVoid"

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

    // si la case du tableau n'existe pas, la crée rempli d'une valeur null
    if (req.newBoardFull[keyY][keyX] === undefined) {
        await utilInsertBlank.insertBlank(keyY, req)
            .then(value => {
                req.data.push({
                    name: "utilInsertBlank.insertBlank",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilInsertBlank.insertBlank",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

