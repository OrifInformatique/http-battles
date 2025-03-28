
// import fonctions util pour check
const utilCheck = require('../../check')

// import les fonction utiles pour utilisateur
const utilGetUser = require('./depthThree/depthFour/depthFive/depthBottom/getUserById')

// import les fonction utiles pour utilisateur
const utilJoinGame = require('../depthTwo/depthThree/joinGame')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthThree/depthFour/getGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/joinGame"

exports.findAndJoinGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findAndJoinGame"

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
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilJoinGame.joinGame(req)
        .then(value => {
            req.package.game.state = value.state
            req.package.game.challengerId = value.challenger
            req.game.state = value.state
            req.game.challengerId = value.challenger
            
            req.data.push({
                name: "utilJoinGame.joinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilJoinGame.joinGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.package
}

exports.getCreatorAndChallenger = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getCreatorAndChallenger"

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

    // récupère l'utilisateur en fonction de son id en parametre (ici l'id du créateur contenu dans le jeux)
    await utilGetUser.getUserById(req.game.createurId, req)
        .then(value => {
            // stock l'objet utilisateur trouvé dans la requete
            req.package.createur = value.user
            req.createur = value.user

            req.data.push({
                name: "utilGetUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère un objet utilisateur en fonction de son id
    await utilGetUser.getUserById(req.auth.userId, req)
        .then(value => {
            // stock l'utilisateur dans la requette
            req.package.challenger = value.user
            req.challenger = value.user
            
            req.data.push({
                name: "utilGetUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.joinSuccessMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: joinSuccessMessage"

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

    // stoque un message de success pour la partie rejointe qui contient le message, l'état de la partie, l'username du créateur, l'username du client
    req.joinSuccessMessage = {
        message: "Partie rejointe !",
        state: req.game.state,
        createurUsername: req.createur.username,
        challengerUsername: req.challenger.username
    }

    return req.joinSuccessMessage
}