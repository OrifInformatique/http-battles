// import le schema d'un Word
const WordV2 = require("../../modelTest/WordV2")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/word/create"

/**
 * @param {*}   obligatory: req.body.content
 * @param {*}   obligatory: req.body.playerId
 * @param {*}   obligatory: req.body.phrasePosition
 * @param {*}   obligatory: req.body.boardPosition
 * 
 * @returns                 req.body.word
 */
// crée un objet Game
exports.createPhrase = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createPhrase"

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

    // crée un nouvel objet Word
    const word = new WordV2(query)

    // sauvegarde le Word dans la base donnée
    await word.save()
        .then(value => {
            // stoque le Word dans la requete
            req.body.word = value
            req.data.push({
                name: "word.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "word.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}