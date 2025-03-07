// import fonctions util pour partie
const utilGame = require('../util/game')

// import fonctions util pour user
const utilUser = require('../util/user')

const middleGame = require('./game')
// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour board
const utilCheck = require('../util/check')

const LOC_GLOB = "file: ../middlware/check"

exports.checkTurn = async (req, res, next) => {
    await middleGame.testTurn(req, res)

    if (req.testTurnMessage.message !== "Your turn") {
        await utilRes.sendSuccess(200, { message: req.testTurnMessage.message }, res)

    } else {
        next()
    }

}

exports.dataValidity = async (req, res, next) => {
    if (req.data !== undefined) {
        for (const d of req.data) {
            req.log.data.push(d)
            if (d.value === null || d.value === undefined) {

                var errorCode = 400
                if(d.error !== undefined ){
                    console.log(d)
                    
                    if(d.error.reason !== undefined) {
                        console.log(d.error.reason.toString())
                        d.reason = d.error.reason.toString()
                    }
                    
                    var errorCode = await utilRes.errorCodeTest(d)
                }

                utilRes.sendError(errorCode, d, res)
            }
        }
        console.log(req.log)
    }

    if (next !== undefined) {
        next()
    }
}

exports.dataInit = async (req, res, next) => {
    req.data = []

    const LOC_LOC = "methode: dataInit"
    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            req.utilCheck = value

            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await this.logInit(req, res)
        .then(value => {
            req.data.push({
                name: "this.logInit",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "this.logInit",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (next !== undefined) {
        next()
    }
}

exports.logInit = async (req, res, next) => {
    req.log = {
        data: []
    }
    const LOC_LOC = "methode: logInit"
    await utilCheck.dataValidityTest(req)
        .then(value => {
            req.utilCheck = value
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log("error")
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    if (req.utilCheck) {
        return null
    }

    await utilUser.getUserById(req.body.userId, req)
        .then(value => {
            req.user = value

            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilUser.getUserById",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await middleGame.getGame(req, res)
        .then(value => {
            req.game = value
            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "middleGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const hour = date.getHours()
    const minute = date.getMinutes()

    req.log = {
        user: req.user,
        game: req.game,
        year: year,
        month: month,
        hour: hour,
        minute: minute,
        data: []
    }

    if (next !== undefined) {
        next()
    }



    return req.log
}
