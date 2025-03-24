// import le schema d'un utilisateur
const Game = require("../../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../../../user')

// import les fonction utiles pour utilisateur
const utilUpdateGame = require('./depthSeven/updateXgetGame')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSix/tryPhrase"

// test si le mot est le même que celui contenu dans le plateau
exports.tryPhraseCheckAll = async (advBoard, req, keyAdv, keyReq) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseCheckAll"

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

    // test si le mot est le mem que celui contenu dans cette case du plateau et au meme endroit
    if (advBoard.phrase.words[keyAdv].content === req.body.phrase[keyReq].word.content && keyAdv === keyReq) {
        // si oui, incremente le compteur de mot juste
        req.wordCounter = req.wordCounter + 1
    }

    // retourne la variable traitéeF pour la gestion d'erreu
    return req.wordCounter
}