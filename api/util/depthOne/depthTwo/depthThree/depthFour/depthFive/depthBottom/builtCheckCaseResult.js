
// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/builtCheckCaseResult"

// crée un objet mot
exports.builtCheckCaseResult = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: builtCheckCaseResult"

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

    // stoque le mot et le succes du check dans un objet résultat dans la requete
    req.result = {
        word: req.board.board[req.arrayY][req.arrayX],
        result: true
    }

    req.package.result = req.result

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}