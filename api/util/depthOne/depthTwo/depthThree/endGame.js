// import le schema d'un game
const Game = require("../../../../models/Game")
// import le schema d'un board
const Board = require("../../../../models/Board")
// import fonctions util pour check
const utilCheck = require('../../../check')

// import fonctions util pour game
const utilGame = require('../../../game')
// import fonctions util pour board
const utilBoard = require('../../../board')

// import les fonction utiles pour utilisateur
const utilGetUser = require('./depthFour/depthFive/depthSix/depthSeven/depthEight/getUserById')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilTestTurn = require('./testTurn')

// import fonctions util pour user
const utilUser = require('../../../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthTwo/endGame"

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