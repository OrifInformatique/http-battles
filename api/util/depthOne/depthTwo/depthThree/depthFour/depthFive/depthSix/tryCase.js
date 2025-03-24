
// import le schema d'un Board
const Board = require("../../../../../../../models/Board")

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// import les fonction utiles pour board
const utilUpdateBoardXgetBoard = require('./depthSeven/updateBoardXgetBoard')

// import les fonction utiles pour tryCase
const utilTryCase = require('./depthSeven/tryCase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSix/tryCase"

// retourn un plateau de jeux selon l'identifiant de son utilisateur et de la partie
exports.getBoardGameUser = async (gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardGameUser"

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

    // trouve le plateau en fonction de l'id de son utilisateur et de la partie
    await Board.findOne({
        gameId: gameId,
        userId: userId
    })
        .then(value => {
            // stoque le plateau dans la requete
            req.board = value
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.board
}

// effectue les opération en cas de success pour le cheque de la case
exports.checkBoardSuccess = async (y, x, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoardSuccess"

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
    
    // revèle le mot
    await utilTryCase.revealXupdateWord(req.board.board[y][x], req)
        .then(value => {
            // stoque le mot dans la case du tableau du plateau dans la requete
            req.board.board[y][x] = value.word
            req.package.board.board[y][x] = value.word
            
            req.data.push({
                name: "utilTryCase.revealXupdateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.revealXupdateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // updadet le plateau avec le nouveaux tableaux
    await utilUpdateBoardXgetBoard.updateBoardXgetBoard(req)
        .then(value => {
            // stoque le nouveaux tableaux dans la requete
            req.board = value.board
            req.package.board = value.board

            req.data.push({
                name: "utilUpdateBoardXgetBoard.updateBoardXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateBoardXgetBoard.updateBoardXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stoque le mot et le succes du check dans un objet résultat dans la requete
    req.result = {
        word: req.board.board[y][x],
        result: true
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.result
}
