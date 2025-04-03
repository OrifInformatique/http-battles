// import le schema d'un Game
const GameV2 = require("../../modelV2/GameV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/game/create"


/**
 * Crée et sauvegarde un jeux
 * 
 * @param {*}   obligatory: req.auth.userId
 * @param {*}   optional:   req.body.gameStatus
 * 
 * @returns                 req.body.game
 */
// crée un objet Game
exports.createGame = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createGame"

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

    if (req.auth.userId === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No auth.userId"
        req.data.push({
            name: "req.auth.userId === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    const query = {}


    if (req.auth.userId !== undefined) {
        var creatorId = {
            "creatorId": req.auth.userId
        }
        Object.assign(query, creatorId)
    }

    if (req.body.gameStatus !== undefined) {
        var gameStatus = {
            "status": req.body.gameStatus
        }
        Object.assign(query, gameStatus)
    }

    // crée un nouvel objet Game
    const game = new GameV2(query)

    // sauvegarde le Game dans la base donnée
    await game.save()
        .then(value => {
            // stoque le Game dans la requete
            req.body.game = value
            req.data.push({
                name: "game.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "game.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}