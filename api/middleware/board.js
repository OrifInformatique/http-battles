// import fonctions util pour board
const utilBoard = require('../util/board')

const utilPhrase = require('../util/phrase')

// import fonctions util pour res
const utilRes = require('../util/res')

const LOC_GLOB = "file: ../middleware/board"

exports.fillBoard = async (req, res, next) => {
    const LOC_LOC = "methode: fillBoard"

    await utilBoard.createBoard(req.body.gameId, req.body.userId)
        .then(value => {
            req.board = value

            req.data.push({
                name: "utilBoard.createBoard",
                value: value,
                loc: LOC_GLOB + " " + LOC_LOC
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    await utilPhrase.createPhrase(req.board._id, req.body.phrase)
        .then(value => {
            req.board.phrase = value

            req.data.push({
                name: "utilPhrase.createPhrase",
                value: value,
                loc: LOC_GLOB + " " + LOC_LOC
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    await utilBoard.insertPhraseInBoard(req.board, req.board.phrase)
        .then(value => {
            req.board.board = value

            req.data.push({
                name: "utilBoard.insertPhraseInBoard",
                value: value,
                loc: LOC_GLOB + " " + LOC_LOC
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilBoard.updateBoard(req.board)
        .then(value => {
            req.board = value

            req.data.push({
                name: "utilBoard.updateBoard",
                value: value,
                loc: LOC_GLOB + " " + LOC_LOC
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    if (next !== undefined) {
        next()
    }
}