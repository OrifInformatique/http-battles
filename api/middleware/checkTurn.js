// import fonctions util pour partie
const utilGame = require('../util/game')

const middleGame = require('../middleware/game')
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
