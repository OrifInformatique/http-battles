// import fonctions util 
const utilFindUser = require('../util/user/find')

// import fonctions util 
const utilCreatedUser = require('../util/user/create')

// import fonctions util 
const utilCheck = require('../util/check')

// import bcrypte pour l'encryption
const bcrypt = require("bcrypt")

// import jsonwebtoken pour fabriquer des token
const jwt = require("jsonwebtoken")

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../middleware/user"

/**
 * trouve des utilisateur
 * 
 * @returns                 req.body.game
 */
exports.findUser = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: endGame"

    // test de la validité des données
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

    // trouve une list d'utilisateur
    await utilFindUser.findUser(req)
        .then(value => {
            req.data.push({
                name: "utilFindUser.findUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilFindUser.findUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.body
}

/**
 * crée et enregistre un utilisateur
 * 
 * @param {*}   obligatory: req.body.email
 * @param {*}   obligatory: req.body.password
 * @param {*}   obligatory: req.body.username
 * @param {*}   obligatory: req.body.firstname
 * @param {*}   obligatory: req.body.lastname
 * 
 * @returns                 req.body.user
 */
exports.signup = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: signup"

    // test de la validité des données
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

    // test les données. Retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.email === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No email"
        req.data.push({
            name: "req.body.email === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    if (req.body.password === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No password"
        req.data.push({
            name: "req.body.password === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    if (req.body.username === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No username"
        req.data.push({
            name: "req.body.username === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    if (req.body.firstname === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No firstname"
        req.data.push({
            name: "req.body.firstname === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    if (req.body.lastname === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No lastname"
        req.data.push({
            name: "req.body.lastname === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    // crée et enregistre un utilisateur
    await utilCreatedUser.createUser(req)
        .then(value => {
            req.data.push({
                name: "utilCreatedUser.createUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreatedUser.createUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.body
}

/**
 * log un utilisateur
 * 
 * @param {*}   obligatory: req.body.email
 * @param {*}   obligatory: req.body.password
 * 
 * @returns                 req.body.answer
 */
exports.login = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: login"

    // test de la validité des données
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

    // test les données. Retourne une erreur et met fin à la fonction si la elle n'existe pas
    if (req.body.email === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No email"
        req.data.push({
            name: "req.body.email === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    if (req.body.password === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No password"
        req.data.push({
            name: "req.body.password === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    // crée une copie du mot de passe dans la requete
    req.body.savePassword = req.body.password

    // suprime le mot de pass afin de le retirer de la recherche (les mot de pass dans la base de donnée sont hasher donc garer l'originel ne retournerais rien)
    req.body.password = undefined

    // trouve l'utilisateur
    await utilFindUser.findUser(req)
        .then(value => {
            //stoque l'utilisateur trouvé dans la requette
            req.body.user = req.body.users[0]
            req.data.push({
                name: "utilCreatedUser.findUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreatedUser.findUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        next()
        return null
    }

    // restaure le mot de passe de la requete dans la variable
    req.body.password = req.body.savePassword

    // compare le mot de passe du client et le mot de passe du profil utilisateur
    await bcrypt
        .compare(req.body.password, req.body.user.password)
        // si tout se passe bien
        .then((valid) => {
            req.body.valid = valid
            req.data.push({
                name: "bcrypt",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: valid
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "bcrypt",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la combinaison email mot de pass est bonne. met fin à la methode si non
    if (!req.body.valid) {
        var error = new Error()
        error.name = "Unauthorized "
        error.message = "Paire login/mot de passe incorrecte"
        req.data.push({
            name: "!req.body.valid",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        next()
        return null
    }

    // crée la réponse avec un token valide 24h
    req.body.answer = {
        // l'id utilisateur
        userId: req.body.user._id,
        // un token qui contient
        token: jwt.sign(
            // l'id utilisateur
            { userId: req.body.user._id },
            // une clef de hashage
            "RANDOM_TOKEN_SECRET",
            // une periode de validité
            { expiresIn: "24h" }
        )
    }

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.body
}