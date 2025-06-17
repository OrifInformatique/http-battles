

// import fonctions util pour res
const utilRes = require('../util/res')

// import fonctions util pour log
const utilLog = require('../util/log')

// constante Global le dossier et la page pour le traitement des erreures
const LOC_GLOB = "file: ../middlware/check"


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

/**
 * initialise les données et le log pour pouvoire les tester
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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


