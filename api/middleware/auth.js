// import jsonwebtoken pour verifier des token
const jwt = require('jsonwebtoken');

 
// export le module
module.exports = (req, res, next) => {
    // test le code contenu
   try {
        // extrait le token du header de la requete en utilisant la fonction split pour seulment récupérer le contenu après l'espace suivant le mot clef Bearer
       const token = req.headers.authorization.split(' ')[1]
        // decode le token 
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
        // récupère l'id utilisateur
       const userId = decodedToken.userId
        // le rajoute à la requete
       req.auth = {

           userId: userId

       }
    // fait suivre au prochain middleware
    next()
    // en cas d'erreur
   } catch(error) {
        // renvoie le status de l'erreur
       res.status(401).json({ error })

   }

}