
// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/getOtherUserId"

exports.getOtherUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getOtherUserId"

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

    // si le client est le créateur, retourn l'id du challenger
    if (req.auth.userId === req.game.createurId) {

        return req.game.challengerId

    } else {
        // sinon retourn l'id du créateur créateur
        return req.game.createurId

    }
}