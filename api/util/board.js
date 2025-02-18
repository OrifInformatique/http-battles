const Board = require('../models/Board')

exports.createBoard = (gameId) => {
    
    const board = new Board({
        gameId: gameId,
        board: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
    })
    board.save()
        .then(console.log("board created  succesfully"))
        .catch(error => console.log(error))
}

