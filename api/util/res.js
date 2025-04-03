

exports.sendError = async (code, message, res) => {
    if (!res.headersSent) {
        res.status(code).json({ error: message })
    } else {
        console.log("response already sent")
    }
}

exports.sendSuccess = async (code, message, res) => {
    if (!res.headersSent) {
        res.status(code).json(message)
    } else {
        console.log("response already sent")
    }
}

exports.errorCodeTest = async (data) => {
    if(data.error.name.includes('TypeError')){
        return 500
    } else if(data.error.name.includes('CastError')){
        return 400
    }  else if (data.name.includes('find')){
        return 404
    }  else if (data.name.includes('update')){
        return 400
    }  else if (data.name.includes('save') || data.name.includes('create')){
        return 500
    }  else {
        return 400
    }
}



