// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');
// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/queryConstructor"

// retourne le plateau selon son id
exports.queryConstructor = async (req, boardId) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: queryConstructor"

    // test de la validité des données
    await utilCheck.dataValidityTest(req)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    if(req.query === undefined){
        req.query = {}
    }

    // test si l'id d'un plateau spécifique est demandé par le biais de son id
    if (req.boardIdQuery !== undefined) {
        // si oui, l'ajoute au query en traduisan l'id en object id qui sera reconu par la base de donnée et en l'ajoutant au query
        var boardId = {
            "_id": mongoose.Types.ObjectId(req.boardIdQuery)
        }
        Object.assign(req.query, boardId)
    }

    // test si les plateau d'un utilisateur particulier son demander par le biais de son id
    if (req.userIdQuery !== undefined) {
        // si oui, l'ajoute au query en traduisan l'id en object id qui sera reconu par la base de donnée et en l'ajoutant au query
        var userId = {
            "userId": req.userIdQuery
        }
        Object.assign(req.query, userId)
    }

    // test si le client veut les plateau pour une partie particulières par le biais de son id
    if (req.gameIdQuery !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var gameId = {
            "gameId": req.gameIdQuery
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(req.query, gameId)
    }
    
    req.package.query = req.query

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}
