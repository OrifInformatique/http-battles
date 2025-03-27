// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/tryCase"

exports.tryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryCase"

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

    // si le test de la case est réussi
    if (req.check.result) {

        // stoque  un message de success contenant le text, la case testé, le mot et sa position dans la requette
        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Touché!",
            word: req.check.word.content,
            position: req.check.word.position
        }
        // si le test est un echèque
    } else {
        // stoque un message d'échque avec la case testée
        req.tryCaseMessage = {
            case: req.method + " " + req.route,
            result: "Manqué!"
        }
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.tryCaseMessage
}