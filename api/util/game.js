// import le schema d'un utilisateur
const Game = require("../models/Game")

const utilUser = require('../util/user')

exports.formateGame = (game) =>{
    const createurId = game.createurId
    
    return utilUser.getUserById(createurId)
        .then( createur => {
            const createurUsername = createur.username
            return {
                state: game.state,
                createurUsername: createurUsername
            }
        }
            
        )
        .catch(error => res.status(404).json(error))
}

exports.formateGames = (games) =>{
    
    

}