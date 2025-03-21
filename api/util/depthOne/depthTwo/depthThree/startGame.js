// import le schema d'un utilisateur
const Game = require("../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../check')

// import fonctions util pour game
const utilGame = require('../../../game')

// import fonctions util pour user
const utilUser = require('../../../user')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthFour/startGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/depthThree/startGame"

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

    await utilGetGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
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

    // check si la partie a commencé (true = non, false = oui)
    await utilStartGame.checkStart(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value.check
            req.check = value.check

            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.data.push({
                name: "utilGame.checkStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.checkStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}