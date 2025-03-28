
// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/insertBlank"

// insert les mot de la phrase dans les case du plateaux si leurs positions est égal
exports.insertBlank = async (keyY, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertBlank"

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
    // insert une valeur null dans la ligne créant une case
    req.newBoardFull[keyY].push(null)
    req.package.newBoardFull[keyY].push(null)


    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}