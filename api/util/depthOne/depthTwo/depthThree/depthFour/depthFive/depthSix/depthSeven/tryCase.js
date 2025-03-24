// import le schema d'un Word
const Word = require("../../../../../../../../models/Word")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// import les fonction utiles pour getWord
const utilGetWord = require('./depthBottom/getWord')

// import les fonction utiles pour updateWord
const utilUpdateWord = require('./depthBottom/updateWord')

// import les fonction utiles pour reavealWord
const utilReavealWord = require('./depthBottom/reavealWord')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/tryCase"

/*
subFunctions
    -utilReavealWord.revealWord
    -this.updateXgetWord
        -utilUpdateWord.updateWord
        -utilGetWord.getWord
*/
exports.revealXupdateWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: revealXupdateWord"

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

    await utilReavealWord.revealWord(word, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word
            req.data.push({
                name: "utilReavealWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilReavealWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.updateXgetWord(req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word

            req.data.push({
                name: "this.updateXgetWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateXgetWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -utilUpdateWord.updateWord
    -utilGetWord.getWord
*/
exports.updateXgetWord = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: updateXgetWord"

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

    // update le mot dans la base donnée 
    await utilUpdateWord.updateWord(req)
        .then(value => {
            // stoque le'update dans la requete
            req.wordUpdate = value.wordUpdate
            req.package.wordUpdate = value.wordUpdate
            req.data.push({
                name: "utilUpdateWord.updateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateWord.updateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère le mot après l'update
    await utilGetWord.getWord(req.word._id, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word
            req.data.push({
                name: "utilWord.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilWord.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}
