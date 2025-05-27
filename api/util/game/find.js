// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Game
const GameV2 = require("../../modelV2/GameV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game/create"

/**
 * 
 * @param {*} optional  req.body.gameIdV2
 * @param {*} optional  req.body.creatorId
 * @param {*} optional  req.body.gameStatus
 * 
 * @returns             req.body.games
 */
// crée un objet Game
exports.findGame = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findGame"

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

    // adapte les données gameId/gameIdV2 pour les faire correspondre
    if (req.body.gameId !== undefined) {
        req.body.gameIdV2 = req.body.gameId
    }

    // initialise l'objet query qui sera la requete pour la base de donnée
    const query = {}

    // ajout les variables de la requete entrante au query si elle peuvent être utilisées
    if (req.body.gameIdV2 !== undefined) {
        var gameId = {
            "_id": mongoose.Types.ObjectId(req.body.gameIdV2)
        }
        Object.assign(query, gameId)
    }

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

    // recherche les Game correspondant au query
    await GameV2.find(query)
        .then(value => {
            // stoque les Game dans la requete
            req.body.games = value
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