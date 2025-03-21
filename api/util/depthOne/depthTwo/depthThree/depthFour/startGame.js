// import le schema d'un utilisateur
const Game = require("../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../user')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthFive/startGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/depthThree/depthFour/startGame"

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
    await utilStartGame.checkStartStat(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value
            req.check = value

            req.data.push({
                name: "utilStartGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilStartGame.checkStartUserId(req)
        .then(value => {
            // stoque l'id du joueur qui commence
            req.package.startUserId = value
            req.startUserId = value

            req.data.push({
                name: "utilStartGame.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilStartGame.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.package
}