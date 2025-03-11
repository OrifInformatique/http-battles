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

exports.listLogs = async () => {

    const logs = await Log.find()

    return logs
}

