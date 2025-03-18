// import fonctions util pour board
const utilBoard = require('../util/board')

// import fonctions util pour phrase
const utilPhrase = require('../util/phrase')

// import fonctions util pour check
const utilCheck = require('../util/check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../middleware/board"

// test si la phrase proposé par le client est la bonne
exports.tryPhrase = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhrase"

    // test de la validité des données
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

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    // test si la phrase de l'adversaire est celle de la requete 
    await utilBoard.tryPhrase(req.otherUserId, req)
        .then(value => {
            // stoque le resultat dans la requet
            req.check = value

            req.data.push({
                name: "utilBoard.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.tryPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.check
}

// test une case du plateua
exports.checkBoard = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoard"

    // test de la validité des données
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
            console.log(error)
            req.data.push({
                name: "utilCheck.dataValidityTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stop la méthode en cas d'échèque du test
    if (req.utilCheck) {
        return null
    }

    // test une case du plateua
    await utilBoard.checkBoard(req.arrayY, req.arrayX, req.body.gameId, req.otherUserId, req)
        .then(value => {
            // stoque le resultat (inclue le mot si réussi)
            req.check = value

            req.data.push({
                name: "utilBoard.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBoard.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.check
}