

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/coinFlip"

// crée un objet mot
exports.coinFlip = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: coinFlip"

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

    // sort aléatoirement un résultat true or false et le stock dans la requette
    req.coinFlip = Math.floor(Math.random() * 2) == 0
    req.package.coinFlip = req.coinFlip
    
    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}