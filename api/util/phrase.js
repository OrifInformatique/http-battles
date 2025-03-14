const Phrase = require('../models/Phrase')
// import fonctions util pour word
const utilWord = require('../util/word')

const LOC_GLOB = "file: ../util/phrase"

// import fonctions util pour board
const utilCheck = require('../util/check')

exports.createPhrase = async (userPhrase, req) => {
    const LOC_LOC = "methode: createPhrase"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await this.fillPhrase(userPhrase, req)
        .then(value => {
            req.wordObjectsArray = value
            req.data.push({
                name: "this.fillPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.fillPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    const phrase = new Phrase({
        words: req.wordObjectsArray
    })

    await phrase.save()
        .then(value => {
            req.phrase = value
            req.data.push({
                name: "phrase.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "phrase.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.phrase
}

exports.fillPhrase = async (userPhrase, req) => {
    const LOC_LOC = "methode: fillPhrase"
    
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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    req.wordObjectsArray = []

    for (const mot of userPhrase) {
        await utilWord.createWord(mot.word, req)
            .then(value => {
                req.word = value
                req.data.push({
                    name: "utilWord.createWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilWord.createWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        req.wordObjectsArray.push(req.word )
    }
    return req.wordObjectsArray
}