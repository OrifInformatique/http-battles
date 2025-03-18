

// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour board
const utilCheck = require('../util/check')

// import fonctions util pour log
const utilLog = require('../util/log')

// import fonctions util pour game
const utilGame= require('../util/game')

// import fonctions contenu dans middleware/game
const middleGame = require('./game')

// constante Global le dossier et la page pour le traitement des erreures
const LOC_GLOB = "file: ../middlware/check"

// check si les données de la requete pour le début de la partie sons valide
exports.checkReqDataStartGame = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataStartGame"

    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient une phrase
    if (req.body.phrase === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "phrase not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }
    
    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }
    
    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

// check si les données de la requete pour le teste de la phrase
exports.checkReqDataTryPhrase = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataTryPhrase"

    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient une phrase
    if (req.body.phrase === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "phrase not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

// test les donnée pour la requete findGame
exports.checkReqDataFindGame = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataFindGame"
    
    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

// test les donnée pour la requette joinGame
exports.checkReqDataJoinGame = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataJoinGame"
    
    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

// test les données pour la requette checkTurn
exports.checkReqDataCheckTurn = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataCheckTurn"
    
    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

// test les données pour la requete endGame
exports.checkReqDataEndGame = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataEndGame"
    
    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.message = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

// test les données pour la reqete tryCase
exports.checkReqDataTryCase = async (req, res, next) => {
    // constante local indiquant la methode pour le traitement des erreures
    const LOC_LOC = "methode: checkReqDataTryCase"
    
    // crée une erreur
    var error = new Error()
    // donne un nom informant sur la nature de l'erreur
    error.name = "Bad Request Data"

    // test si la requete contient l'id de la partie
    if (req.body.gameId === undefined) {
        // ajoute un message informant de l'absence de la donnée à l'erreur
        error.error = "gameId not found"

        // stoque l'erreur dans la requete
        req.data.push({
            name: "utilCheck.dataValidityTest",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }

}

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
    await utilGame.testTurn(req, res)
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
    // test si les données exist
    if (req.data !== undefined) {
        // parcour les données 

        for (const d of req.data) {
            // stock les donnée dans le log
            req.log.data.push(d)
            // test si les donées ont une valeur (si non cela veut dire qu'il s'agit d'une erreure)
            if (d.value === null || d.value === undefined) {
                // set le code d'erreur à 400 (erreur dans la requette reçu du client) comme base
                var errorCode = 400
                // test si l'erreur est défini (si l'erreur est défini run le code dans le test)
                if (d.error !== undefined) {
                    // test quel code d'erreur est le plus aproprier et remplace le code précedent
                    errorCode = await utilRes.errorCodeTest(d)
                    // transforme l'erreur en string pour que le client puis la voire
                    d.error = d.error.toString()
                }
                // renvoit l'erreur ave son code
                utilRes.sendError(errorCode, d, res)
            }
        }
        // enregistre le log
        await utilLog.logToDatabase(req.log)
    }
    // test si la fonction next à été transmise
    if (next !== undefined) {
        // si oui passe au prochain middleWare
        next()
    }
}

// initialise les données et le log pour pouvoire les tester
exports.dataInit = async (req, res, next) => {
    // informe dans quel méthodes les potentielles erreurs interne se trouve
    const LOC_LOC = "methode: dataInit"

    //initialise les données
    req.data = []

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }
}

// initialise le log
exports.logInit = async (req, res, next) => {
    // renseigne dans quel méthode les futur erreures sont
    const LOC_LOC = "methode: logInit"

    // trouve les donnée utilisateur et de la partie pour le log si elle sont spécifié
    await utilLog.logInitFindUserAndGame(req)
        .then(value => {
            // stoque ces données dans la requete
            req.package = value

            req.data.push({
                name: "utilLog.logInitFindUserAndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilLog.logInitFindUserAndGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    
    // récupère les données de date pour du log 
    await utilLog.logDate(req)
        .then(value => {
            // stoque ces données dans la requete
            req.package = value

            req.data.push({
                name: "utilLog.logDate",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilLog.logDate",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // construit le log avec lesdonnées fournit et le stoque dans la requete
    await utilLog.logConstructor(req)
        .then(() => {
            req.data.push({
                name: "utilLog.logDate",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: "log construction"
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilLog.logDate",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }
    // retourn la variable traité dans cette méthode pour la gestion d'erreure si on décide de l'appeler en dehore d'une route.
    return req.log
}


