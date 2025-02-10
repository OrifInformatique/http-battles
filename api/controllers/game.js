// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

exports.createGame = (req, res, next) => {
    const game = new Game({
        state: "WAITING_PLAYER",
        createurId: req.body.userId
    })
    game.save()
        // si tout se passe bien, envoi un message de succès (obligatoire)
        .then(() => res.status(201).json({ message: "Partie créé !" }))
        // en cas d'erreure, envoie l'erreur
        .catch((error) => res.status(400).json({ error }));

    //const games = require('../../mocks/games/list.json'); // Find or create 
    //let newGame = games.find(aGame => aGame.state === "WAITING_PLAYER");
    //res.status(200).json(newGame)
}