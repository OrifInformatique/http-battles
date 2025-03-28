// import le schema d'un Phrase
const Phrase = require("../../../../../../../models/Phrase")

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/createPhrase"

// crée un objet mot
exports.createPhrase = async (wordObjectsArray, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createPhrase"

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

    // crée un nouvel objet mot avec les info en parametre
    // crée un objet phrase avec le tableaux
    req.phrase = new Phrase({
        words: wordObjectsArray
    })

    req.package.phrase = req.phrase

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}