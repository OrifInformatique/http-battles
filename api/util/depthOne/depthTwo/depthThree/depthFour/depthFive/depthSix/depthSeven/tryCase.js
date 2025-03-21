// import le schema d'un Word
const Word = require("../../../../../../../../models/Word")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// import les fonction utiles pour startGame
const utilGetWord = require('./depthEight/getWord')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/tryCase"

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

    // update le mot dans la base donnée 
    await Word.updateOne({ _id: word._id }, {
        $set: {
            revealed: true
        }
    })
        .then(value => {
            req.data.push({
                name: "Word.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Word.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    
    // récupère le mot après l'update
    await utilGetWord.getWord(word._id, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
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
    return req.word
}
