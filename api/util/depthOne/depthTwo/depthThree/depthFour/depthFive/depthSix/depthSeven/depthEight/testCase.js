// import fonctions util pour check
const utilCheck = require('../../../../../../../../check')

const utilInsertWord = require('./depthBottom/insertWord')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/testCase"

// insert les mot de la phrase dans les case du plateaux si leurs positions est égal
exports.testCase = async (userPhrase, keyY, keyX, keyW, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testCase"

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

    // test si la position de la case est égal à la postion du mot
    if (userPhrase.words[keyW].position[0].toString() === keyY && userPhrase.words[keyW].position[1].toString() === keyX) {
        // si oui, rempli la case avec le mot
        await utilInsertWord.insertWord(userPhrase, keyY, keyW, req)
            .then(value => {
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
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}