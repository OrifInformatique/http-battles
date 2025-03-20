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

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/depthThree/getGame"

exports.getGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGame"

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

    // recherche le jeux en fonction de son id dams la base de données
    await Game.findOne({ _id: req.body.gameId })
        .then(value => {
            // stock l'objet jeux dans la requette
            req.game = value

            req.data.push({
                name: "Game.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.game
}

