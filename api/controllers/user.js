// import bcrypte pour l'encryption
const bcrypt = require("bcrypt");
// import le schema d'un utilisateur
const User = require("../models/User");
// import jsonwebtoken pour fabriquer des token
const jwt = require("jsonwebtoken");

// import fonctions util pour res
const utilRes = require('../util/res')

// exporte la fonctionalité de création d'un utilisateur
exports.signup = (req, res, next) => {
  // encrypte le mot de passe contenu dans la requete
  bcrypt
    .hash(req.body.password, 10)
    // si tout se passe bien
    .then((hash) => {
      // crée un nouvel utilisateur
      const user = new User({
        // a partire de l'email contenu dans la requete
        email: req.body.email,
        // et le password hasher
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username
      });
      // sauvegarde l'utilisateur
      user
        .save()
        // si tout se passe bien, envoi un message de succès (obligatoire)
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        // en cas d'erreure, envoie l'erreur
        .catch((error) => res.status(400).json({ error }));
    })
    // en cas 'derreure, envoie l'erreur
    .catch((error) => res.status(500).json({ error }));
};

// export les fonctionalité de connexion utilisateur
exports.login = (req, res, next) => {
  // trouve l'utilisateur à partir de l'email contenu dans la requette
  User.findOne({ email: req.body.email })
    // si tout se passe bien,
    .then((user) => {
      // si l'utilisateur est null
      if (user === null) {
        // renvoit un message de mail/password invalide
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
        // ou
      } else {
        // compare le mot de passe enregistrer pour cette utilisateur et le mot de passe hasher contenu dans la requette
        bcrypt
          .compare(req.body.password, user.password)
          // si tout se passe bien
          .then((valid) => {
            // si le mot de pass est invalide
            if (!valid) {
              // retourne un message mail/mot de passe invalide
              return res
                .status(401)
                .json({ message: "Paire login/mot de passe incorrecte" });
              // ou
            } else {
              // envoie un message de succès avec
              res.status(200).json({
                // l'id utilisateur
                userId: user._id,
                // un token qui contient
                token: jwt.sign(
                  // l'id utilisateur
                  { userId: user._id },
                  // une clef de hashage
                  "RANDOM_TOKEN_SECRET",
                  // une periode de validité
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          // en cas d'erreure renvoit l'erreur
          .catch((error) => res.status(500).json({ error }));
      }
    })
    // en cas d'erreure renvoit l'erreur
    .catch((error) => res.status(500).json({ error }));
};


exports.findUser = async (req, res, next) => {
    utilRes.sendSuccess(200, req.body.users, res)
}
