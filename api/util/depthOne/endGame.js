
// import fonctions util pour check
const utilCheck = require('../check')


// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthTwo/depthThree/depthFour/getGame')


// import les fonction utiles pour utilisateur
const utilEndGame = require('./depthTwo/depthThree/endGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/endGame"

exports.findAndEndGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findAndEndGame"

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

    await utilEndGame.endGame(req)
        .then(value => {
            req.package.state = value
            req.state = value

            req.data.push({
                name: "utilEndGame.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilEndGame.endGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}