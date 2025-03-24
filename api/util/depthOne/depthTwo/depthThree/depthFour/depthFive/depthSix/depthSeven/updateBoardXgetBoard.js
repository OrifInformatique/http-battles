

// import le schema d'un Board
const Board = require("../../../../../../../../models/Board")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// import fonctions util pour board
const utilGetBoard = require('./depthBottom/getBoard')

// import fonctions util pour board
const utilUpdateBoard = require('./depthBottom/updateBoard')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthEight/updateBoardXgetBoard"

/*
subFunctions
    -utilUpdateBoard.updateBoard
    -utilGetBoard.getBoard
*/
// update le plateau
exports.updateBoardXgetBoard = async (req) => {
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
    await utilUpdateBoard.updateBoard(req)
        .then(value => {
            // stoque le tableaux dans la requete
            req.boardUpdate = value.boardUpdate
            req.package.boardUpdate = value.boardUpdate

            req.data.push({
                name: "utilUpdateBoard.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateBoard.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère le tableau après l'update
    await utilGetBoard.getBoard(req, req.board._id)
        .then(value => {
            // stoque le tableaux dans la requete
            req.board = value.board
            req.package.board = value.board

            req.data.push({
                name: "utilGetBoard.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetBoard.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}