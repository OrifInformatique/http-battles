const Board = require('../models/Board')

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
    

    return await board.save()
}

exports.getBoard = async (boardId) => {
    return Board.findOne({ _id: boardId })
            .then(board => { return board })
}
