// import le schema d'un utilisateur
const Game = require("../../../../../../../../models/Game")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// import les fonction utiles pour utilisateur
const utilGetGame = require('../../../getGame')

// import fonctions util pour board
const utilUpdateGame = require('./depthBottom/updateGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/updateXgetGame"

/*
subFunctions
    -utilUpdateGame.updateGame
    -utilGetGame.getGame
*/
// uodate la partie
exports.updateXgetGame = async (req) => {

    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateXgetGame"

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
    await utilUpdateGame.updateGame(req)
    .then(value => {
        // stoque la partie dans la requete
        req.gameUpdate = value.gameUpdate
        req.package.gameUpdate = value.gameUpdate

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

    // retourne la partie après l'update
    await utilGetGame.getGame(req)
        .then(value => {
            // stoque la partie dans la requete
            req.game = value.game
            req.package.game = value.game

            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.package
}