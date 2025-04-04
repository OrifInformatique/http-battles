// import le schema d'un Player
const User = require("../../models/User")

// import fonctions util pour check
const utilCheck = require('../check')

// import bcrypte pour l'encryption
const bcrypt = require("bcrypt");

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/user/create"

/**
 * Crée un nouvel utilisateur et l'enregistre dans la base de donnée
 * 
 * @param {*}   obligatory: req.body.email
 * @param {*}   obligatory: req.body.password
 * @param {*}   obligatory: req.body.username
 * @param {*}   obligatory: req.body.firstname
 * @param {*}   obligatory: req.body.lastname
 * 
 * @returns                 req.body.user
 */
// crée un objet Game
exports.createUser = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createUser"

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
        return null
    }

    // initialise l'objet query qui sera la requete pour la base de donnée
    const query = {}

    // ajout les variables de la requete entrante au query si elle peuvent être utilisées
    if (req.body.email !== undefined) {
        var email = {
            "email": req.body.email
        }
        Object.assign(query, email)
    }

    if (req.body.password !== undefined) {

        // encrypte le mot de passe contenu dans la requete
        await bcrypt
            .hash(req.body.password, 10)
            // si tout se passe bien
            .then((hash) => {
                req.body.hash = hash

                req.data.push({
                    name: "bcrypt",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: hash
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

        var password = {
            "password": req.body.hash
        }
        Object.assign(query, password)
    }

    if (req.body.username !== undefined) {
        var username = {
            "username": req.body.username
        }
        Object.assign(query, username)
    }

    if (req.body.firstname !== undefined) {
        var firstname = {
            "firstname": req.body.firstname
        }
        Object.assign(query, firstname)
    }

    if (req.body.lastname !== undefined) {
        var lastname = {
            "lastname": req.body.lastname
        }
        Object.assign(query, lastname)
    }

    // crée un nouvel objet User
    const user = new User(query)

    // sauvegarde le User dans la base donnée
    await user.save()
        .then(value => {
            // stoque le User dans la requete
            req.body.user = value
            req.data.push({
                name: "user.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "user.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}