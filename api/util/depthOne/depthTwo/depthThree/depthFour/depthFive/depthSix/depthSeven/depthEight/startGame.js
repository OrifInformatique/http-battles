// import le schema d'un Word
const Word = require("../../../../../../../../../models/Word")

// import fonctions util pour check
const utilCheck = require('../../../../../../../../check')

const utilTestCase = require('./testCase')

const utilCreateWord = require('./depthBottom/createWord')

const utilSaveWord = require('./depthBottom/saveWord')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthEight/startGame"

// crée un objet mot
exports.createXsaveWord = async (word, req) => {
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

    await utilCreateWord.createWord(word, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
            req.data.push({
                name: "utilCreateWord.createWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreateWord.createWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // enregistre le mot dans la base données
    await utilSaveWord.saveWord(req.word, req)
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

// insert les case de la ligne du nouveaux plateaux et les remplie 
exports.insertPhraseInBoardX = async (userPhrase, keyY, keyX, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoardX"

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

    // parcour la phrase du plateaux
    for (const keyW in userPhrase.words) {
        // insert les mot de la phrase dans les case du plateaux si leurs positions est égal
        await utilTestCase.testCase(userPhrase, keyY, keyX, keyW, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardW",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.insertPhraseInBoardW",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // si la case du tableau n'existe pas, la crée rempli d'une valeur null
    if (req.newBoardFull[keyY][keyX] === undefined) {
        req.newBoardFull[keyY].push(null)
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}