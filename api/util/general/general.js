const utilFindPlayerV2 = require('../player/find')

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/general/general"


/**
 * @param {*}   obligatory: req.body.games
 * 
 * @returns                 req.body.gamesPlayers
 */
// crée un objet Game
exports.findPlayerForGame = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findPlayerForGame"

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

    req.body.gamesPlayers = []

    if(req.body.game !== undefined){
        req.body.games = [req.body.game]
    }

    for (const game in req.body.games) {

        req.body.gameIdV2 = req.body.games[game]._id

        await utilFindPlayerV2.findPlayer(req)
            .then(value => {
                req.data.push({
                    name: "utilFindPlayerV2.findPlayer",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilFindPlayerV2.findPlayer",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })


        req.body.gamesPlayers.push({
            game: req.body.games[game],
            players: req.body.players
        })

        // stop la méthode en cas d'échèque du test
        if (req.utilCheck) {
            next()
            return null
        }
    }

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}