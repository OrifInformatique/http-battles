const Board = require('../models/Board')
const utilGame = require('../util/game')
const utilPhrase = require('../util/phrase')
const utilWord = require('../util/word')

exports.createBoard = async (gameId, userId) => {
    const game = await utilGame.getGame(gameId)
    const board = new Board({
        gameId: game._id,
        userId: userId,
        board: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
    })
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

exports.fillBoard = async (board, phrase) => {
    const newBoard = []
    for (const keyY in board.board) {
        newBoard.push([])
        for (const keyX in board.board[keyY]) {
            for (const keyW in phrase.words) {
                if (phrase.words[keyW].position[0].toString() === keyY && phrase.words[keyW].position[1].toString() === keyX) {
                    newBoard[keyY].push(phrase.words[keyW])
                }
            }
            if (newBoard[keyY][keyX] === undefined) {
                newBoard[keyY].push(null)
            }
        }
    }
    await Board.updateOne({ _id: board._id }, {
        $set: {
            board: newBoard
        }
    })
    return await this.getBoard(board._id)
}

exports.checkBoard = async (board, y, x) => {

    if (board.board[y][x] !== null) {
        var revealedWord = await utilWord.revealWord(board.board[y][x])
        board.board[y][x] = revealedWord
        var updatedBoard = await this.updateBoard(board)
        var result = {
            word: updatedBoard.board[y][x],
            result: true
        }

    } else {
        var result = {
            result: false
        }
    }

    return result
}

exports.insertPhrase = async (board, phrase) => {
    await Board.updateOne({ _id: board._id }, {
        $set: {
            phrase: phrase
        }
    })
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

exports.tryPhrase = async (advBoard, req) => {

    const wordCount = advBoard.phrase.words.length

    var wordCounter = 0
    for (const keyAdv in advBoard.phrase.words) {
        for (const keyReq in req.body.phrase) {
            if (advBoard.phrase.words[keyAdv].content === req.body.phrase[keyReq].word.content && keyAdv === keyReq) {
                var wordCounter = wordCounter + 1
            }
        }
    }

    if (wordCounter === wordCount) {
        return true
    } else {
        return false
    }
}

exports.fillBoardInsertPhrase = async (req) => {
    const board = await this.createBoard(req.body.gameId, req.body.userId)
    const userPhrase = await utilPhrase.createPhrase(board._id, req.body.phrase)
    const filledBoard = await this.fillBoard(board, userPhrase)
    await this.insertPhrase(filledBoard, userPhrase)

    return filledBoard
}

exports.getBoardGameUserAndTryPhrase = async (gameId, adversaireId, req) => {

    const advBoard = await this.getBoardGameUser(gameId, adversaireId)

    const check = await this.tryPhrase(advBoard, req)

    return check
}