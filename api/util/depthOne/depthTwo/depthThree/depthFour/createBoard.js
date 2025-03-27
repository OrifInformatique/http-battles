// import le schema d'un Board
const Board = require("../../../../../models/Board")

// import fonctions util pour check
const utilCheck = require('../../../../check')

const utilSaveBoard = require('./depthFive/depthSix/depthBottom/saveBoard')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFour/createBoard"

// crée un plateau de jeux
exports.createBoard = async (gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createBoard"

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

    // crée un nouveaux plateau de jeux
    const board = new Board({
        gameId: gameId,
        userId: userId,
        board: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
    })



    // stoque le plateau dans la base donnée
    await utilSaveBoard.saveBoard(board, req)
        .then(value => {
            // retourne le plateau sauvegarder et le stoque dans la requete
            req.newBoard = value
            req.data.push({
                name: "utilSaveBoard.saveBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilSaveBoard.saveBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    // retourne la variable traité pour la gestion d'erreur
    return req.newBoard
}