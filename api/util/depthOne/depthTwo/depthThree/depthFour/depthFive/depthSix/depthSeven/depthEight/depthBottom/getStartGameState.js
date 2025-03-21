
// import fonctions util pour check
const utilCheck = require('../../../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/getStartGameState"

//  retourn l'état de la partie en fonction du resultat du test
exports.getStartGameState = async (coinFlip, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartGameState"

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

    //  retourn l'état de la partie en fonction du résultat du test
    if (coinFlip) {

        return "CREATEUR_TURN"

    } else {

        return "CHALLENGER_TURN"

    }
}