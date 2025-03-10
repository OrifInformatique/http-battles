// import fonctions util pour board
const utilBoard = require('../util/board')

const utilPhrase = require('../util/phrase')

// import fonctions util pour res
const utilRes = require('../util/res')

const LOC_GLOB = "file: ../middleware/board"

// import fonctions util pour board
const utilCheck = require('../util/check')

exports.fillBoard = async (req, res, next) => {
    const LOC_LOC = "methode: fillBoard"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.updateBoard(req)
        .then(value => {
            req.board = value

            req.data.push({
                name: "utilBoard.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
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

exports.createBoard = async (req, res, next) => {
    const LOC_LOC = "methode: createBoard"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.createBoard(req.body.gameId, req.body.userId, req)
        .then(value => {
            req.board = value
            console.log(value)
            req.data.push({
                name: "utilBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

    return req.board
}

exports.insertPhrase = async (req, res, next) => {
    const LOC_LOC = "methode: insertPhrase"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilPhrase.createPhrase(req.body.phrase, req)
        .then(value => {
            req.board.phrase = value

            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

    return req.board.phrase
}

exports.insertPhraseInBoard = async (req, res, next) => {
    const LOC_LOC = "methode: insertPhraseInBoard"

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
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.insertPhraseInBoard(req.board, req.board.phrase, req)
        .then(value => {
            req.board.board = value

            req.data.push({
                name: "utilBoard.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

    return req.board.board
}

exports.getBoardGameUser = async (req, res, next) => {
    const LOC_LOC = "methode: getBoardGameUser"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.getBoardGameUser(req.body.gameId, req.body.userId, req)
        .then(value => {
            req.testTurnMessage.userBoard = value.board

            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

    return req.testTurnMessage.userBoard
}

exports.getBoardGameAdversaire = async (req, res, next) => {
    const LOC_LOC = "methode: getBoardGameAdversaire"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.getBoardGameUser(req.body.gameId, req.otherUserId, req)
        .then(value => {
            req.testTurnMessage.adversaireBoard = value.board

            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }

    return req.testTurnMessage.adversaireBoard
}

exports.tryPhrase = async (req, res, next) => {
    const LOC_LOC = "methode: tryPhrase"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.tryPhrase(req.otherUserId, req)
            .then(value => {
                req.check = value
    
                req.data.push({
                    name: "utilBoard.tryPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilBoard.tryPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

    if (next !== undefined) {
        next()
    }

    return req.check
}

exports.checkBoard = async (req, res, next) => {
    const LOC_LOC = "methode: checkBoard"

    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilBoard.checkBoard(req.arrayY, req.arrayX, req.body.gameId, req.otherUserId, req)
            .then(value => {
                req.check = value
                console.log(value)
                req.data.push({
                    name: "utilBoard.checkBoard",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilBoard.checkBoard",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

    if (next !== undefined) {
        next()
    }

    return req.check
}