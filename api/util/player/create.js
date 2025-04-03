// import le schema d'un Player
const PlayerV2 = require("../../modelV2/PlayerV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/player/create"

/**
 * @param {*}   obligatory: req.body.gameId
 * @param {*}   obligatory: req.body.userId
 * @param {*}   optional:   req.body.playerStatus
 * 
 * @returns                 req.body.player
 */
// crée un objet Game
exports.createPlayer = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createPlayer"

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
    if(req.body.gameIdV2 !== undefined){
        req.body.gameId = req.body.gameIdV2
    } else if(req.body.gameId !== undefined){
        req.body.gameIdV2 = req.body.gameId
    }

    // test les données. Retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.gameId === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No gameId"
        req.data.push({
            name: "req.body.gameId === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.userId === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No userId"
        req.data.push({
            name: "req.body.userId === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    // initialise l'objet query qui sera la requete pour la base de donnée
    const query = {}

    // ajout les variables de la requete entrante au query si elle peuvent être utilisées
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

    // crée un nouvel objet Player
    const player = new PlayerV2(query)

    // sauvegarde le Player dans la base donnée
    await player.save()
        .then(value => {
            // stoque le Player dans la requete
            req.body.player = value
            req.data.push({
                name: "player.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "player.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}