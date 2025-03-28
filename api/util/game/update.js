// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Game
const GameV2 = require("../../modelTest/GameV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game/update"

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

    const query = {}


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


    await GameV2.updateOne({ _id: req.body.game._id }, {
        $set: query
    })
        .then(value => {
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

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}