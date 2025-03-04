// import fonctions util pour partie
const utilGame = require('../util/game')

const middleGame = require('./game')
// import fonctions util pour res
const utilRes = require('../util/res')

exports.checkTurn = async (req, res, next) => {
    await middleGame.testTurn(req, res)

    if (req.testTurnMessage.message !== "Your turn") {
        await utilRes.sendSuccess(200, { message: req.testTurnMessage.message}, res)

    } else {
        next()
    }

}

exports.dataValidity = async (req, res, next) => {
    if (req.data !== undefined){
        for (const d of req.data) {
            //console.log(d)
            if (d.value === null || d.value === undefined) {
                
                console.log(d)
        
                utilRes.sendError(404, d, res)
            }
        }
    }

    if (next !== undefined) {
        next()
    }
}

exports.dataInit = async (req, res, next) => {
    req.data = []
    if (next !== undefined) {
        next()
    }
}
