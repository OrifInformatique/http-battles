// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Word
const WordV2 = require("../../modelV2/WordV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/word/create"

/**
 * @param {*} optional  req.body.wordId
 * @param {*} optional  req.body.content
 * @param {*} optional  req.body.playerId
 * @param {*} optional  req.body.phrasePosition
 * @param {*} optional  req.body.boardPosition
 * @param {*} optional  req.body.wordStatus
 * 
 * @returns             req.body.words
 */
// crée un objet Word
exports.findWord = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findWord"

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

    const query = {}
    
    if (req.body.wordId !== undefined) {
        var wordId = {
            "_id": mongoose.Types.ObjectId(req.body.wordId)
        }
        Object.assign(query, wordId)
    }

    if (req.body.content !== undefined) {
        var content = {
            "content": req.body.content
        }
        Object.assign(query, content)
    }

    if (req.body.playerId !== undefined) {
        var playerId = {
            "playerId": req.body.playerId
        }
        Object.assign(query, playerId)
    }

    if (req.body.phrasePosition !== undefined) {
        var phrasePosition = {
            "phrasePosition": req.body.phrasePosition
        }
        Object.assign(query, phrasePosition)
    }

    if (req.body.boardPosition !== undefined) {
        var boardPosition = {
            "boardPosition": req.body.boardPosition
        }
        Object.assign(query, boardPosition)
    }

    if (req.body.wordStatus !== undefined) {
        var wordStatus = {
            "status": req.body.wordStatus
        }
        Object.assign(query, wordStatus)
    }


    await WordV2.find(query)
        .then(value => {
            // stoque le Word dans la requete
            req.body.words = value
            req.data.push({
                name: "Word.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Word.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}