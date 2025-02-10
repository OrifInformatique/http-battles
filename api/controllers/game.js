// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

exports.createGame = (req, res) => {
    const games = require('../../mocks/games/list.json'); // Find or create 
    let newGame = games.find(aGame => aGame.state === "WAITING_PLAYER");
    res.status(200).json(newGame)
}