

// import fonctions util pour check
const utilCheck = require('../../../../check')

// import les fonction utiles pour utilisateur
const utilStartGame = require('./depthFive/startGame')

// import les fonction utiles pour utilisateur
const utilUpdateBoardXgetBoard = require('./depthFive/depthSix/crossRoad/updateBoardXgetBoard')



// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFour/startGame"

exports.checkStart = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkStart"

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

    // check si la partie a commencé (true = non, false = oui)
    await utilStartGame.checkStartStat(req)
        .then(value => {
            // stoque le resultat dans la requete
            req.package.check = value
            req.check = value

            req.data.push({
                name: "utilStartGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.checkStartStat",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilStartGame.checkStartUserId(req)
        .then(value => {
            // stoque l'id du joueur qui commence
            req.package.startUserId = value
            req.startUserId = value

            req.data.push({
                name: "utilStartGame.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            req.data.push({
                name: "utilStartGame.checkStartUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    return req.package
}

exports.insertAndSavePhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertAndSavePhrase"

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

    await utilStartGame.insertPhrase(req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            req.data.push({
                name: "utilStartGame.insertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilStartGame.insertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update le plateau dans la requete
    await utilUpdateBoardXgetBoard.updateBoardXgetBoard(req)
        .then(value => {
            // stoque le plateu après update dans la requete
            req.package.board = value.board
            req.board = value.board
            
            req.data.push({
                name: "utilUpdateBoardXgetBoard.updateBoardXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateBoardXgetBoard.updateBoardXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}


