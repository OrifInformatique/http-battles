// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');
// import le schema d'un utilisateur
const Log = require("../models/Log")

// import fonctions util pour board
const utilCheck = require('../util/check')

// import fonctions util pour game
const utilGameV2 = require('../util/game/find')

// import fonctions util pour game
const utilUserV2 = require('../util/user/find')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/log"


// crée un objet log
exports.logObjectCreation = async (log) => {

    // cée un objet de log
    const logObject = new Log({
        user: log.user,
        game: log.game,
        year: log.year,
        month: log.month,
        day: log.day,
        hour: log.hour,
        minute: log.minute,
        data: log.data
    })

    // retourne l'objet log
    return logObject
}

// enregistre un objet log dans la base de donnée
exports.logObjectSave = async (log) => {
    // enregistre le log dans la base données et retourn l'objet enregistré
    const savedLog = await log.save()

    // retourn l'objet enregistré
    return savedLog
}

// crée un objet log et l'enregistre dans la base donnée
exports.logToDatabase = async (log) => {

    // crée un objet log
    const createdLog = await this.logObjectCreation(log)

    // enregistre un objet log dans la base de donnée
    const savedLog = await this.logObjectSave(createdLog)

    // retourn l'objet enregistré
    return savedLog
}

exports.logInitFindUserAndGame = async (req) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logInitFindUserAndGame"

    // vérifie si la requete à déjà un package et en crée un si non
    if (req.package === undefined) {
        req.package = {}
    }

    if (req.auth === undefined) {
        req.auth = {}
    }

    // vérifie si la requete à un utilisateur
    if (req.auth.userId !== undefined) {
        req.body.userId = req.auth.userId

        // récupère les donnée utilisateur du client
        await utilUserV2.findUser(req)
            .then(value => {
                // stoque le client dans la requete
                req.package.user = value.users[0]
                req.user = value.users[0]

                req.data.push({
                    name: "utilUserV2.findUser",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilUserV2.findUser",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    if (req.body.gameIdV2 !== undefined) {
        req.body.gameId = req.body.gameIdV2
    }

    // vérifie si la requete contient l'id d'une partie
    if (req.body.gameId !== undefined) {
        // récupère les données de la partie
        await utilGameV2.findGame(req)
            .then(value => {
                // stoque la partie dans la requete
                req.package.game = req.body.games[0]
                req.game = req.body.games[0]

                req.data.push({
                    name: "middleGame.getGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "middleGame.getGame",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourn le package
    return req.package
}

exports.logDate = async (req) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logDate"

    // vérifie si la requete à déjà un package et en crée un si non
    if (req.package === undefined) {
        req.package = {}
    }

    // récupère la date de la requette et sotque ses différent élément dans différente variables
    req.package.date = new Date()
    req.package.year = req.package.date.getFullYear()
    req.package.month = req.package.date.getMonth() + 1
    req.package.day = req.package.date.getDate()
    req.package.hour = req.package.date.getHours()
    req.package.minute = req.package.date.getMinutes()

    // retourn le package
    return req.package
}

// construit le log
exports.logConstructor = async (req) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logConstructor"

    // crée le log
    req.log = {}

    // test si la requete a un body, si oui, l'ajoute au log
    if (req.body !== undefined) {
        req.log.body = req.body
    }

    // test si la requete a un utitlisateur, si oui, l'ajoute au log
    if (req.package.user !== undefined) {
        req.log.user = req.package.user
    }

    // test si la requete a une partie, si oui, l'ajoute au log
    if (req.package.game !== undefined) {
        req.log.game = req.package.game
    }

    // test si la requete a une date, si oui, l'ajoute à la requete
    if (req.package.date !== undefined) {
        req.log.date = req.package.date
    }

    // test si la requete a une année, si oui, l'ajoute à la requete
    if (req.package.year !== undefined) {
        req.log.year = req.package.year
    }

    // test si la requete a un mois, si oui, l'ajoute à la requete
    if (req.package.month !== undefined) {
        req.log.month = req.package.month
    }

    // test si la requete a un jour, si oui, l'ajoute à la requete
    if (req.package.day !== undefined) {
        req.log.day = req.package.day
    }

    // test si la requete a une heure, si oui, l'ajoute à la requete
    if (req.package.hour !== undefined) {
        req.log.hour = req.package.hour
    }

    // test si la requete a une minute, si oui, l'ajoute à la requete
    if (req.package.hour !== undefined) {
        req.log.minute = req.package.minute
    }

    // test si la requete a des données, si oui, les ajoute à la requete
    if (req.data !== undefined) {
        req.log.data = req.data.slice()
    }
}

// list les logs dans la base donées
exports.listLogs = async (req) => {
    // crée un objet user
    var user = {}
    // crée un objet game
    var game = {}
    // crée un objet query qui servira à faire une requette pour la base de données
    var query = {}

    // test si l'id d'un log spécifique est demandé par le biais de son id
    if (req.body.logId !== undefined) {
        // si oui, l'ajoute au query en traduisan l'id en object id qui sera reconu par la base de donnée et en l'ajoutant au query
        var logId = {
            "_id": mongoose.Types.ObjectId(req.body.logId)
        }
        Object.assign(query, logId)
    }

    // test si les log d'un utilisateur particulier son demander par le biais de son id
    if (req.auth.userId !== undefined) {
        // si oui, l'ajoute au query en traduisan l'id en object id qui sera reconu par la base de donnée et en l'ajoutant au query
        user.userId = {
            "user._id": mongoose.Types.ObjectId(req.auth.userId)
        }
        Object.assign(query, user.userId)
    }

    // test si les log d'un utilisateur ayant un email particulier son demandé
    if (req.body.email !== undefined) {
        // stoque la l'email dans un objet
        user.email = {
            "user.email": req.body.email
        }
        // ajoute le contenu de l'objet au query
        Object.assign(query, user.email)
    }

    // test si le client demand les log d'un utilisateur avec un mot de pass particulier
    if (req.body.password !== undefined) {
        // stoque la requet pour la base de donnée dans un objet
        user.password = {
            "user.password": req.body.password
        }
        // asigne le contenu de l'objet au query
        Object.assign(query, user.password)
    }

    // test si le client recherche les log d'un utilisateur avec un username particulier
    if (req.body.username !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        user.username = {
            "user.username": req.body.username
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, user.username)
    }

    // test si le client demande les log d'un utilisateur avec un prénom particuliert
    if (req.body.firstname !== undefined) {
        // stoque la reque t pour la base de données dans un objet
        user.firstname = {
            "user.firstname": req.body.firstname
        }
        // ajoute le contenu de l'object au query
        Object.assign(query, user.firstname)
    }

    // test si le client veut les log d'un utilisateur avec un nom particulier
    if (req.body.lastname !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        user.lastname = {
            "user.lastname": req.body.lastname
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, user.lastname)
    }

    // test si le client veut les log pour une partie particulières par le biais de son id
    if (req.body.gameId !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        game.gameId = {
            "game._id": mongoose.Types.ObjectId(req.body.gameId)
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, game.gameId)
    }

    // test si le client veut les log pour une partie ave un état particulier
    if (req.body.status !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        game.status = {
            "game.status": req.body.status
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, game.status)
    }

    // test si le client veut les log pour une partie avec un créateur particulier par le bias de son id
    if (req.body.creatorId !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        game.creatorId = {
            "game.creatorId": req.body.creatorId
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, game.creatorId)
    }

    // test si le client veut les log d'une année particulière
    if (req.body.year !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var year = {
            "year": req.body.year
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, year)
    }

    // test si le client veut les log d'un mois particulier
    if (req.body.month !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var month = {
            "month": req.body.month
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, month)
    }

    // test si le client veut les log d'un jours particulier
    if (req.body.day !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var day = {
            "day": req.body.day
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, day)
    }

    // test si le client veut les log d'une heure particulière
    if (req.body.hour !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var hour = {
            "hour": req.body.hour
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, hour)
    }

    // test si le client veut les log d'une minutes particulière
    if (req.body.minute !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var minute = {
            "minute": req.body.minute
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, minute)
    }

    // récupère les log de la base de données avec le query
    const logs = await Log.find(query)
    // initialise le message à renvoyer au client
    var logMessage = {}

    // intitialise une variable d'incrementation
    var i = 0
    // parcour la liste de log
    for (const log of logs) {
        // intitialise une seconde variable d'incrementation
        var j = 0
        // initialise une variable ou stoquer les log après filtre
        var newLog = {}

        // test si une partie est associé au log, si non, crée une partie et la remplie d'information vide
        if (log.game === undefined || log.game === null) {
            log.game = {}
            log.game._id = "none"
            log.game.status = "none"
            log.game.creatorId = "none"
        }

        // test si un utilisateur est associé au log, si non, crée un utilisateur et le remplie d'information vide
        if (log.user === undefined || log.user === null) {
            log.user = {}
            log.user._id = "none"
            log.user.email = "none"
            log.user.password = "none"
            log.user.username = "none"
            log.user.firstname = "none"
            log.user.lastname = "none"
        }

        // test si le client demande les donnée et que le log de cette boucle contient des donnée
        if (req.body.data !== undefined && log.data !== undefined) {
            // crée un log correspondant à cette boucle avec les information reçu de la base de donnée
            newLog[i] = {
                logId: log._id,
                reqParam: log.reqParam,
                reqBody: log.reqBody,
                userId: log.user._id,
                userEmail: log.user.email,
                userPassword: log.user.password,
                userUsername: log.user.username,
                userFirstname: log.user.firstname,
                userLastname: log.user.lastname,
                gameId: log.game._id,
                gameCreatorId: log.game.creatorId,
                gameStatus: log.game.status,
                logYear: log.year,
                logMonth: log.month,
                logDay: log.day,
                logHour: log.hour,
                logMinute: log.minute
            }
            // initialise les donnée pour ce log
            newLog[i].data = {}

            // parcoure les donnée du log 
            for (const d of log.data) {

                // si le client demande une information de tri spécifique pour ces données
                if (req.body.data.name !== undefined || req.body.data.loc !== undefined || req.body.data.value !== undefined || req.body.data.error !== undefined) {
                    // si le client demande un une part de nom qui est inclut dans la donnée
                    if (req.body.data.name !== undefined && d.name !== undefined && d.name.toUpperCase().includes(req.body.data.name.toUpperCase())) {
                        // stoque la donnée
                        newLog[i].data[j] = d
                        // si le client demand une part de location qui est inclut dans la donnée
                    } else if (req.body.data.loc !== undefined && d.loc !== undefined && d.loc.toUpperCase().includes(req.body.data.loc.toUpperCase())) {
                        // stoque la donnée
                        newLog[i].data[j] = d
                        // si le client demande une part de valeur inclu dans la donnée 
                    } else if (req.body.data.value !== undefined && d.value !== undefined && JSON.stringify(d.value).toUpperCase().replace("{", "").replace("}", "").replace(/"/g, "").includes(JSON.stringify(req.body.data.value).toUpperCase().replace("{", "").replace("}", "").replace(/"/g, ""))) {
                        // stoque la donnée
                        newLog[i].data[j] = d

                        // si le client demande une part d'erreur inclut dans la donnée
                    } else if (req.body.data.error !== undefined && d.error !== undefined && JSON.stringify(d.error).toUpperCase().replace("{", "").replace("}", "").replace(/"/g, "").includes(JSON.stringify(req.body.data.error).toUpperCase().replace("{", "").replace("}", "").replace(/"/g, ""))) {
                        // stoque la donnée
                        newLog[i].data[j] = d
                    }
                } else {
                    // stoque la donnée
                    newLog[i].data[j] = d
                }
                // incremente la seconde variable d'incrementation
                j = j + 1
            }
        } else {
            // construit le log sans les données
            newLog[i] = {
                logId: log._id,
                reqParam: log.reqParam,
                reqBody: log.reqBody,
                userId: log.user._id,
                userEmail: log.user.email,
                userPassword: log.user.password,
                userUsername: log.user.username,
                userFirstname: log.user.firstname,
                userLastname: log.user.lastname,
                gameId: log.game._id,
                gameCreatorId: log.game.creatorId,
                gameStatus: log.game.status,
                logYear: log.year,
                logMonth: log.month,
                logDay: log.day,
                logHour: log.hour,
                logMinute: log.minute
            }
        }
        // ajoute le log dans le message à envoyer au client
        Object.assign(logMessage, newLog)
        // incremente la première variable d'incrementation
        i = i + 1
    }
    // retourn le message à envoyer au client
    return logMessage
}

// list les logs dans la base donées
exports.listLogsV3 = async (req) => {
    // crée un objet query qui servira à faire une requette pour la base de données
    var query = {}

    query = this.logCreateQuery(req.body, query)

    // récupère les log de la base de données avec le query
    const logs = await Log.find(query)

    var logMessage = logs

    logMessage = this.logFilterLoopUseless(req.body, logMessage)



    logMessage = this.logFilterLoopSize(logMessage)

    // retourn le message à envoyer au client
    return logMessage
}

/**
 * Fbrique le query pour la bdd
 * @param {*} object 
 * @param {*} query 
 * @param {*} key 
 * @returns query
 */
exports.logCreateQuery = (object, query, key) => {
    // parcour la requette
    for (const champ in object) {
        // test si le champ de la requette n'est pas un object (id excepted)
        if (!(typeof object[champ] === "object" && champ !== "_id")) {
            // test si la clef est défini
            if (key !== undefined) {
                // ajoute le champ à la clef
                key = key + "." + champ
                // ajout le regex de la requette au query pour la clef
                query[key] = new RegExp(object[champ], "i")
            } else {
                // ajoute le contenu de la requette (id) au query pour se champ
                query[champ] = object[champ]
            }

        } else {
            // test si la clef exist
            if (key !== undefined) {
                // si oui y ajoute le champ
                key = key + "." + champ
                // rentre le resultat de la fonction appeler de manière récursive avec la clef comme clef dans le query
                query = this.logCreateQuery(object[champ], query, key)
            } else {
                // rentre le resultat de la fonction appeller de manière récursive avec le cham comme clef dans le query
                query = this.logCreateQuery(object[champ], query, champ)
            }
        }
    }

    // retourn le query
    return query
}

/**
 * Filter useless informations from the result sent from the database
 * @param {*} reqObject 
 * @param {*} logObject 
 * @returns newLogObject
 */
exports.logFilterLoopUseless = (reqObject, logObject) => {
    // variable dans laquel les informations utiles serons stoquée
    var newLogObject = {}

    // boucle de parcoure de la requette
    for (const ro in reqObject) {
        // boucle du parcours du log
        for (const lo in logObject) {
            // test si la clefs est numérique
            if (parseInt(lo).toString() !== "NaN") {
                // si non relance la fonction de manière récursive (elle s'appel elle-même) pour le contenu de la en tant qu'objet log à parcourir et stoque le résultat dans une variable
                var payout = this.logFilterLoopUseless(reqObject, logObject[lo])
                // si la variable à un contenu le stoque dans le nouvel objet
                if (payout !== undefined) {
                    newLogObject[lo] = payout
                }
            // test si la clef de la requet et celle du log sont les même
            } else if (lo === ro) {
                // test si la clef du log est un  id
                if (lo === "_id") {
                    // test si l'id du log est le même que celui de la requette
                    if (logObject[lo].toString() === reqObject[ro]) {
                        // incorpore une version string de l'id aux nouvelle objet
                        newLogObject[lo] = logObject[lo].toString()
                        // parcour le log
                        for (const fill in logObject) {
                            // test pour voir si le contenu du log est soit un string ou un nombre
                            if (typeof logObject[fill] !== "object" &&
                                (typeof logObject[fill] === "string" || typeof logObject[fill] === "number") &&
                                fill !== "id"
                            ) {
                                // atribue le contenu du log à l'objet
                                newLogObject[fill] = logObject[fill]
                            }
                        }
                    }
                // test si le contenu du log et de la requete sont des objet
                } else if (typeof logObject[lo] === "object" && typeof reqObject[ro] === "object") {
                    // test si l'object à des clefs
                    if (Object.keys(reqObject[ro]).length === 0) {
                        // atribue le contenu de l'object au nouvel object
                        newLogObject[lo] = logObject[lo]
                    } else {
                        // stoque le resultat de la fonction appeler de manière récursive avec un degré d'abstraction supplementaire dans une variable
                        var payout = this.logFilterLoopUseless(reqObject[ro], logObject[lo])
                        // test si la variable est vide
                        if (payout !== undefined) {
                            // ajout la variable au nouvelle objet
                            newLogObject[lo] = payout
                            // parcour le log
                            for (const fill in logObject) {
                                // test pour voir si le contenu du log est soit un string ou un nombre
                                if (typeof logObject[fill] !== "object" &&
                                    (typeof logObject[fill] === "string" || typeof logObject[fill] === "number") &&
                                    fill !== "id"
                                ) {
                                    // atribue le contenu du log à l'objet
                                    newLogObject[fill] = logObject[fill]
                                }
                            }
                        }
                    }
                // test ni la requet ni le log ne sont des objects
                } else if (!(typeof logObject[lo] === "object" || typeof reqObject[ro] === "object")) {
                    if (logObject[lo].toString().toUpperCase().includes(reqObject[ro].toString().toUpperCase())) {
                        // parcour le log
                        for (const fill in logObject) {
                            // test pour voir si le contenu du log est soit un string ou un nombre
                            if (typeof logObject[fill] !== "object" &&
                                (typeof logObject[fill] === "string" || typeof logObject[fill] === "number")
                            ) {
                                // atribue le contenu du log à l'objet
                                newLogObject[fill] = logObject[fill]
                            }
                        }

                    }
                }
            }
        }

    }
    // test si le nouvelle object est vide de clefs
    if (Object.keys(newLogObject).length === 0) {
        // si oui le détruit
        newLogObject = undefined
    }

    // retourn le nouvelle object
    return newLogObject
}



/**
 * filter entry to limit their size
 * @param {*} objectList 
 * @param {*} depth 
 * @returns objectList
 */
exports.logFilterLoopSize = (objectList, depth) => {

    if (depth === undefined) {
        var depth = 0
    }

    depth = depth + 1

    const MAX_SIZE = 5
    var i = 0


    if (objectList !== undefined &&
        objectList !== null &&
        typeof objectList === "object") {

        i = objectList.length

        while (i > MAX_SIZE) {
            objectList.pop()
            i--
        }

        if (depth < 5) {
            for (const item in objectList) {
                objectList[item] = this.logFilterLoopSize(objectList[item], depth)
            }
        }

    }

    return objectList
}

// list les logs dans la base donées
exports.listLogsV2 = async (req) => {
    // crée un objet query qui servira à faire une requette pour la base de données
    var query = {}

    // test si l'id d'un log spécifique est demandé par le biais de son id
    if (req.body._id !== undefined) {
        // si oui, l'ajoute au query en traduisan l'id en object id qui sera reconu par la base de donnée et en l'ajoutant au query
        var logId = {
            "_id": mongoose.Types.ObjectId(req.body._id)
        }
        Object.assign(query, logId)
    }


    if (req.body.user !== undefined) {

        // test si les log d'un utilisateur particulier son demander par le biais de son id
        if (req.body.user._id !== undefined) {
            // si oui, l'ajoute au query en traduisan l'id en object id qui sera reconu par la base de donnée et en l'ajoutant au query
            var userId = {
                "user._id": mongoose.Types.ObjectId(req.body.user._id)
            }
            Object.assign(query, userId)
        }

        // test si les log d'un utilisateur ayant un email particulier son demandé
        if (req.body.user.email !== undefined) {
            var re = new RegExp(req.body.user.email, "i")
            // stoque la l'email dans un objet
            var userEmail = {
                "user.email": re
            }
            // ajoute le contenu de l'objet au query
            Object.assign(query, userEmail)
        }

        // test si le client demand les log d'un utilisateur avec un mot de pass particulier
        if (req.body.user.password !== undefined) {
            var re = new RegExp(req.body.user.password, "i")
            // stoque la requet pour la base de donnée dans un objet
            var userPassword = {
                "user.password": re
            }
            // asigne le contenu de l'objet au query
            Object.assign(query, userPassword)
        }

        // test si le client recherche les log d'un utilisateur avec un username particulier
        if (req.body.user.username !== undefined) {
            var re = new RegExp(req.body.user.username, "i")
            // stoque la requete pour la base de donnée dans un objet
            var userUsername = {
                "user.username": re
            }
            // stoque le contenu de l'objet dans le query
            Object.assign(query, userUsername)
        }

        // test si le client demande les log d'un utilisateur avec un prénom particuliert
        if (req.body.user.firstname !== undefined) {
            var re = new RegExp(req.body.user.firstname, "i")
            // stoque la reque t pour la base de données dans un objet
            var userFirstname = {
                "user.firstname": re
            }
            // ajoute le contenu de l'object au query
            Object.assign(query, userFirstname)
        }

        // test si le client veut les log d'un utilisateur avec un nom particulier
        if (req.body.user.lastname !== undefined) {
            var re = new RegExp(req.body.user.lastname, "i")
            // stoque la requete pour la base de donnée dans un objet
            var userLastname = {
                "user.lastname": re
            }
            // stoque le contenu de l'objet dans le query
            Object.assign(query, userLastname)
        }
    }

    if (req.body.game !== undefined) {

        // test si le client veut les log pour une partie particulières par le biais de son id
        if (req.body.game._id !== undefined) {
            // stoque la requete pour la base de donnée dans un objet
            var gameId = {
                "game._id": mongoose.Types.ObjectId(req.body.game._id)
            }
            // stoque le contenu de l'objet dans le query
            Object.assign(query, gameId)
        }

        // test si le client veut les log pour une partie ave un état particulier
        if (req.body.game.status !== undefined) {
            var re = new RegExp(req.body.game.status, "i")
            // stoque la requete pour la base de donnée dans un objet
            var gameStatus = {
                "game.status": re
            }
            // stoque le contenu de l'objet dans le query
            Object.assign(query, gameStatus)
        }

        // test si le client veut les log pour une partie avec un créateur particulier par le bias de son id
        if (req.body.game.creatorId !== undefined) {
            // stoque la requete pour la base de donnée dans un objet
            var gameCreatorId = {
                "game.creatorId": req.body.game.creatorId
            }
            // stoque le contenu de l'objet dans le query
            Object.assign(query, gameCreatorId)
        }
    }

    // test si le client veut les log d'une année particulière
    if (req.body.year !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var year = {
            "year": req.body.year
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, year)
    }

    // test si le client veut les log d'un mois particulier
    if (req.body.month !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var month = {
            "month": req.body.month
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, month)
    }

    // test si le client veut les log d'un jours particulier
    if (req.body.day !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var day = {
            "day": req.body.day
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, day)
    }

    // test si le client veut les log d'une heure particulière
    if (req.body.hour !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var hour = {
            "hour": req.body.hour
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, hour)
    }

    // test si le client veut les log d'une minutes particulière
    if (req.body.minute !== undefined) {
        // stoque la requete pour la base de donnée dans un objet
        var minute = {
            "minute": req.body.minute
        }
        // stoque le contenu de l'objet dans le query
        Object.assign(query, minute)
    }

    // test ce que le client veut
    if (req.body.data !== undefined) {
        // test ce que le client veut
        if (req.body.data.name !== undefined) {
            var re = new RegExp(req.body.data.name, "i")
            // stoque la requete pour la base de donnée dans un objet
            var dataName = {
                "data.name": re
            }

            // stoque le contenu de l'objet dans le query
            Object.assign(query, dataName)
        }

        // test ce que le client veut
        if (req.body.data.loc !== undefined) {
            var re = new RegExp(req.body.data.loc, "i")
            // stoque la requete pour la base de donnée dans un objet
            var dataLoc = {
                "data.loc": re
            }
            // stoque le contenu de l'objet dans le query
            Object.assign(query, dataLoc)
        }

    }

    // récupère les log de la base de données avec le query
    const logs = await Log.find(query)

    // initialise le message à renvoyer au client
    var logMessage = {}

    // boucle parcourant la liste de log reçu de la base de donnée
    for (const log in logs) {

        // initialisation du log à ajouter au message
        var newLog = {}

        // application des variables constantes du log
        newLog._id = logs[log]._id
        newLog.user = logs[log].user
        newLog.game = logs[log].game
        newLog.year = logs[log].year
        newLog.month = logs[log].month
        newLog.day = logs[log].day
        newLog.hour = logs[log].hour
        newLog.minute = logs[log].minute

        // test si la requete demande des données, si oui commence le processus de filtrage et d'insertion 
        if (req.body.data !== undefined) {
            // intialise le champ qui acceuillera les données dans cette instance de log réponse
            newLog.data = {}

            // parcours les données de l'instance de log reçu de cette boucle
            for (const logData in logs[log].data) {
                // initialise le champ qui acceuillera cette instance de donnée dans la réponse
                newLog.data[logData] = {}

                // copie les l'instance de donnée du log reçu dans la copie qui sera transmit aux client
                Object.assign(newLog.data[logData], logs[log].data[logData])

                /* test si: la requete spécifie le nom des données reçu
                            si cette instance de donnée reçu à un nom
                            si le nom de cette donnée ne contient PAS celui demandé par la requete
                                mis en majuscule pour éviter les problème de capitalisation
                            
                le but est d'isoler les données invalides qui ne corresponde pas à la demande de la requete et de les effacer
                */
                if (req.body.data.name !== undefined
                    && logs[log].data[logData].name !== undefined
                    && !logs[log].data[logData].name.toUpperCase().includes(req.body.data.name.toUpperCase())
                ) {
                    // si oui efface cette donnée
                    newLog.data[logData] = undefined
                    /* test si: la requete spécifie la localisation de cette donnée
                                si cette donnée à une localisation
                                si la localisation de cette donnée ne contient PAS celui de la requete 
                                    mis en majuscule pour éviter les problème de capitalisation
                    
                    le but est d'isoler les données invalides qui ne corresponde pas à la demande de la requete et de les effacer
                    */
                } else if (req.body.data.loc !== undefined
                    && logs[log].data[logData].loc !== undefined
                    && !logs[log].data[logData].loc.toUpperCase().includes(req.body.data.loc.toUpperCase())
                ) {
                    // si oui efface cette donnée
                    newLog.data[logData] = undefined
                    /* test:    si la requete demande la valeur associé à cette donnée (peut être une liste de valeur)
                                si l'instance de donnée reçu à une valeur
                    */
                } else if (req.body.data.value !== undefined
                    && logs[log].data[logData].value !== undefined
                ) {
                    // si oui initialise la valeur de cette donnée dans la réponse
                    newLog.data[logData].value = {}

                    // test si la valeur de cette donnée est un objet
                    if (typeof logs[log].data[logData].value === "object"
                    ) {
                        // si oui, parcours cette valeur dans les données reçu champ après champ (normalment il s'agit d'un objet sous form de list et chaque champ est un nombre sous format string)
                        for (const logValue in logs[log].data[logData].value) {
                            // initialise la donnée de ce champ
                            newLog.data[logData].value[logValue] = {}

                            // crée une copie de la donnée de ce champ
                            Object.assign(newLog.data[logData].value[logValue], logs[log].data[logData].value[logValue])

                            // parcour les champs de cette donnée
                            for (const logValueKey in logs[log].data[logData].value[logValue]) {

                                /*
                                Test:   si ce champ pour cette valeur est demandée dans la requette
                                        si ce champ pour cette donnée exist
                                        si la valeur de ce champ ne contient PAS ce qui est demandé dans la requette
                                            tout en majuscule pour éviter le erreurs de capitalisation
                                            tout en string pour s'assurer que les donnée soit d'un type qui puisse être comparé
 
                                le bute est d'isoler ce qui n'est pas demandé par la requete et de l'effacer
                                */
                                if (req.body.data.value[logValueKey] !== undefined
                                    && logs[log].data[logData].value[logValue][logValueKey] !== undefined
                                    && !logs[log].data[logData].value[logValue][logValueKey].toString().toUpperCase().includes(req.body.data.value[logValueKey].toString().toUpperCase())
                                ) {
                                    // si oui, efface la valeur
                                    newLog.data[logData].value[logValue] = undefined
                                }
                            }
                        }
                        /* si la valeur reçu n'est pas un objet test si la valeur de la requete a un champ
                        
                        le but est de filtrer les valeurs qui ne sont pas des objet quand des objets sont demandés
                        */
                    } else {
                        // si non atribue la valeur récupérée à la réponse 
                        newLog.data[logData].value = logs[log].data[logData].value
                    }

                    /* test si la valeur de la requete n'est PAS du même type que celle de la données reçu
                    
                    le bute est de filtrer les valeur qui ne corresponde pas à la requete
                    */
                    if (typeof req.body.data.value !== typeof logs[log].data[logData].value) {
                        // si oui, effave la valeur
                        newLog.data[logData].value = undefined
                    }

                    /*
                    si non test:    si la requete demande les erreurs contenu dans les donnée
                                    si la donnée reçu contient des erreurs
                                    si ce que demande la requette n'est pas contenu dans la donnée reçue
                                        tout en majuscule pour éviter les erreur de capitalisation
    
                    le bute est de filtrer les erreurs qui ne sont pas demandé par la requete
                    */
                } else if (req.body.data.error !== undefined
                    && logs[log].data[logData].error !== undefined
                    && !logs[log].data[logData].error.toUpperCase().includes(req.body.data.error.toUpperCase())
                ) {
                    // si oui efface l'erreur dans la réponse
                    newLog.data[logData].error = undefined
                    /* si non test si la requete ne demande pas de valeur
                    
                    le but est de filtrer les valeurs si elle ne sont pas demandée pour allèger la réponse
                    */
                } else if (req.body.data.value === undefined) {
                    //si oui efface la valeur de la réponse
                    newLog.data[logData].value = undefined
                    /* si non test si la requete ne demande pas d'erreur
                    
                    le but est de filtrer les erreurs si elle ne sont pas demandée pour allèger la réponse
                    */
                } else if (req.body.data.error === undefined) {
                    // si oui, efface l'erreur de la réponse
                    newLog.data[logData].error = undefined
                }

                /* test si cette instance de donnée de la réponse n'exist pas
                
                le but est de créé une valeur tampons pour que les tests suivant ne lance pas d'erreur en testant des valeurs qui n'exist pas
                */
                if (newLog.data[logData] === undefined) {
                    // si oui, l'initialise
                    newLog.data[logData] = {}
                }

                /*
                test:   (si la valeur pour cette instance de donnée dans la réponse n'existe PAS
                        et
                        si l'erreur pour cette instance de donnée n'exist PAS)
                        et
                        (si la valeur de cette instance de donnée est demandé par la requette
                        ou
                        si l'erreur de cette instance de donnée est demandée par la requette)
 
                Le bute est d'isoler et effacer les instance de données vides qui sont demandé par la requette et donc pas supprimer afin d'améliorée la lisibilité et réduire la taille de la réponse
                */
                if ((newLog.data[logData].value === undefined
                    && newLog.data[logData].error === undefined)
                    && (req.body.data.value !== undefined
                        || req.body.data.error !== undefined
                    )
                ) {
                    // si oui, efface la donnée
                    newLog.data[logData] = undefined
                    // si non, test si cette instance de donnée dans la réponse n'as PAS de champ
                } else if (Object.keys(newLog.data[logData]).length === 0) {
                    // si oui, supprime cette instance de donnée
                    newLog.data[logData] = undefined
                }
            }

            // initialise une variable de test comme fausse
            var test = false

            // parcour les données envoyées comme réponse 
            for (const d in newLog.data) {
                // test si n'importe laquel de ces instances de donnée existe
                if (newLog.data[d] !== undefined) {
                    // si oui, change le test comme vrai
                    test = true
                }
            }

            // si le test est faux
            if (!test) {
                // suprime le log de réponse
                newLog = undefined
            }

        }
        // stoque le log dans le message de réponse
        logMessage[log] = newLog
    }


    // retourn le message à envoyer au client
    return logMessage
}

