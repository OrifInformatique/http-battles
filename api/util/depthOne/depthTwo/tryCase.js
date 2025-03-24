
// import fonctions util pour check
const utilCheck = require('../../check')

// import les fonction utiles pour getUser
const utilGetOtherUserId = require('./depthThree/depthFour/depthFive/depthSix/depthSeven/depthBottom/getOtherUserId')

// import les fonction utiles pour endGame
const utilTryCase = require('./depthThree/tryCase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthTwo/tryCase"

exports.getOtherBoardAndTryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getOtherBoardAndTryCase"

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

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await utilGetOtherUserId.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            req.data.push({
                name: "utilGetOtherUserId.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetOtherUserId.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilTryCase.checkArrayBoardAndTryCase(req)
        .then(value => {
            // stoque la position X du plateau dans la requette
            req.package.arrayX = value.arrayX
            req.arrayX = value.arrayX

            // stoque la position Y du plateau dans la requette
            req.package.arrayY = value.arrayY
            req.arrayY = value.arrayY

            // stoque le resultat (inclue le mot si réussi)
            req.check = value.check
            req.package.check = value.check

            req.tryCaseMessage = value.tryCaseMessage
            req.package.tryCaseMessage = value.tryCaseMessage

            req.data.push({
                name: "utilTryCase.checkArrayBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.checkArrayBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.switchTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchTurn"

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

    // test l'état de la partie
    if (req.game.state === "CREATEUR_TURN") {
        // si c'est le tour du créateur, donne le tour du challenger comme état à appliquer
        req.state = "CHALLENGER_TURN"

    } else if (req.game.state === "CHALLENGER_TURN") {
        // si c'est le tour du challenger, donne le tour du créateur comme état à appliquer
        req.state = "CREATEUR_TURN"
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.state
}

