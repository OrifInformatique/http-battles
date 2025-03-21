// import le schema d'un utilisateur
const Game = require("../../models/Game")

// import fonctions util pour check
const utilCheck = require('../check')

// import fonctions util pour game
const utilGame = require('../game')
// import fonctions util pour board
const utilBoard = require('../board')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthTwo/depthThree/depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthOne/depthTwo/joinGame')

// import les fonction utiles pour utilisateur
const utilUpdategame = require('./depthTwo/depthThree/depthFour/depthFive/depthSix/depthSeven/updateGame')

// import les fonction utiles pour utilisateur
const utilTryPhrase = require('./depthTwo/tryPhrase')

// import les fonction utiles pour utilisateur
const utilGetOtherUserId = require('./depthTwo/depthThree/depthFour/getOtherUserId')

// import fonctions util pour user
const utilUser = require('../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/tryPhrase"

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

    await utilTryPhrase.findGameAndTryBoardPhrase(req)
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
                name: "utilTryPhrase.findGameAndTryBoardPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.findGameAndTryBoardPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilTryPhrase.tryPhraseResult(req)
        .then(value => {
            req.package.tryPhraseResultMessage = value
            req.tryPhraseResultMessage = value
            req.data.push({
                name: "utilTryPhrase.tryPhraseResultt",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.tryPhraseResult",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}