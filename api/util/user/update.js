// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un User
const User = require("../../models/User")

// import fonctions util pour check
const utilCheck = require('../check')

// import bcrypte pour l'encryption
const bcrypt = require("bcrypt")

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/user/update"

/**
 * @param {*} obligatory    req.body.user
 * @param {*} obligatory    req.body.user._id 
 * @param {*} optional      req.body.email
 * @param {*} optional      req.body.password
 * @param {*} optional      req.body.username
 * @param {*} optional      req.body.firstname
 * @param {*} optional      req.body.lastname
 * 
 * @returns                 req.body.user
 */
// Update un objet User
exports.updateUser = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: updateUser"

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
    if (req.body.user === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No user"
        req.data.push({
            name: "req.body.user === undefined",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
        return null
    }

    if (req.body.user._id === undefined) {
        var error = new Error()
        error.name = "Bad Request"
        error.message = "No user._id "
        req.data.push({
            name: "req.body.user._id  === undefined",
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

    // Update le User dont l'id est donné en paramètre
    await User.updateOne({ _id: req.body.user._id }, {
        $set: query
    })
        .then(value => {
            // stoque l'information du résultat de l'update (pas le User)
            req.body.userUpdate = value
            req.data.push({
                name: "User.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "User.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // trouve le User dont l'id est donné en paramètre
    await User.find({ _id: req.body.user._id })
        .then(value => {
            // stoque le User dans la requete
            req.body.user = value[0]
            req.data.push({
                name: "User.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "User.find",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.body
}