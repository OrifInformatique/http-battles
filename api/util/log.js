// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');
// import le schema d'un utilisateur
const Log = require("../models/Log")

// import fonctions contenu dans middleware/game
const middleGame = require('../middleware/game')

// import fonctions util pour board
const utilCheck = require('../util/check')

// import fonctions util pour user
const utilUser = require('../util/user')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/log"

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

    return logObject
}

exports.logObjectSave = async (log) => {

    const savedLog = await log.save()

    return savedLog
}

exports.logToDatabase = async (log) => {

    const createdLog = await this.logObjectCreation(log)

    const savedLog = await this.logObjectSave(createdLog)

    return savedLog
}

exports.logInitFindUserAndGame = async (req) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logInitFindUserAndGame"

    if(req.package === undefined){
        req.package = {}
    }

    if (req.auth.userId !== undefined) {
        // récupère les donnée utilisateur du client
        await utilUser.getUserById(req.auth.userId, req)
            .then(value => {
                req.user = value
                req.package.user = value

                req.data.push({
                    name: "utilUser.getUserById",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilUser.getUserById",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    if (req.body.gameId !== undefined) {
        // récupère les données de la partie
        await middleGame.getGame(req)
            .then(value => {
                req.game = value
                req.package.game = value

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

    return req.package
}

exports.logDate = async (req) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logDate"

    if(req.package === undefined){
        req.package = {}
    }

    // récupère la date de la requette et sotque ses différent élément dans différente variables
    req.package.date = new Date()
    req.package.year = req.package.date.getFullYear()
    req.package.month = req.package.date.getMonth() + 1
    req.package.day = req.package.date.getDate()
    req.package.hour = req.package.date.getHours() + 1
    req.package.minute = req.package.date.getMinutes() + 1

    return req.package
}

exports.logConstructor = async (req) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logConstructor"


    req.log = {}

    if (req.body !== undefined) {
        req.log.body = req.body
    }

    if (req.package.user !== undefined) {
        req.log.user = req.package.user
    }

    if (req.package.game !== undefined) {
        req.log.game = req.package.game
    }

    if (req.package.date !== undefined) {
        req.log.date = req.package.date
    }

    if (req.package.year !== undefined) {
        req.log.year = req.package.year
    }

    if (req.package.month !== undefined) {
        req.log.month = req.package.month
    }

    if (req.package.day !== undefined) {
        req.log.day = req.package.day
    }

    if (req.package.hour !== undefined) {
        req.log.hour = req.package.hour
    }

    if (req.package.hour !== undefined) {
        req.log.minute = req.package.minute
    }

    if (req.data !== undefined) {
        req.log.data = req.data.slice()
    }
}

exports.listLogs = async (req) => {
    var user = {}
    var game = {}
    var query = {}

    if (req.body.logId !== undefined) {
        var logId = {
            "_id": mongoose.Types.ObjectId(req.body.logId)
        }
        Object.assign(query, logId)
    }

    if (req.auth.userId !== undefined) {
        user.userId = {
            "user._id": mongoose.Types.ObjectId(req.auth.userId)
        }
        Object.assign(query, user.userId)
    }

    if (req.body.email !== undefined) {
        user.email = {
            "user.email": req.body.email
        }
        Object.assign(query, user.email)
    }

    if (req.body.password !== undefined) {
        user.password = {
            "user.password": req.body.password
        }
        Object.assign(query, user.password)
    }

    if (req.body.username !== undefined) {
        user.username = {
            "user.username": req.body.username
        }
        Object.assign(query, user.username)
    }

    if (req.body.firstname !== undefined) {
        user.firstname = {
            "user.firstname": req.body.firstname
        }
        Object.assign(query, user.firstname)
    }

    if (req.body.lastname !== undefined) {
        user.lastname = {
            "user.lastname": req.body.lastname
        }
        Object.assign(query, user.lastname)
    }

    if (req.body.gameId !== undefined) {
        game.gameId = {
            "game._id": mongoose.Types.ObjectId(req.body.gameId)
        }
        Object.assign(query, game.gameId)
    }

    if (req.body.state !== undefined) {
        game.state = {
            "game.state": req.body.state
        }
        Object.assign(query, game.state)
    }

    if (req.body.createurId !== undefined) {
        game.createurId = {
            "game.createurId": req.body.createurId
        }
        Object.assign(query, game.createurId)
    }

    if (req.body.challengerId !== undefined) {
        game.challengerId = {
            "game.challengerId": req.body.challengerId
        }
        Object.assign(query, game.challengerId)
    }

    if (req.body.year !== undefined) {
        var year = {
            "year": req.body.year
        }
        Object.assign(query, year)
    }

    if (req.body.month !== undefined) {
        var month = {
            "month": req.body.month
        }
        Object.assign(query, month)
    }

    if (req.body.day !== undefined) {
        var day = {
            "day": req.body.day
        }
        Object.assign(query, day)
    }

    if (req.body.hour !== undefined) {
        var hour = {
            "hour": req.body.hour
        }
        Object.assign(query, hour)
    }

    if (req.body.minute !== undefined) {
        var minute = {
            "minute": req.body.minute
        }
        Object.assign(query, minute)
    }


    const logs = await Log.find(query)
    var logMessage = {}
    var i = 0

    for (const log of logs) {
        var j = 0
        var newLog = {}
        if (log.game === undefined || log.game === null) {
            log.game = {}
            log.game._id = "none"
            log.game.state = "none"
            log.game.createurId = "none"
            log.game.challengerId = "none"
        }
        if (log.user === undefined || log.user === null) {
            log.user = {}
            log.user._id = "none"
            log.user.email = "none"
            log.user.password = "none"
            log.user.username = "none"
            log.user.firstname = "none"
            log.user.lastname = "none"
        }
        if (req.body.data !== undefined && log.data !== undefined) {
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
                gameState: log.game.state,
                gameCreateurId: log.game.createurId,
                gameChallengerId: log.game.challengerId,
                logYear: log.year,
                logMonth: log.month,
                logDay: log.day,
                logHour: log.hour,
                logMinute: log.minute
            }
            newLog[i].data = {}

            for (const d of log.data) {
                if (req.body.data.name !== undefined || req.body.data.loc !== undefined || req.body.data.value !== undefined || req.body.data.error !== undefined) {
                    if (req.body.data.name !== undefined && d.name !== undefined && d.name.toUpperCase().includes(req.body.data.name.toUpperCase())) {
                        newLog[i].data[j] = d
                    } else if (req.body.data.loc !== undefined && d.loc !== undefined && d.loc.toUpperCase().includes(req.body.data.loc.toUpperCase())) {
                        newLog[i].data[j] = d
                    } else if (req.body.data.value !== undefined && d.value !== undefined && JSON.stringify(d.value).toUpperCase().includes(req.body.data.value.toUpperCase())) {

                        newLog[i].data[j] = d
                    } else if (req.body.data.error !== undefined && d.error !== undefined && JSON.stringify(d.error).toUpperCase().includes(req.body.data.error.toUpperCase())) {
                        newLog[i].data[j] = d
                    }
                } else {
                    newLog[i].data[j] = d
                }
                j = j + 1
            }
        } else {
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
                gameState: log.game.state,
                gameCreateurId: log.game.createurId,
                gameChallengerId: log.game.challengerId,
                logYear: log.year,
                logMonth: log.month,
                logDay: log.day,
                logHour: log.hour,
                logMinute: log.minute
            }
        }
        Object.assign(logMessage, newLog)
        i = i + 1
    }

    return logMessage
}


