// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Game
const GameV2 = require("../../modelV2/GameV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game/update"


/**
 * @param {*} obligatory    req.body.game
 * @param {*} obligatory    req.body.game._id 
 * @param {*} optional      req.body.creatorId
 * @param {*} optional      req.body.gameStatus

 * @returns                 req.body.game
 */
// crée un objet Game
exports.updateGame = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: updateGame"

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
    if (req.body.game === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No game"
        req.data.push({
            name: "req.body.game === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.game._id === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No game._id "
        req.data.push({
            name: "req.body.game._id  === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    // initialise l'objet query qui sera la requete pour la base de donnée
    const query = {}

    // ajout les variables de la requete entrante au query si elle peuvent être utilisées
    if (req.body.creatorId !== undefined) {
        var creatorId = {
            "creatorId": req.body.creatorId
        }
        Object.assign(query, creatorId)
    }

    if (req.body.gameStatus !== undefined) {
        var gameStatus = {
            "status": req.body.gameStatus
        }
        Object.assign(query, gameStatus)
    }

    // Update le Game dont l'id est donné en paramètre
    await GameV2.updateOne({ _id: req.body.game._id }, {
        $set: query
    })
        .then(value => {
            // stoque l'information du résultat de l'update (pas le Game)
            req.body.gameUpdate = value
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // trouve le Game dont l'id est donné en paramètre
    await GameV2.find({ _id: req.body.game._id })
        .then(value => {
            // stoque le Game dans la requete
            req.body.game = value[0]
            req.data.push({
                name: "Game.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Game.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}