// import le schema d'un Word
const Word = require("../../../../../../../../models/Word")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/createWord"

// crée un objet mot
exports.createWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createWord"

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
    req.word = new Word({
        content: word.content,
        position: word.position
    })

    req.package.word = req.word

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}