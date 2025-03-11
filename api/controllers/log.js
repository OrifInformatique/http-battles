// import fonctions util pour log
const utilLog = require('../util/log')

// import fonctions util pour log
const utilRes = require('../util/res')

// liste les parties
exports.listLogs = async (req, res, next) => {

    const logs = await utilLog.listLogs()
        .catch(error => {
            utilRes.sendError(400, error, res)
        })

    utilRes.sendSuccess(200, logs, res)
}