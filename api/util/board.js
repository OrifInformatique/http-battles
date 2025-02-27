const Board = require('../models/Board')

const utilWord = require('../util/word')

exports.createBoard = async (game, userId) => {

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
    
    return await Board.findOne({ 
        gameId: gameId,
        userId: userId
     })
}

exports.fillBoard = async (board, phrase) => {
    const newBoard = []
    for(const keyY in board.board){
        newBoard.push([])
        for(const keyX in board.board[keyY]){
            for(const keyW in phrase.words){
                if(phrase.words[keyW].position[0].toString() === keyY && phrase.words[keyW].position[1].toString() === keyX){
                    newBoard[keyY].push(phrase.words[keyW])
                }
            }
            if(newBoard[keyY][keyX] === undefined) {
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
    console.log(board.board[y][x])
    if(board.board[y][x] !== null){
        var revealedWord = await utilWord.revealWord(board.board[y][x])
        console.log(board.board[y][x])
        board.board[y][x] = revealedWord
        console.log(board.board[y][x])
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
    console.log(await this.getBoard(board._id))
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