// import le fichier Thing.js qui contient la structure de l'objet Thing
const Game = require('../models/Game')
// import le package fs de node qui nous permet de modifier des fichiers
const fs = require('fs')

const utilUser = require('../util/user')

const utilGame = require('../util/game')

// crée une partie
exports.createGame = (req, res, next) => {
    // crée un timestamp
    const timestamp = new Date().getTime()
    // crée une clef avec le user id et le timestamp
    const key = req.body.userId + timestamp

    // crée une partie à partir d'un schema
    const game = new Game({
        state: "WAITING_PLAYER",
        createurId: req.body.userId,
        key: key
    })
    // sauvegarde la partie
    game.save()
        // si tout se passe bien, envoi un message de succès avec l'état de la partie et la clef
        .then(() => res.status(201).json({ 
            message: "Partie créé !" ,
            state: game.state,
            key: key
        }))
        // en cas d'erreure, envoie l'erreur
        .catch((error) => res.status(400).json({ error }));
}

// trouve une partie selon sa clef
exports.findGame = (req, res, next) => {
    // recupère la partie qui correspond à la clef de la requette
    Game.findOne({ key: req.body.key})
        // si tout se passe bien
        .then(game => {
            // formate le jeux envoyé pour que le client ne reçoive que les information util
            utilGame.formatedGame(game)
                // si tout se passe bien envoit la partie formaté
                .then(formatedGame => res.status(200).json(formatedGame))
                // en cas d'erreure, envoie l'erreur
                .catch(error => res.status(404).json({error}))
        })
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json({error}))
}

// liste les parties en attente de challenger
exports.listGames = (req, res, next) => {
    // recupère les partie qui sont en attentent
    Game.find({ state: "WAITING_PLAYER"})
        // si tout se passe bien
        .then(async games => {
            // formate les parties afin que le client ne reçoive que les informations dont il a besoins
            const formattedGames = await utilGame.formatedGames(games)
            // envois les parties formattées
            res.status(200).json(formattedGames)
        })
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json({error}))
}

// permet au client de rejoindre une party dont il a entré la clef
exports.joinGame = (req, res, next) => {
    const challengerId = req.body.userId
    // recupère la partie qui correspond à la clef de la requette
    Game.findOne({ key: req.body.key})
        // si tout se passe bien
        .then( async game => {
                const createur = await utilUser.getUserById(game.createurId)
                const challenger = await utilUser.getUserById(challengerId)
                // modifie la partie qui correspond a la clef en parametre dans la requet en remplacant son contenu par le body contenu dans la requet
                Game.updateOne({ key: req.body.key}, { $set: {
                    state: "SETTINGS",
                    challengerId:  challengerId
                }})
                // si tout se passe bien, envoit les informations util au client
                .then(() => res.status(200).json({
                    message: "Partie rejointe !",
                    state: game.state,
                    createurUsername: createur.username,
                    challengerUsername: challenger.username
                }))
                // si une erreur est trouvée, envoie l'erreur
                .catch(error => res.status(404).json({ error }))
            }
        )
        // si une erreur est trouvée, envoie l'erreur
        .catch(error => res.status(404).json(error))
}

// commence la partie
exports.startGame = (req, res, next) => {
    // stoque la clef dans une constante
    const key = req.body.key
    // sort aléatoirement un résultat true or false et le stock dans une constante
    const coinFlip = Math.floor(Math.random() * 2) == 0

    // récupère le jeux suivant la clef contenu dans la requette
    Game.findOne({ key: key})
        // si tout se passe bien
        .then( game => {
            // test le résultat aléatoire
            // si vrai
            if(coinFlip){
                // initialise la variable définissant le joueur qui commece la partie comme étant celui qui la créé
                var startUserId = game.createurId
                // update l'état de la partie pour signifier que le créateur commence
                Game.updateOne({ key: key}, { $set: {
                    state: "CREATEUR_TURN"
                }})
                // en cas de problème renvoit une erreur
                 .catch(error => res.status(404).json({ error }))
            // si le résultat aléatoire est faux
            } else {
                // initialise la variable définissant le joueur qui commece la partie comme étant le challenger
                var startUserId = game.challengerId
                // update l'état de la partie pour signifier que le challenger commence
                Game.updateOne({ key: key}, { $set: {
                    state: "CHALLENGER_TURN"
                }})
                // en cas de problème renvoit une erreur
                .catch(error => res.status(404).json({ error }))
            }
            // construit le message à renvoyer à l'utilisateur suivant le role de l'utilisateur et l'état de la partie (qui commence)
            const resultMessage = utilGame.startMessage(req.body.userId, startUserId)
            // renvoie le message à l'utilisateur
            res.status(200).json(resultMessage)
        })
        // en cas de problème renvoit une erreur
        .catch(error => res.status(404).json({ error }))
}

// vérifie si c'est le tour de l'utilisateur envoyant la requète suivant l'état de la partie
exports.checkTurn = (req, res, next) => {
    // trouve la partie selon la clef
    Game.findOne({ key: req.body.key})
        // si tout se passe bien
        .then(game => {
            // teste l'état de la partie
            // si c'est le tour du créateur
            if(game.state === "CREATEUR_TURN"){
                // test si le client est le créateur
                // si oui
                if(game.createurId === req.body.userId){
                    // renvoi un message pour informer que c'est le tour du client
                    res.status(200).json({
                        "message": "Your turn"
                    })
                // si non
                } else {
                    // renvoi un message pour informer que ce n'est pas le tour du client
                    res.status(200).json({
                        "message": "Wait"
                    })
                }
            // si c'est le tour du challenger
            } else if(game.state === "CHALLENGER_TURN"){
                // test si le client est le challenger
                // si oui
                if(game.challengerId === req.body.userId){
                    // renvoi un message pour informer que c'est le tour du client
                    res.status(200).json({
                        "message": "Your turn"
                    })
                // si non
                } else {
                    // renvoi un message pour informer que ce n'est pas le tour du client
                    res.status(200).json({
                        "message": "Wait"
                    })
                }
            // si c'est le tour de personne
            } else {
                // renvoi un message pour informer que la partie est términer
                res.status(200).json({
                    "message": "Game Over"
                })
            }
        })
        // en cas de problème renvoit une erreur
        .catch(error => res.status(404).json({ error }))
}

/**
 * série de fonctions pour les case du jeux
 */

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

