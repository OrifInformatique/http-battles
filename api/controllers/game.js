// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

const util = require('../util/user')

// crée une partie
exports.createGame = (req, res, next) => {

    const gameReq = req.body 

    const creatorId = gameReq.userId

    const timestamp = new Date().getTime()

    const key = creatorId + timestamp

    // crée une partie à partir d'un schema
    const game = new Game({
        state: "WAITING_PLAYER",
        createurId: creatorId,
        key: key
    })
    // sauvegarde la partie
    game.save()
        // si tout se passe bien, envoi un message de succès (obligatoire)
        .then(() => res.status(201).json({ 
            message: "Partie créé !" ,
            state: game.state,
            key: key
        }))
        // en cas d'erreure, envoie l'erreur
        .catch((error) => res.status(400).json({ error }));
}

exports.findGame = (req, res, next) => {
    // recupère la partie qui correspond à la clef de la requette
    Game.findOne({ key: req.body.key})
        // si tout se passe bien, envoit la partie
        .then(game => res.status(200).json(game))
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json({error}))
}

exports.joinGame = (req, res) => {

    // recupère la partie qui correspond à la clef de la requette
    Game.findOne({ key: req.body.key})
        // si tout se passe bien, envoit la partie
        .then(
            game => {
                // modifie la partie qui correspond a l'id en parametre dans la requet en remplacant son contenu par le body contenu dans la requet
                Game.updateOne({ key: game.key}, { $set: {
                        state: "SETTINGS",
                        challengerId:  req.body.challengerId
                    }})
                    // si tout se passe bien, envoit la partie
                    .then(() => res.status(200).json({
                        message: "Partie rejointe !",
                        state: game.state,
                        createurId: game.createurId,
                        challengerId: game.challengerId
                    }))
                    // si une erreur est trouvée, envoie l'erreur
                    .catch(error => res.status(401).json({ error }))
            }
        )
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json({error}))
}