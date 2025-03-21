// import le schema d'un utilisateur
const Game = require("../../../../../../../../../models/Game")

// import le schema d'un utilisateur
const User = require("../../../../../../../../../models/User")

// import le schema d'un Board
const Board = require("../../../../../../../../../models/Board")

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
const LOC_GLOB = "file: ../util/../depthSeven/updateBoard"

// update le plateau
exports.updateBoard = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateBoard"

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

    // update le tableau en fonction du contenu de la requete
    await Board.updateOne({ _id: req.board._id }, {
        $set: {
            gameId: req.board.gameId,
            userId: req.board.userId,
            phrase: req.board.phrase,
            board: req.board.board
        }
    })
        .then(value => {
            req.data.push({
                name: "Board.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Board.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère le tableau après l'update
    await utilBoard.getBoard(req, req.board._id)
        .then(value => {
            // stoque le tableaux dans la requete
            req.board = value

            req.data.push({
                name: "utilBoard.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.board
}