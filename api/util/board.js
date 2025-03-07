const Board = require('../models/Board')
const utilGame = require('../util/game')
const utilPhrase = require('../util/phrase')
const utilWord = require('../util/word')

// import fonctions util pour check
const utilCheck = require('../util/check')

const LOC_GLOB = "file: ../util/board"

exports.createBoard = async (gameId, userId) => {
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

    await this.saveBoard(board)
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

    return req.newBoard
}

exports.saveBoard = async (board) => {
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
    req.board = await this.createBoard(req.body.gameId, req.body.userId)
    req.board.phrase = await utilPhrase.createPhrase(req.board._id, req.body.phrase)

    req.board.board = await this.insertPhraseInBoard(req.board, req.board.phrase)
    console.log(req.board)
    req.board = await this.updateBoard(req.board)
    return req.board
}


exports.insertPhraseInBoard = async (board, userPhrase) => {
    const newBoard = []
    for (const keyY in board.board) {
        await this.insertPhraseInBoardY(board, newBoard, userPhrase, keyY)
    }

    return newBoard
}

exports.insertPhraseInBoardY = async (board, newBoard, userPhrase, keyY) => {
    newBoard.push([])
    for (const keyX in board.board[keyY]) {
        await this.insertPhraseInBoardX(newBoard, userPhrase, keyY, keyX)
    }
}

exports.insertPhraseInBoardX = async (newBoard, userPhrase, keyY, keyX) => {
    for (const keyW in userPhrase.words) {
        await this.insertPhraseInBoardW(newBoard, userPhrase, keyY, keyX, keyW)
    }
    if (newBoard[keyY][keyX] === undefined) {
        newBoard[keyY].push(null)
    }
}

exports.insertPhraseInBoardW = async (newBoard, userPhrase, keyY, keyX, keyW) => {
    if (userPhrase.words[keyW].position[0].toString() === keyY && userPhrase.words[keyW].position[1].toString() === keyX) {
        newBoard[keyY].push(userPhrase.words[keyW])
    }
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



    await utilWord.revealWord(req.board.board[y][x])
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
    const advBoard = await this.getBoardGameUser(req.body.gameId, adversaireId, req)

    var wordCounter = 0
    wordCounter = await this.tryPhraseCheckAdv(advBoard, req, wordCounter)

    if (wordCounter === advBoard.phrase.words.length) {
        return true
    } else {
        return false
    }
}

exports.tryPhraseCheckAdv = async (advBoard, req, wordCounter) => {
    for (const keyAdv in advBoard.phrase.words) {
        wordCounter = await this.tryPhraseCheckReq(advBoard, req, keyAdv, wordCounter)
    }
    return wordCounter
}

exports.tryPhraseCheckReq = async (advBoard, req, keyAdv, wordCounter) => {
    for (const keyReq in req.body.phrase) {
        wordCounter = await this.tryPhraseCheckAll(advBoard, req, keyAdv, keyReq, wordCounter)
    }
    return wordCounter
}

exports.tryPhraseCheckAll = async (advBoard, req, keyAdv, keyReq, wordCounter) => {
    if (advBoard.phrase.words[keyAdv].content === req.body.phrase[keyReq].word.content && keyAdv === keyReq) {
        wordCounter = wordCounter + 1
    }
    return wordCounter
}