const Board = require('../models/Board')

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
    return Board.findOne({ _id: boardId })
        .then(board => { return board })
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
        .then(console.log("Board modified succesfully"))
    return await this.getBoard(board._id)
}