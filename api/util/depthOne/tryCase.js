
// import fonctions util pour check
const utilCheck = require('../check')

// import les fonction utiles pour utilisateur
const utilTryCase = require('./depthTwo/tryCase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/tryCase"

exports.tryCaseAndSwitchTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryCaseAndSwitchTurn"

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

    await utilTryCase.getOtherBoardAndTryCase(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

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
                name: "utilTryCase.getOtherBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.getOtherBoardAndTryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilTryCase.switchTurn(req)
        .then(value => {
            req.package.state = value
            req.state = value

            req.data.push({
                name: "utilTryCase.switchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.switchTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}