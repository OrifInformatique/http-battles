// import fonctions util pour check
const utilCheck = require('../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFive/saveBoard"

// stoque le plateua dans la requete
exports.saveBoard = async (board, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: saveBoard"

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

    // sauvegarde le plateau dans la base donnée
    await board.save()
        .then(value => {
            // stoque le plateau dans la requete
            req.newBoard = value
            req.data.push({
                name: "board.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "board.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoard
}