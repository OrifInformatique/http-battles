

// import fonctions util pour check
const utilCheck = require('../../../../../../check')



// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/checkStartState"


exports.checkStartState = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStartState"

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

    // retourne true si la party est en mode settings
    if (req.game.state === "SETTINGS" || req.game.state === "ENDED") {
        req.check = true
        req.package.check = true
    } else {
        req.check = false
        req.package.check = false
    }

    return req.package
}