
// import le schema d'un Phrase
const Phrase = require("../../../../../../../models/Phrase")

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthSeven/startGame')

// import les fonction utiles pour utilisateur
const utilGetOtherUserId = require('./depthSeven/getOtherUserId')

// import les fonction utiles pour utilisateur
const utilUpdateGame = require('./depthSeven/updateGame')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSix/startGame"

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

    await utilStartGame.coinFlipStartMode(req)
        .then(value => {
            // stoque cette id dans la requete
            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.package.game.state = value.game.state
            req.data.push({
                name: "utilStartGame.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.coinFlipStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update la parite dans la base de donnée
    await utilUpdateGame.updateGame(req)
        .then(value => {
            req.package.game.state = value.state
            req.game.state = value.state

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

    // retourne la variable traité pour la gestion d'erreur
    return req.startUserId
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
    await utilStartGame.testTurn(req, res)
        .then(value => {
            // retourn le résultat et le stoque dans la requete
            req.turn = value

            req.data.push({
                name: "utilStartGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.testTurn",
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
        await utilGetOtherUserId.getOtherUserId(req)
            .then(value => {
                // stoque cette id dans la requete
                req.startUserId = value

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
        // retourne la variable traité pour la gestion d'erreur
        return req.startUserId
    } else {
        return null
    }
}

// crée une phrase et l'enregistre dans la base donnée
exports.createPhrase = async (userPhrase, req) => {
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

    // crée et rempli un tableaux de la phrase avec des objet mot suivant la phrase de la requete
    await utilStartGame.fillPhrase(userPhrase, req)
        .then(value => {
            // retourn la phrase en tant que tableaux et la stoque dans la requete
            req.wordObjectsArray = value
            req.data.push({
                name: "utilStartGame.fillPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.fillPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // crée un objet phrase avec le tableaux
    const phrase = new Phrase({
        words: req.wordObjectsArray
    })

    // enregistre la phrase dans la base de donnée
    await phrase.save()
        .then(value => {
            // stoque la phrase dans la requete
            req.phrase = value
            req.data.push({
                name: "phrase.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "phrase.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.phrase
}

// insert les mot de la phrse dans le plateau selon leur position
exports.insertPhraseInBoard = async (board, userPhrase, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoard"

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

    // parcoure l'ancien plateau dans le plateau de la requette
    for (const keyY in board.board) {
        // Crée et remplie les ligne du plateau
        await utilStartGame.insertPhraseInBoardY(board, userPhrase, keyY, req)
            .then(value => {
                req.data.push({
                    name: "utilStartGame.insertPhraseInBoardY",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilStartGame.insertPhraseInBoardY",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}