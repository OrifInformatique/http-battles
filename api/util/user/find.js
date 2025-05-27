// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

// import le schema d'un Player
const User = require("../../models/User")

// import fonctions util pour check
const utilCheck = require('../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/user/find"

/**
 * @param {*} optional  req.body.userId
 * @param {*} optional  req.body.email
 * @param {*} optional  req.body.password
 * @param {*} optional  req.body.firstname
 * @param {*} optional  req.body.lastname
 * 
 * @returns             req.body.users
 */
// crée un objet Player
exports.findUser = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: findUser"

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

    // initialise l'objet query qui sera la requete pour la base de donnée
    const query = {}

    // ajout les variables de la requete entrante au query si elle peuvent être utilisées
    if (req.body.userId !== undefined) {
        var userId = {
            "_id": mongoose.Types.ObjectId(req.body.userId)
        }
        Object.assign(query, userId)
    }

    if (req.body.email !== undefined) {
        var email = {
            "email": req.body.email
        }
        Object.assign(query, email)
    }

    if (req.body.password !== undefined) {
        var password = {
            "password": req.body.password
        }
        Object.assign(query, password)
    }

    if (req.body.username !== undefined) {
        var username = {
            "username": req.body.username
        }
        Object.assign(query, username)
    }

    if (req.body.lastname !== undefined) {
        var lastname = {
            "lastname": req.body.lastname
        }
        Object.assign(query, lastname)
    }
    
    // recherche les User correspondant au query
    await User.find(query)
        .then(value => {
            // stoque les User dans la requete
            req.body.users = value
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