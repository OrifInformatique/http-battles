// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');
// import le schema d'un utilisateur
const Log = require("../models/Log")

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
    console.log(log.data)
    const savedLog = await log.save()

    return savedLog
}

exports.logToDatabase = async (log) => {

    const createdLog = await this.logObjectCreation(log)

    const savedLog = await this.logObjectSave(createdLog)

    return savedLog
}

exports.listLogs = async (req) => {
    var user = {}
    var game = {}
    var data = {}
    var query = {}

    if (req.body.logId !== undefined) {
        logId = {
            "_id": mongoose.Types.ObjectId(req.body.logId)
        }
        Object.assign(query, user.userId)
    }

    if (req.body.userId !== undefined) {
        user.userId = {
            "user._id": mongoose.Types.ObjectId(req.body.userId)
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

    console.log(user)



    console.log(query)


    const logs = await Log.find(query)
    var logMessage = {}
    var i = 0
    var j = 0
    for (const log of logs) {
        //console.log("const log of logs")
        var newLog = {}
        if (req.body.data !== undefined && log.data !== undefined) {
            newLog[i] = {
                logId: log._id,
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
            //console.log("req.body.data !== undefined")
            newLog[i].data = {}
            for (const d of log.data) {
                //console.log("const d of log.data")
                if (req.body.data.name !== undefined || req.body.data.loc !== undefined || req.body.data.value !== undefined || req.body.data.error !== undefined) {
                    //console.log("req.data... defined")
                    if (req.body.data.name !== undefined && d.name === req.body.data.name) {
                        //console.log("req.body.data.name defined")
                        newLog[i].data[j] = d
                    } else if (req.body.data.loc !== undefined && d.loc === req.body.data.loc) {
                        //console.log("req.body.data.loc defined")
                        newLog[i].data[j] = d
                    } else if (req.body.data.value !== undefined && d.value === req.body.data.value) {
                        //console.log("req.body.data.loc value")
                        newLog[i].data[j] = d
                    } else if (req.body.data.error !== undefined && d.error === req.body.data.error) {
                        //console.log("req.body.data.loc error")
                        newLog[i].data[j] = d
                    } else {
                        //console.log("delete log")
                    }
                    //console.log("req.data... defined")
                } else {
                    newLog[i].data[j] = d
                }
                //console.log("const d of log.data")
                j = j + 1
            }
            //console.log("req.body.data !== undefined")
        } else if (log.data !== undefined){
            newLog[i] = {
                logId: log._id,
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
                logMinute: log.minute,
                logData: log.data
            } 
        } else {
            newLog[i] = {
                logId: log._id,
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
        console.log(i)
        console.log("const log of logs")
    }

    return logMessage
}


