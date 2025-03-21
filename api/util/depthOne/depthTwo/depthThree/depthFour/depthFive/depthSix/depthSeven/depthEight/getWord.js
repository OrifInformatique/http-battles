// import le schema d'un utilisateur
const Game = require("../../../../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../../../../models/User")

// import le schema d'un Word
const Word = require("../../../../../../../../../models/Word")

// import fonctions util pour check
const utilCheck = require('../../../../../../../../check')

// import fonctions util pour game
const utilGame = require('../../../../../../../../game')

// import fonctions util pour user
const utilUser = require('../../../../../../../../user')

// import fonctions util pour board
const utilBoard = require('../../../../../../../../board')

// import fonctions util pour word
const utilWord = require('../../../../../../../../word')

// import les fonction utiles pour startGame
const utilStartGame = require('./startGame')

// import les fonction utiles pour testUserTurn
const utilTestUserTurn = require('./testUserTurn')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/getWord"

// récupère le mot suivant son id
exports.getWord = async (wordId, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: getWord"

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

    // retourn le mot dans la base donée suivant son id
    await Word.findOne({ _id: wordId })
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
            req.data.push({
                name: "Word.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Word.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.word
}