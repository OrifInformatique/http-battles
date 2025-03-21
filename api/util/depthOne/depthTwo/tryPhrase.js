
// import fonctions util pour check
const utilCheck = require('../../check')

// import les fonction utiles pour endGame
const utilEndGame = require('./depthThree/endGame')

// import les fonction utiles pour tryPhrase
const utilTryPhrase = require('./depthThree/tryPhrase')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthTwo/tryPhrase"

exports.findGameAndTryBoardPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGameAndTryBoardPhrase"

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

    await utilTryPhrase.findGameAndOtherUserId(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value.game
            req.game = value.game

            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            req.data.push({
                name: "utilTryPhrase.findGameAndOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.findGameAndOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la phrase de l'adversaire est celle de la requete
    await utilTryPhrase.tryPhrase(req.otherUserId, req)
        .then(value => {
            // stoque le resultat dans la requet
            req.package.check = value
            req.check = value

            req.data.push({
                name: "utilTryPhrase.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.tryPhraseResult = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseResult"

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

    // si la phrase est juste
    if (req.check) {
        // termine la partie
        await utilEndGame.endGame(req)
            .then(value => {
                req.state = value
                req.data.push({
                    name: "utilEndGame.endGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilEndGame.endGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // stoque un message de success dans la requette
        req.tryPhraseResultMessage = "Success!"

    } else {
        // si la phrase est fausse, stoque un message d'échèque dans la requette
        req.tryPhraseResultMessage = "Wrong phrase!"

    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.tryPhraseResultMessage
}