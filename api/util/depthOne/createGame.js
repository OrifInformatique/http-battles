// import le schema d'un utilisateur
const Game = require("../../models/Game")

// import fonctions util pour check
const utilCheck = require('../check')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/createGame.js"


exports.createGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createGame"

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

    // cée un objet de partie avec l'id du client avec un status d'attente du challenger
    req.game = new Game({
        state: "WAITING_PLAYER",
        createurId: req.auth.userId
    })

    return req.game
}

exports.saveGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: saveGame"

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

    // sauvegarde la partie dans la base de donées
    await req.game.save()
        .then(value => {
            // stoque la partie sauvegardé dans la requete
            req.game = value
            req.data.push({
                name: "req.game.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "req.game.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.game
}