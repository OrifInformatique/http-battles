// import fonctions util pour partie
const utilGame = require('../util/game')

exports.sendError = async (code, message, res) => {
    if (!res.headersSent) {
        return res.status(code).json({ error: message })
    } else {
        return console.log("response already sent")
    }
}

exports.sendSuccess = async (code, json, res) => {
    if (!res.headersSent) {
        return res.status(code).json(json)
    } else {
        return console.log("response already sent")
    }
}

exports.sendSuccessCheck = async (req, res) => {
    const message = await utilGame.testTurn(req)

    if (message.message !== "Your turn") {
        return await this.sendSuccess(200, message, res)
    }
}