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
