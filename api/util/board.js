const Board = require('../models/Board')
const utilGame = require('../util/game')
const utilPhrase = require('../util/phrase')
const utilWord = require('../util/word')

// import fonctions util pour check
const utilCheck = require('../util/check')

const LOC_GLOB = "file: ../util/board"

exports.createBoard = async (gameId, userId, req) => {
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

    await this.saveBoard(board, req)
        .then(value => {
            req.newBoard = value
            req.data.push({
                name: "this.saveBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.saveBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    console.log(req.newBoard)
    return req.newBoard
}

exports.saveBoard = async (board, req) => {
    const LOC_LOC = "methode: saveBoard"

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

    await board.save()
        .then(value => {
            req.newBoard = value
            req.data.push({
                name: "board.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "board.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.newBoard
}

exports.getBoard = async (req, boardId) => {
    const LOC_LOC = "methode: getBoard"

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

    await Board.findOne({ _id: boardId })
        .then(value => {
            req.board = value
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.board
}


exports.getBoardGameUser = async (gameId, userId, req) => {
    const LOC_LOC = "methode: getBoardGameUser"

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

    await Board.findOne({
        gameId: gameId,
        userId: userId
    })
        .then(value => {
            req.board = value
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.board
}

exports.fillBoard = async (req) => {
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

    await this.createBoard(req.body.gameId, req.auth.userId, req)
        .then(value => {
            req.board = value
            req.data.push({
                name: "this.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
        
    await utilPhrase.createPhrase(req.board._id, req.body.phrase, req)
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
        
    await this.insertPhraseInBoard(req.board, req.board.phrase, req)
        .then(value => {
            req.board.board = value
            req.data.push({
                name: "this.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.updateBoard(req)
        .then(value => {
            req.board = value
            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    return req.board
}


exports.insertPhraseInBoard = async (board, userPhrase, req) => {
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
    req.newBoardFull = []
    for (const keyY in board.board) {
        await this.insertPhraseInBoardY(board, userPhrase, keyY, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardY",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.insertPhraseInBoardY",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    return req.newBoardFull
}

exports.insertPhraseInBoardY = async (board, userPhrase, keyY, req) => {
    const LOC_LOC = "methode: insertPhraseInBoardY"

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

    req.newBoardFull.push([])
    for (const keyX in board.board[keyY]) {
        await this.insertPhraseInBoardX(userPhrase, keyY, keyX, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardX",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.insertPhraseInBoardX",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    return req.newBoardFull
}

exports.insertPhraseInBoardX = async (userPhrase, keyY, keyX, req) => {
    const LOC_LOC = "methode: insertPhraseInBoardX"

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

    for (const keyW in userPhrase.words) {
        await this.insertPhraseInBoardW(userPhrase, keyY, keyX, keyW, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardW",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.insertPhraseInBoardW",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    if (req.newBoardFull[keyY][keyX] === undefined) {
        req.newBoardFull[keyY].push(null)
    }
    return req.newBoardFull
}

exports.insertPhraseInBoardW = async (userPhrase, keyY, keyX, keyW, req) => {
    if (userPhrase.words[keyW].position[0].toString() === keyY && userPhrase.words[keyW].position[1].toString() === keyX) {
        req.newBoardFull[keyY].push(userPhrase.words[keyW])
    }

    return req.newBoardFull
}

exports.checkBoard = async (y, x, gameId, userId, req) => {
    const LOC_LOC = "methode: checkBoard"

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

    await this.getBoardGameUser(gameId, userId, req)
        .then(value => {
            req.board = value
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.board.board[y][x] !== null) {

        await this.checkBoardSuccess(y, x, req)
            .then(value => {
                req.result = value

                req.data.push({
                    name: "this.checkBoardSuccess",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.checkBoardSuccess",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    } else {
        req.result = {
            result: false
        }
    }

    return req.result
}

exports.checkBoardSuccess = async (y, x, req) => {
    const LOC_LOC = "methode: checkBoardSuccess"

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



    await utilWord.revealWord(req.board.board[y][x], req)
        .then(value => {
            req.board.board[y][x] = value

            req.data.push({
                name: "utilWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    console.log("test")
    await this.updateBoard(req)
        .then(value => {
            req.board = value

            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    req.result = {
        word: req.board.board[y][x],
        result: true
    }

    return req.result
}

exports.updateBoard = async (req) => {
    const LOC_LOC = "methode: updateBoard"

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
            req.data.push({
                name: "Board.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.getBoard(req, req.board._id)
        .then(value => {
            req.board = value

            req.data.push({
                name: "this.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.board
}

exports.tryPhrase = async (adversaireId, req) => {
    const LOC_LOC = "methode: tryPhrase"

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

    await this.getBoardGameUser(req.body.gameId, adversaireId, req)
        .then(value => {
            req.advBoard = value
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    req.wordCounter = 0
    await this.tryPhraseCheckAdv(req.advBoard, req)
        .then(value => {
            req.wordCounter = value
            req.data.push({
                name: "this.tryPhraseCheckAdv",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.tryPhraseCheckAdv",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.wordCounter === req.advBoard.phrase.words.length) {
        return true
    } else {
        return false
    }
}

exports.tryPhraseCheckAdv = async (advBoard, req) => {
    const LOC_LOC = "methode: tryPhraseCheckAdv"

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

    for (const keyAdv in advBoard.phrase.words) {
        await this.tryPhraseCheckReq(advBoard, req, keyAdv)
            .then(value => {
                req.wordCounter = value
                req.data.push({
                    name: "this.tryPhraseCheckReq",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.tryPhraseCheckReq",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    return req.wordCounter
}

exports.tryPhraseCheckReq = async (advBoard, req, keyAdv) => {
    const LOC_LOC = "methode: tryPhraseCheckReq"

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

    for (const keyReq in req.body.phrase) {
        await this.tryPhraseCheckAll(advBoard, req, keyAdv, keyReq)
            .then(value => {
                req.wordCounter = value
                req.data.push({
                    name: "this.tryPhraseCheckAll",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.tryPhraseCheckAll",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    return req.wordCounter
}

exports.tryPhraseCheckAll = async (advBoard, req, keyAdv, keyReq) => {
    const LOC_LOC = "methode: tryPhraseCheckAll"

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

    if (advBoard.phrase.words[keyAdv].content === req.body.phrase[keyReq].word.content && keyAdv === keyReq) {
        req.wordCounter = req.wordCounter + 1
    }
    return req.wordCounter
}