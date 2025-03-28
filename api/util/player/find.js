// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Player
const PlayerV2 = require("../../modelTest/PlayerV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/player/create"

/**
 * @param {*} optional  req.body.playerId
 * @param {*} optional  req.body.gameIdV2
 * @param {*} optional  req.body.userId
 * @param {*} optional  req.body.playerStatus
 * @returns             req.body.players
 */
// crée un objet Player
exports.findPlayer = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findPlayer"

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

    
    if (req.body.playerId !== undefined) {
        var playerId = {
            "_id": mongoose.Types.ObjectId(req.body.playerId)
        }
        Object.assign(query, playerId)
    }

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


    // sauvegarde le Player dans la base donnée
    await PlayerV2.find(query)
        .then(value => {
            // stoque le Player dans la requete
            req.body.players = value
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