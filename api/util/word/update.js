// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Word
const WordV2 = require("../../modelV2/WordV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/word/update"


/**
 * @param {*} obligatory    req.body.word
 * @param {*} obligatory    req.body.word._id 
 * @param {*} optional      req.body.playerId
 * @param {*} optional      req.body.content
 * @param {*} optional      req.body.phrasePosition
 * @param {*} optional      req.body.boardPosition
 * @param {*} optional      req.body.wordStatus
 * 
 * @returns                 req.body.word
 */
// crée un objet Word
exports.updateWord = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: updateWord"

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

    // test les données. Retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.word === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No word"
        req.data.push({
            name: "req.body.word === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.word._id === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No word._id "
        req.data.push({
            name: "req.body.word._id  === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    // initialise l'objet query qui sera la requete pour la base de donnée
    const query = {}

    // ajout les variables de la requete entrante au query si elle peuvent être utilisées
    if (req.body.playerId !== undefined) {
        var playerId = {
            "playerId": req.body.playerId
        }
        Object.assign(query, playerId)
    }

    if (req.body.content !== undefined) {
        var content = {
            "content": req.body.content
        }
        Object.assign(query, content)
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

    // Update le Word dont l'id est donné en paramètre
    await WordV2.updateOne({ _id: req.body.word._id }, {
        $set: query
    })
        .then(value => {
            // stoque l'information du résultat de l'update (pas le Word)
            req.body.wordUpdate = value
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

    // trouve le Word dont l'id est donné en paramètre
    await WordV2.find({ _id: req.body.word._id })
        .then(value => {
            // stoque le Word dans la requete
            req.body.word = value[0]
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