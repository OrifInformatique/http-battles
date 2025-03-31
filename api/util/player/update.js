// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Player
const PlayerV2 = require("../../modelTest/PlayerV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/player/update"

/**
 * @param {*} obligatory    req.body.player._id 
 * @param {*} optional      req.body.gameIdV2
 * @param {*} optional      req.body.userId
 * @param {*} optional      req.body.player
 * 
 * @returns                 req.body.game
 */
// crée un objet Player
exports.updatePlayer = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: updatePlayer"

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

    if (req.body.gameIdV2 !== undefined) {
        var gameId = {
            "gameId": req.body.gameIdV2
        }
        Object.assign(query, gameId)
    }

    if (req.body.userId !== undefined) {
        var userId = {
            "userId": req.body.userId
        }
        Object.assign(query, userId)
    }

    if (req.body.playerStatus !== undefined) {
        var playerStatus = {
            "status": req.body.playerStatus
        }
        Object.assign(query, playerStatus)
    }

    await PlayerV2.updateOne({ _id: req.body.player._id }, {
        $set: query
    })
        .then(value => {
            req.body.playerUpdate = value
            req.data.push({
                name: "Player.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Player.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await PlayerV2.find({ _id: req.body.player._id })
        .then(value => {
            // stoque le Player dans la requete
            req.body.player = value[0]
            req.data.push({
                name: "Player.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Player.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}