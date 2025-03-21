
// import le schema d'un board
const Board = require("../../../models/Board")
// import fonctions util pour check
const utilCheck = require('../../check')

// import les fonction utiles pour utilisateur
const utilGetGame = require('../depthTwo/depthThree/depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilTestTurn = require('./depthThree/testTurn')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthTwo/checkTurn"

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

// retourn un plateau de jeux selon l'identifiant de son utilisateur et de la partie
exports.getBoardGameUser = async (gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardGameUser"

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

    // trouve le plateau en fonction de l'id de son utilisateur et de la partie
    await Board.findOne({
        gameId: gameId,
        userId: userId
    })
        .then(value => {
            // stoque le plateau dans la requete
            req.board = value
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.board
}
