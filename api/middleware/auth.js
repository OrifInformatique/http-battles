// import jsonwebtoken pour verifier des token
const { error } = require('console');
const jwt = require('jsonwebtoken');
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, 'env/.env') })

// export le module
module.exports = (req, res, next) => {
    console.log(req.body)
    // test le code contenu
    try {
        // extrait le token du header de la requete en utilisant la fonction split pour seulment récupérer le contenu après l'espace suivant le mot clef Bearer
        req.token = req.headers.authorization.split(' ')[1]

        // si le token n'est pas le token developer
        if (req.token !== process.env.DEV_TOKEN) {
            // decode le token 
            const decodedToken = jwt.verify(req.token, `${process.env.TOK_SEC}`)
            // récupère l'id utilisateur
            const userId = decodedToken.userId

            // test si l'userId du token est le même que celui du body
            if (userId !== req.body.userId) {
                throw {
                    "message": "invalid token"
                }
            }

            // le rajoute à la requete
            req.auth = {
                userId: userId
            }
        } else {
            //  ajoute l'id utilisateur dans le corp de la requet dans la parti authentification
            req.auth = {
                userId: req.body.userId
            }
        }

        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        // renvoie le status de l'erreur
        res.status(401).json({ error })
    }

}