

// import fonctions util pour check
const utilCheck = require('../../check')

// import les fonction utiles pour utilisateur
const utilStartGame = require('.//depthThree/startGame')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/depthTwo/startGame"

exports.getGameCheckStartAddBoardAndPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameCheckStartAddBoardAndPhrase"

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

    await utilStartGame.getGameAndCheckStart(req)
        .then(value => {
            req.package.game = value.game
            req.game = value.game

            req.package.check = value.check
            req.check = value.check

            req.data.push({
                name: "utilStartGame.getGameAndCheckStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.getGameAndCheckStart",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilStartGame.createBoardAndInsertPhrase(req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            // stoque le plateu après update dans la requete
            req.package.board = value.board
            req.board = value.board

            req.data.push({
                name: "utilStartGame.createBoardAndInsertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.createBoardAndInsertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.startMessage = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessage"

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

    if (req.package === undefined) {
        req.package = {}
    }

    // test si le client est l'utilisateur qui commence la partie
    await utilStartGame.startMessageTest(req)
        .then(value => {
            // stoque le message addresser au client pour l'informer de qui commence la partie dans la requette
            req.package.startMessageContent = value
            req.startMessageContent = value

            req.data.push({
                name: "utilStartGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.startMessageTest",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilStartGame.startMessageCreation(req)
        .then(value => {
            req.package.startMessage = value
            req.startMessage = value

            req.data.push({
                name: "utilStartGame.startMessageCreation",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.startMessageCreation",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}