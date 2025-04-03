// import jsonwebtoken pour verifier des token
const { error } = require('console');
const jwt = require('jsonwebtoken');
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../env/.env') })

// export le module
module.exports = (req, res, next) => {
    // extrait le token du header de la requete en utilisant la fonction split pour seulment récupérer le contenu après l'espace suivant le mot clef Bearer
    req.token = req.headers.authorization.split(' ')[1]

    if (req.token === process.env.DEV_TOKEN) {
        req.auth = {
            userId: req.body.userId
        }

        // fait suivre au prochain middleware
        next()
    } else {
        var error = new Error()
        error.name = "unauthorized"
        error.message = "Bad token"
        // renvoie le status de l'erreur
        res.status(401).json( error )
    }

}