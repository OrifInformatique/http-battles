
// import le schema d'un Board
const Board = require("../../../../../models/Board")

// import fonctions util pour check
const utilCheck = require('../../../../check')


// import les fonction utiles pour utilisateur
const utilCheckWordPhrase = require('./depthFive/depthBottom/checkWordPhrase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFour/tryPhrase"

// retourn un plateau de jeux selon l'identifiant de son utilisateur et de la partie
exports.getBoardGameUser = async (gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardGameUser"

    // test de la validité des données
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

    // trouve le plateau en fonction de l'id de son utilisateur et de la partie
    await Board.findOne({
        gameId: gameId,
        userId: userId
    })
        .then(value => {
            // stoque le plateau dans la requete
            req.board = value
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Board.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.board
}

// test si la phrase proposé par le client est la mème que celle de 'l'adversaire
exports.tryPhraseCheckAdv = async (advBoard, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseCheckAdv"

    // test de la validité des données
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

    if (advBoard.phrase === undefined) {
        advBoard.phrase = {
            words: ["null", "null", "null", "null"]
        }
    }

    // parcour la phrase du plateau adverse
    for (const keyAdv in advBoard.phrase.words) {
        // test si le mot est le même que celui de la requete et au même endroit
        await this.loopCheckPhrase(advBoard, req, keyAdv)
            .then(value => {
                // retourn le nombre de mot juste
                req.wordCounter = value
                req.data.push({
                    name: "this.loopCheckPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.loopCheckPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.wordCounter
}

/*
subFunctions
    -utilCheckWordPhrase.checkWordPhrase
*/
// test si le mot est le même que celui de la requete et au même endroit
exports.loopCheckPhrase = async (advBoard, req, keyAdv) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: loopCheckPhrase"

    // test de la validité des données
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

    // parcoure la phrase de la requete
    for (const keyReq in req.body.phrase) {
        // test si le mot est le même que celui contenu dans le plateau
        await utilCheckWordPhrase.checkWordPhrase(advBoard, req, keyAdv, keyReq)
            .then(value => {
                // retourn le nombre de mot just
                req.wordCounter = value.wordCounter

                req.data.push({
                    name: "utilCheckWordPhrase.checkWordPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilCheckWordPhrase.checkWordPhrase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitée pour la gestion d'erreu
    return req.wordCounter
}

