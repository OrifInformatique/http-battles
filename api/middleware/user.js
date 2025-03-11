// import le schema d'un utilisateur
const User = require("../models/User")

// import fonctions util pour board
const utilCheck = require('../util/check')

// import fonctions util pour board
const utilUser = require('../util/user')

// constant pour la localisation globale de l'erreur
const LOC_GLOB = "file: ../middleware/user"

// récupère le créateur du jeux dans la requette
exports.getCreatorById = async (req, res, next) => {
    // constante pour la localisation local de l'erreur
    const LOC_LOC = "methode: getCreatorById"

    // test de la validité des données de la requette
    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value

            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si le test est est échouer, arrète la méthode
    if (req.utilCheck) {
        return null
    }

    // récupère l'utilisateur en fonction de son id en parametre (ici l'id du créateur contenu dans le jeux)
    await utilUser.getUserById(req.game.createurId, req)
        .then(value => {
            // stock l'objet utilisateur trouvé dans la requete
            req.createur = value

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.createur
}


// récupère l'utilisateur selon son id dans le body de la requete
exports.getUserById = async (req, res, next) => {
    // constante pour la localisation local en cas d'erreur
    const LOC_LOC = "methode: getUserById"

    // test de la validité des données de la requette
    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value

            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // si le test est est échouer, arrète la méthode
    if (req.utilCheck) {
        return null
    }

    // récupère un objet utilisateur en fonction de son id
    await utilUser.getUserById(req.body.userId, req)
        .then(value => {
            // stock l'utilisateur dans la requette
            req.user = value

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variable traité pour la gestion d'erreur en dehors des middleware
    return req.user
}