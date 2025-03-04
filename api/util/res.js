// import fonctions util pour partie
const utilGame = require('../util/game')

exports.sendError = async (code, message, res) => {
    if (!res.headersSent) {
        res.status(code).json({ error: message })
    } else {
        console.log("response already sent")
    }
}

exports.sendSuccess = async (code, json, res) => {
    if (!res.headersSent) {
        res.status(code).json(json)
    } else {
        console.log("response already sent")
    }
}

exports.sendSuccessCheck = async (req, res) => {
    const message = await utilGame.testTurn(req)
    message.message !== "Your turn"

    if (message.message !== "Your turn") {
        await this.sendSuccess(200, message, res)
        return false
    } else {
        return true
    }
}

