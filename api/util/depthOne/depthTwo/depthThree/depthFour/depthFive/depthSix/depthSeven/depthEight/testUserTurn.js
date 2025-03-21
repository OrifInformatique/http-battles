// import le schema d'un utilisateur
const Game = require("../../../../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../../../../../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthEight/testUserTurn"

// test quel utilisateur commence
exports.testUserTurn = async (gameUserId, reqId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testUserTurn"

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

    // test si le client est le créateur
    // si oui
    if (gameUserId === reqId) {

        // renvoi un message pour informer que c'est le tour du client
        return { message: "Your turn" }

        // si non
    } else {

        // renvoi un message pour informer que ce n'est pas le tour du client
        return { message: "Wait" }

    }
}