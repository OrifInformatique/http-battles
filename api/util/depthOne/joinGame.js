
// import fonctions util pour check
const utilCheck = require('../check')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthOne/depthTwo/joinGame')

// import les fonction utiles pour utilisateur
const utilUpdategame = require('./depthTwo/depthThree/depthFour/depthFive/crossRoad/updateXgetGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/joinGame"

exports.findUpdateAndJoinGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findUpdateAndJoinGame"

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

    await utilJoinGame.findAndJoinGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.package.game.challengerId = value.game.challengerId
            req.game = value.game
            req.game.challengerId = value.game.challengerId

            req.data.push({
                name: "utilJoinGame.findAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilJoinGame.findAndJoinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
        
    // si oui update l'état de la partie
    await utilUpdategame.updateXgetGame(req)
        .then(value => {
            // stoque le nouvel état de la partie dans la requette
            req.package.game = value.game
            req.game = value.game

            req.data.push({
                name: "utilGame.updateXgetGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.updateXgetGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
        
    return req.package
}

exports.formatJoin = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: formatJoin"

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
    
    await utilJoinGame.getCreatorAndChallenger(req)
        .then(value => {
            req.package.createur = value.createur
            req.createur = value.createur

            req.package.challenger = value.challenger
            req.challenger = value.challenger
            
            req.data.push({
                name: "utilJoinGame.getCreatorAndChallenger",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilJoinGame.getCreatorAndChallenger",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stoque un message de success pour la partie rejointe qui contient le message, l'état de la partie, l'username du créateur, l'username du client
    await utilJoinGame.joinSuccessMessage(req)
        .then(value => {
            req.package.joinSuccessMessage = value
            req.joinSuccessMessage = value

            req.data.push({
                name: "utilJoinGame.joinSuccessMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilJoinGame.joinSuccessMessage",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}