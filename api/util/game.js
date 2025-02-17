// import le schema d'un utilisateur
const Game = require("../models/Game")

const utilUser = require('../util/user')

exports.formatedGames = async (games) =>{
    const newGameList = []
    for(const game of games){
        const createur = await utilUser.getUserById(game.createurId)
        try {
            const createurUsername = createur.username
            newGameList.push({
                state: game.state,
                createurUsername: createurUsername
            })
        } catch (error) {
            console.log(error)
            continue
        }
    }
    return newGameList
}


