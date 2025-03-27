
// import fonctions util pour check
const utilCheck = require('../../../../../check')

// import les fonction utiles pour utilisateur
const utilTryPhrase = require('./depthSix/depthBottom/checkWordPhrase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFive/tryPhrase"

/*
subFunctions
    -
*/
// test si le mot est le même que celui de la requete et au même endroit
exports.tryPhraseCheckReq = async (advBoard, req, keyAdv) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseCheckReq"

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

    // parcoure la phrase de la requete
    for (const keyReq in req.body.phrase) {
        // test si le mot est le même que celui contenu dans le plateau
        await utilTryPhrase.checkWordPhrase(advBoard, req, keyAdv, keyReq)
            .then(value => {
                // retourn le nombre de mot just
                req.wordCounter = value.wordCounter

                req.data.push({
                    name: "utilTryPhrase.checkWordPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilTryPhrase.checkWordPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreu
    return req.wordCounter
}
