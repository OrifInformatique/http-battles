

// import fonctions util pour check
const utilCheck = require('../../../check')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthFour/startGame')

// import les fonction utiles pour utilisateur
const utilCreateBoard = require('./depthFour/createBoard')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/depthOne/../depthThree/startGame"


exports.getGameAndCheckStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getGameAndCheckStartStat"

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

    await utilGetGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // check si la partie a commencé (true = non, false = oui)
    await utilStartGame.checkStartStateXtestStartUser(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value.check
            req.check = value.check

            req.package.startUserId = value.startUserId
            req.startUserId = value.startUserId

            req.data.push({
                name: "utilGame.checkStartStateXtestStartUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGame.checkStartStateXtestStartUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

// renvoie le message de départ décrivamt qui commence par rapport au client à l'origin de la requete
exports.startMessageTest = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessageTest"

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

    // renvoit le message de dépar, si le client est l'utilisateur qui commence, l'informe de cela
    if (req.auth.userId === req.startUserId) {
        return "CLIENT_TURN"
    } else {
        // sinon, communique que l'autre utilisateur commence
        return "ADVERSAIRE_TURN"
    }
}

exports.startMessageCreation = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: startMessageCreation"

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

    // stoque le message de départ dans la requette ainsi que l'id du plateux du client
    req.startMessage = {
        message: req.startMessageContent,
        boardId: req.board._id
    }

    // retourn la variables traitée pour la gestion d'erreur en dehors des middleware
    return req.startMessage
}

exports.createBoardAndInsertPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createBoardAndInsertPhrase"

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

    // crée un plateau pour le client pour la partie dans la requete
    await utilCreateBoard.createBoard(req.body.gameId, req.auth.userId, req)
        .then(value => {
            //stoque le plateau dans la requete
            req.package.board = value
            req.board = value

            req.data.push({
                name: "utilCreateBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilCreateBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilStartGame.createPhraseXupdateBoard(req)
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
                name: "utilStartGame.createPhraseXupdateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.createPhraseXupdateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}