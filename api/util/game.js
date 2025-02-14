// import le schema d'un utilisateur
const Game = require("../models/Game")

const utilUser = require('../util/user')

exports.formatedGame = (game) =>{
    const createurId = game.createurId

    return utilUser.getUserById(createurId)
        .then( createur => {
            
            const createurUsername = createur.username
            return {
                state: game.state,
                createurUsername: createurUsername
            }
        })
        .catch(error => console.log(error))
}

exports.formatedGames = (games) =>{
    

}