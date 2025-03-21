
// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// import les fonction utiles pour startGame
const utilStartGame = require('./depthEight/startGame')

// import les fonction utiles pour testUserTurn
const utilTestUserTurn = require('./depthEight/testUserTurn')

const utilGetStartUserId = require('./depthEight/depthBottom/getStartUserId')

const utilGetStartGameState = require('./depthEight/depthBottom/getStartGameState')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/startGame"

exports.coinFlipStartMode = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: coinFlipStartMode"

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
    // sort aléatoirement un résultat true or false et le stock dans une constante
    req.coinFlip = Math.floor(Math.random() * 2) == 0

    // retourn l'id de l'utilisateur en fonctions du resultat du test
    await utilGetStartUserId.getStartUserId(req.coinFlip, req)
        .then(value => {
            // stoque cette id dans la requete
            req.startUserId = value
            req.package.startUserId = value

            req.data.push({
                name: "utilGetStartUserId.getStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetStartUserId.getStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourn l'état de la partie en fonction du résultat du test
    await utilGetStartGameState.getStartGameState(req.coinFlip, req)
        .then(value => {
            // stoque le nouvel étàt de la partie dans la requete
            req.game.state = value
            req.package.state = value
            req.data.push({
                name: "utilGetStartGameState.getStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetStartGameState.getStartGameState",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

exports.testTurn = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTurn"

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

    // teste l'état de la partie
    // si c'est le tour du créateur
    if (req.game.state === "CREATEUR_TURN") {
        // test si le client est le créateur et renvoit un message pour lui indiquer si c'est son tour
        await utilTestUserTurn.testUserTurn(req.game.createurId, req.auth.userId, req)
            .then(value => {
                // stocke le message de réponse dans la requete
                req.testTurnMessage = value

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CREATEUR_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour du challenger
    } else if (req.game.state === "CHALLENGER_TURN") {
        // test si le client est le challenger et renvoit un message pour lui indiquer si c'est son tour
        await utilTestUserTurn.testUserTurn(req.game.challengerId, req.auth.userId, req)
            .then(value => {
                req.testTurnMessage = value

                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilTestUserTurn.testUserTurn - CHALLENGER_TURN",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })

        // si c'est le tour de personne
    } else {
        // renvoi un message pour informer que la partie est términer
        req.testTurnMessage = { message: req.game.state }
    }

    return req.testTurnMessage
}

// crée et rempli un tableaux de la phrase avec des objet mot suivant la phrase de la requete
exports.fillPhrase = async (userPhrase, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: fillPhrase"

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

    // initialise le tableaux de mot dans la requete
    req.wordObjectsArray = []

    // parcoure les mot de la phrase de l'utilisateur
    for (const mot of userPhrase) {
        // crée un objet mot
        await utilStartGame.createXsaveWord(mot.word, req)
            .then(value => {
                // stoque l'objet mot dans la requete
                req.word = value
                req.data.push({
                    name: "utilStartGame.createXsaveWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilStartGame.createXsaveWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
        
        // ajoute le mot au tableaux d'objet dans la requete
        req.wordObjectsArray.push(req.word)
    }

    // retourne la variable traitée pour la gestion d'erreur
    return req.wordObjectsArray
}

// Crée et remplie les ligne du plateau
exports.insertPhraseInBoardY = async (board, userPhrase, keyY, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoardY"

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

    // pousse une ligne dans le plateau
    req.newBoardFull.push([])

    // parcour les case de la ligne Y de l'ancient plateaux
    for (const keyX in board.board[keyY]) {
        // insert les case de la ligne du nouveaux plateaux et les remplie 
        await utilStartGame.insertPhraseInBoardX(userPhrase, keyY, keyX, req)
            .then(value => {
                req.data.push({
                    name: "utilBoard.insertPhraseInBoardX",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilBoard.insertPhraseInBoardX",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}
