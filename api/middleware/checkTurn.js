// import fonctions util pour partie
const utilGame = require('../util/game')
// import fonctions util pour res
const utilRes = require('../util/res')

exports.checkTurn = async (req, res, next) => {
    const message = await utilGame.testTurn(req)
    message.message !== "Your turn"

    if (message.message !== "Your turn") {
        await utilRes.sendSuccess(200, message, res)

    } else {
        next()
    }

}