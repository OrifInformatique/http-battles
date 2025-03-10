// import fonctions util pour partie
const utilGame = require('../util/game')

// import fonctions util pour user
const utilUser = require('../util/user')

const middleGame = require('./game')
// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour board
const utilCheck = require('../util/check')

// constante Global le dossier et la page pour le traitement des erreures
const LOC_GLOB = "file: ../middlware/check"

// vérify si il s'agit du tour du client
exports.checkTurn = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkTurn"

    // test de validité des données de la requète passant la methode en cas de problème
    await utilCheck.dataValidityTest(req, next)
        .then(value => {
            // stocke la donnée avec le résultat de la méthode dans la requète
            req.utilCheck = value

            // donnée ajouté ave la méthode utiliser, la méthode dans laquel elle est localiser, la page global et le résultat
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            // donnée ajouté ave la méthode utiliser, la méthode dans laquel elle est localiser, la page global et l'erreur'
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test pour sortir de la méthodes et empecher son execution si les donées ne sont pas validé   
    if (req.utilCheck) {
        return null
    }

    // test si il s'agit du tour du client
    await middleGame.testTurn(req, res)
        .then(value => {
            req.testTurnMessage = value

            // donnée ajouté ave la méthode utiliser, la méthode dans laquel elle est localiser, la page global et le résultat
            req.data.push({
                name: " middleGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            // donnée ajouté ave la méthode utiliser, la méthode dans laquel elle est localiser, la page global et l'erreur'
            req.data.push({
                name: " middleGame.testTurn",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    
    // verifie le résultat du test pour voir si il s'agit du tour du client
    if (req.testTurnMessage.message !== "Your turn") {
        // si ce n'est pas son tour renvoi un message pour l'en informer et arrète les opérations
        await utilRes.sendSuccess(200, { message: req.testTurnMessage.message }, res)

    } else {
        // sinon test si la méthode doit passer la main au prochain middleware
        if (next !== undefined) {
            // passe au prochain middleware
            next()
        }
    }

}

// vérifie si les donéées récolter son valide et envoye une erreur dans le cas contraire
exports.dataValidity = async (req, res, next) => {
    
    if (req.data !== undefined) {
        for (const d of req.data) {
            req.log.data.push(d)
            if (d.value === null || d.value === undefined) {
                console.log(d)
                var errorCode = 400
                if (d.error !== undefined) {
                    console.log(d)

                    var errorCode = await utilRes.errorCodeTest(d)
                    d.error = d.error.toString()
                }

                utilRes.sendError(errorCode, d, res)
            }
        }
        //console.log(req.log)
    }

    if (next !== undefined) {
        next()
    }
}

exports.dataInit = async (req, res, next) => {
    const LOC_LOC = "methode: dataInit"
    req.data = []

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


