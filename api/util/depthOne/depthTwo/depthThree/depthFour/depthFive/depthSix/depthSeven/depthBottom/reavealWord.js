
// import fonctions util pour check
const utilCheck = require('../../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/revealWord"

// Reveal le mot
exports.revealWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: revealWord"
    
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

    req.word = word
    req.word.revealed = true
    req.package.word = req.word
    
    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}