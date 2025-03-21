
// import fonctions util pour check
const utilCheck = require('../../../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/getStartUserId"

// retourn l'id utilisateur qui commence
exports.getStartUserId = async (coinFlip, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartUserId"

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

    // retourn l'id utilisateur contenu dans la partie en fonction du test
    if (coinFlip) {

        return req.game.createurId

    } else {

        return req.game.challengerId

    }
}