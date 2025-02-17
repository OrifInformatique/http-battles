// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

const utilUser = require('../util/user')

const utilGame = require('../util/game')

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
        .then(game => {
            utilGame.formatedGame(game)
                .then(formatedGame => res.status(200).json(formatedGame))
                .catch(error => res.status(404).json({error}))
        })
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json({error}))
}

exports.listGames = (req, res, next) => {
    // recupère la partie qui correspond à la clef de la requette
    Game.find({ state: "WAITING_PLAYER"})
        // si tout se passe bien, envoit la partie
        .then(async games => {
            const formattedGames = await utilGame.formatedGames(games)
            res.status(200).json(formattedGames)
        })
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(400).json({error}))
}

exports.joinGame = (req, res, next) => {
    const key = req.body.key
    const challengerId = req.body.userId
    // recupère la partie qui correspond à la clef de la requette
    Game.findOne({ key: key})
        // si tout se passe bien, envoit la partie
        .then( async game => {
                const createurId = game.createurId
                const createur = await utilUser.getUserById(createurId)
                const createurUsername = createur.username
                const challenger = await utilUser.getUserById(challengerId)
                const challengerUsername = challenger.username
                // modifie la partie qui correspond a l'id en parametre dans la requet en remplacant son contenu par le body contenu dans la requet
                Game.updateOne({ key: key}, { $set: {
                    state: "SETTINGS",
                    challengerId:  challengerId
                }})
                // si tout se passe bien, envoit la partie
                .then(() => res.status(200).json({
                    message: "Partie rejointe !",
                    state: game.state,
                    createurUsername: createurUsername,
                    challengerUsername: challengerUsername
                }))
                // si une erreur est trouvée, envoie l'erreur
                .catch(error => res.status(401).json({ error }))
            }
        )
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json(error))
}

exports.startGame = (req, res, next) => {
    const key = req.body.key
    const coinFlip = Math.floor(Math.random() * 2) == 0

    Game.findOne({ key: key})
        .then( game => {
            if(coinFlip){
                var startUserId = game.createurId
                console.log("CREATEUR_TURN")
                Game.updateOne({ key: key}, { $set: {
                    state: "CREATEUR_TURN"
                }})
                 .catch(error => res.status(401).json({ error }))
            } else {
                var startUserId = game.challengerId
                console.log("CHALLENGER_TURN")
                Game.updateOne({ key: key}, { $set: {
                    state: "CHALLENGER_TURN"
                }})
                .catch(error => res.status(401).json({ error }))
            }
            const resultMessage = utilGame.startMessage(req.body.userId, startUserId)
            res.status(200).json(resultMessage)
        })
        .catch(error => res.status(404).json({ error }))
}

exports.checkTurn = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then(game => {
            if(game.state === "CREATEUR_TURN"){
                if(game.createurId === req.body.userId){
                    res.status(200).json({
                        "message": "Your turn"
                    })
                } else {
                    res.status(200).json({
                        "message": "Wait"
                    })
                }
            } else if(game.state === "CHALLENGER_TURN"){
                if(game.challengerId === req.body.userId){
                    res.status(200).json({
                        "message": "Your turn"
                    })
                } else {
                    res.status(200).json({
                        "message": "Wait"
                    })
                }
            } else {
                res.status(200).json({
                    "message": "Game Over"
                })
            }
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetA = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Get A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetB = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Get B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get B"
            })
    })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetC = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Get C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get C"
            })
    })
        .catch(error => res.status(404).json({ error }))
}

exports.tryGetD = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Get D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Get D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}


exports.tryPostA = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Post A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPostB = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Post B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPostC = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Post C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPostD = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Post D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Post D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutA = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Put A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutB = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Put B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutC = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Put C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryPutD = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Put D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Put D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteA = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Delete A")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete A"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteB = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Delete B")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete B"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteC = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Delete C")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete C"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.tryDeleteD = (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            console.log("Delete D")
            utilGame.switchTurn(game)
            res.status(200).json({
                "message": "Delete D"
            })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.endGame =  (req, res, next) => {
    const key = req.body.key
    Game.findOne({ key: key})
        .then( game => {
            Game.updateOne({ key: game.key}, { $set: {
                state: "ENDED"
            }})
            .then(
                console.log("ENDED"),
                res.status(200).json({
                    "message": "Game Over"
                })
            )
        })
        .catch(error => res.status(404).json({ error }))
}

