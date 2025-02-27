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