const Word = require('../models/Word')

const LOC_GLOB = "file: ../util/word"

// import fonctions util pour board
const utilCheck = require('../util/check')

exports.getWord = async (wordId, req) => {
    const LOC_LOC = "methode: getWord"

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

    if (req.utilCheck) {
        return null
    }

    const word = await Word.findOne({ _id: wordId })
    return word
}

exports.createWord = async (word, req) => {
    const LOC_LOC = "methode: createWord"

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

    if (req.utilCheck) {
        return null
    }

    const newWord = new Word({
        content: word.content,
        position: word.position
    })

    await newWord.save()
        .then(value => {
            req.word = value
            req.data.push({
                name: "newWord.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "newWord.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.word
}

exports.revealWord = async (word, req) => {
    const LOC_LOC = "methode: revealWord"

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

    if (req.utilCheck) {
        return null
    }

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

    await this.getWord(word._id, req)
        .then(value => {
            req.word = value
            req.data.push({
                name: "this.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.word
}
