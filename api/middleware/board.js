// import fonctions util pour board
const utilBoard = require('../util/board')

// import fonctions util pour phrase
const utilPhrase = require('../util/phrase')

// import fonctions util pour check
const utilCheck = require('../util/check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../middleware/board"


// remplie le plateau dans la base donnée
exports.fillBoard = async (req, res, next) => {
    
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: fillBoard"

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

    // update le plateau dans la requete
    await utilBoard.updateBoard(req)
        .then(value => {
            // stoque le plateu après update dans la requete
            req.board = value

            req.data.push({
                name: "utilBoard.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.board
}

// crée un plateau pour le client pour la partie dans la requete
exports.createBoard = async (req, res, next) => {
    
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createBoard"

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

    // crée un plateau pour le client pour la partie dans la requete
    await utilBoard.createBoard(req.body.gameId, req.auth.userId, req)
        .then(value => {
            //stoque le plateau dans la requete
            req.board = value

            req.data.push({
                name: "utilBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
        
    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }
    
    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.board
}

// insert la phrase dans le tableau (objet)
exports.insertPhrase = async (req, res, next) => {
    
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhrase"

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
    
    // crée la phrase (objet)
    await utilPhrase.createPhrase(req.body.phrase, req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.board.phrase = value

            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.board.phrase
}

// insert la phrase (suite de mots) dans le plateau (table)
exports.insertPhraseInBoard = async (req, res, next) => {
    
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoard"

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
    
    // insert la phrase (suite de mots) dans le plateau (table)
    await utilBoard.insertPhraseInBoard(req.board, req.board.phrase, req)
        .then(value => {
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.board.board = value

            req.data.push({
                name: "utilBoard.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.board.board
}

// retourn le plateau du client
exports.getBoardGameUser = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardGameUser"

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

    // retourn un plateau suivant l'id de l'utilisateur
    await utilBoard.getBoardGameUser(req.body.gameId, req.auth.userId, req)
        .then(value => {
            // stoque le plateau de l'utilisateur dans le message dans la requete pour le client
            req.testTurnMessage.userBoard = value.board

            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.testTurnMessage.userBoard
}

// retourn le plateau de l'adversaire du client
exports.getBoardGameAdversaire = async (req, res, next) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardGameAdversaire"

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

    // retourn un plateau suivant l'id de l'utilisateur
    await utilBoard.getBoardGameUser(req.body.gameId, req.otherUserId, req)
        .then(value => {
            // stoque le plateau de l'adversaire dans le message dans la requete pour le client
            req.testTurnMessage.adversaireBoard = value.board

            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilBoard.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la fonction next à été transmise et passe au prochains middlware si oui
    if (next !== undefined) {
        next()
    }

    // retourne la variable traité pour la gestion d'erreur en dehors des middleware
    return req.testTurnMessage.adversaireBoard
}

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