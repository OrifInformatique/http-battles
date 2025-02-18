const utilPhrase = require('../util/phrase')
const utilGame = require('../util/game')

exports.createPhrase = async (req, res, next) => {
    const game = await utilGame.getGame(req.body.key)
    utilPhrase.createPhrase(game._id, req.body.userId)
        .then(() => res.status(201).json({
            message: "Phrase Enregistré !"
        }))
        // en cas d'erreure, envoie l'erreur
        .catch((error) => res.status(400).json({ error }))
}

