const Board = require('../models/Board')

exports.createBoard = async (gameId) => {
    
    const board = new Board({
        gameId: gameId,
        board: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
    })
    const newboard = await board.save()

    return await exports.getBoard(newboard._id)
}

exports.getBoard = async (boardId) => {
    return Board.findOne({ _id: boardId })
            .then(board => { return board })
}
