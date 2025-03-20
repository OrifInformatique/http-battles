// import le schema d'un utilisateur
const Game = require("../../models/Game")

// import fonctions util pour check
const utilCheck = require('../check')

// import fonctions util pour game
const utilGame = require('../game')

// import les fonction utiles pour utilisateur
const utilFindGame = require('../depthOne/depthTwo/findGame')

// import fonctions util pour user
const utilUser = require('../user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/findGame"

exports.getGameAndCreator = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameAndCreator"

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

    await utilFindGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilFindGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'utilisateur en fonction de son id en parametre (ici l'id du créateur contenu dans le jeux)
    await utilFindGame.getUserById(req.game.createurId, req)
        .then(value => {
            // stock l'objet utilisateur trouvé dans la requete
            req.package.createur = value
            req.createur = value

            req.data.push({
                name: "utilFindGame.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindGame.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

// formate le message
exports.formatedMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatedMessage"

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

    // formate le message
    var message = {
        game: req.game,
        createur: req.createur.username
    }
    // retourn le message
    return message
}