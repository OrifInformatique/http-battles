// import fonctions util pour log
const utilLog = require('../util/log')

// import fonctions util pour log
const utilRes = require('../util/res')

// liste les log
exports.listLogs = async (req, res, next) => {

    const logs = await utilLog.listLogsV2(req)
        .catch(error => {
            console.log(error)
            utilRes.sendError(404, error.toString(), res)
        })

    utilRes.sendSuccess(200, logs, res)
}

// liste les log
exports.listLogsV3 = async (req, res, next) => {

    const logs = await utilLog.listLogsV3(req)
        .catch(error => {
            console.log(error)
            utilRes.sendError(404, error.toString(), res)
        })

    utilRes.sendSuccess(200, logs, res)
}

