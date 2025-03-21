
// import fonctions util pour check
const utilCheck = require('../../../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/saveWord"

// crée un objet mot
exports.saveWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: saveWord"

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

    // enregistre le mot dans la base deonnées
    await req.word.save()
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
            req.data.push({
                name: "req.word.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "req.word.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.word
}