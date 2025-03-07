const Board = require('../models/Board')
const utilGame = require('../util/game')
const utilPhrase = require('../util/phrase')
const utilWord = require('../util/word')

exports.createBoard = async (gameId, userId) => {
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

    return await this.saveBoard(board)
}

exports.saveBoard = async (board) => {
    return await board.save()
}

exports.getBoard = async (boardId) => {
    return await Board.findOne({ _id: boardId })
}


exports.getBoardGameUser = async (gameId, userId) => {
    const board = await Board.findOne({
        gameId: gameId,
        userId: userId
    })

    return board
}

exports.fillBoard = async (req) => {
    req.board = await this.createBoard(req.body.gameId, req.body.userId)
    req.board.phrase = await utilPhrase.createPhrase(req.board._id, req.body.phrase)

    req.board.board = await this.insertPhraseInBoard(req.board, req.board.phrase)
    console.log(req.board)
    return req.board = await this.updateBoard(req.board)
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

exports.checkBoard = async (y, x, gameId, userId) => {

    var board = await this.getBoardGameUser(gameId, userId)
    if (board.board[y][x] !== null) {
        var result = await this.checkBoardSuccess(board, y, x)
    } else {
        var result = {
            result: false
        }
    }

    return result
}

exports.checkBoardSuccess = async (board, y, x) => {
    board.board[y][x] = await utilWord.revealWord(board.board[y][x])
    board = await this.updateBoard(board)

    return {
        word: board.board[y][x],
        result: true
    }
}

exports.updateBoard = async (newBoard) => {
    await Board.updateOne({ _id: newBoard._id }, {
        $set: {
            gameId: newBoard.gameId,
            userId: newBoard.userId,
            phrase: newBoard.phrase,
            board: newBoard.board
        }
    })

    return await this.getBoard(newBoard._id)
}

exports.tryPhrase = async (adversaireId, req) => {
    const advBoard = await this.getBoardGameUser(req.body.gameId, adversaireId)

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