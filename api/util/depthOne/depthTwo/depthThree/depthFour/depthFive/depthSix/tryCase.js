
// import le schema d'un Board
const Board = require("../../../../../../../models/Board")

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

// import les fonction utiles pour board
const utilUpdateBoardXgetBoard = require('./crossRoad/updateBoardXgetBoard')



const utilQueryConstructXgetBoard = require('./crossRoad/queryConstructXgetboard')

const utilBuiltCheckCaseResult = require('./depthBottom/builtCheckCaseResult')

// import les fonction utiles pour getWord
const utilGetWord = require('./depthBottom/getWord')

// import les fonction utiles pour updateWord
const utilUpdateWord = require('./depthBottom/updateWord')

// import les fonction utiles pour reavealWord
const utilRevealWord = require('./depthBottom/reavealWord')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSix/tryCase"

/*
subFunctions
    -utilQueryConstructXgetBoard.queryConstructXgetBoard
        -utilQueryConstructor.queryConstructor
        -utilGetBoard.getBoard
*/
// retourn un plateau de jeux selon l'identifiant de son utilisateur et de la partie
exports.getBoardByGameAndUser = async (gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoardByGameAndUser"

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

    req.userIdQuery = userId
    req.gameIdQuery = gameId

    req.package.userIdQuery = userId
    req.package.gameIdQuery = gameId

    await utilQueryConstructXgetBoard.queryConstructXgetBoard(req)
        .then(value => {
            // stoque le tableaux dans la requete
            req.board = value.board
            req.package.board = value.board

            req.data.push({
                name: "utilQueryConstructXgetBoard.queryConstructXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilQueryConstructXgetBoard.queryConstructXgetBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -this.revealWordXupdateBoard
        -this.revealXupdateWord
            -utilRevealWord.revealWord
            -this.updateXgetWord
                -utilUpdateWord.updateWord
                -utilGetWord.getWord
        -utilUpdateBoardXgetBoard.updateBoardXgetBoard
            -utilUpdateBoard.updateBoard
            -utilQueryConstructXgetBoard.queryConstructXgetBoard
                -utilQueryConstructor.queryConstructor
                -utilGetBoard.getBoard 
    -utilBuiltCheckCaseResult.builtCheckCaseResult
*/
// effectue les opération en cas de success pour le cheque de la case
exports.updateBoardXbuildResult = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateBoardXbuildResult"

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

    await this.revealWordXupdateBoard(req)
        .then(value => {
            // stoque le nouveaux tableaux dans la requete
            req.board = value.board
            req.package.board = value.board

            req.data.push({
                name: "this.revealWordXupdateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.revealWordXupdateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stoque le mot et le succes du check dans un objet résultat dans la requete
    await utilBuiltCheckCaseResult.builtCheckCaseResult(req)
        .then(value => {
            // stoque le nouveaux tableaux dans la requete
            req.result = value.result
            req.package.result = value.result

            req.data.push({
                name: "utilBuiltCheckCaseResult.builtCheckCaseResult",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilBuiltCheckCaseResult.builtCheckCaseResult",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -this.revealXupdateWord
        -utilRevealWord.revealWord
        -this.updateXgetWord
            -utilUpdateWord.updateWord
            -utilGetWord.getWord
    -utilUpdateBoardXgetBoard.updateBoardXgetBoard
        -utilUpdateBoard.updateBoard
        -utilQueryConstructXgetBoard.queryConstructXgetBoard
            -utilQueryConstructor.queryConstructor
            -utilGetBoard.getBoard 
*/
exports.revealWordXupdateBoard = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: revealWordXupdateBoard"

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
    
    // revèle le mot
    await this.revealXupdateWord(req.board.board[req.arrayY][req.arrayX], req)
        .then(value => {
            // stoque le mot dans la case du tableau du plateau dans la requete
            req.board.board[req.arrayY][req.arrayX] = value.word
            req.package.board.board[req.arrayY][req.arrayX] = value.word

            req.data.push({
                name: "this.revealXupdateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.revealXupdateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // updadet le plateau avec le nouveaux tableaux
    await utilUpdateBoardXgetBoard.updateBoardXgetBoard(req)
        .then(value => {
            // stoque le nouveaux tableaux dans la requete
            req.board = value.board
            req.package.board = value.board

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

/*
subFunctions
    -utilRevealWord.revealWord
    -this.updateXgetWord
        -utilUpdateWord.updateWord
        -utilGetWord.getWord
*/
exports.revealXupdateWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: revealXupdateWord"

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

    await utilRevealWord.revealWord(word, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word
            req.data.push({
                name: "utilRevealWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilRevealWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.updateXgetWord(req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word

            req.data.push({
                name: "this.updateXgetWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateXgetWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -utilUpdateWord.updateWord
    -utilGetWord.getWord
*/
exports.updateXgetWord = async (req) => {
    // test de la validité des données
    const LOC_LOC = "methode: updateXgetWord"

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

    // update le mot dans la base donnée 
    await utilUpdateWord.updateWord(req)
        .then(value => {
            // stoque le'update dans la requete
            req.wordUpdate = value.wordUpdate
            req.package.wordUpdate = value.wordUpdate
            req.data.push({
                name: "utilUpdateWord.updateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilUpdateWord.updateWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère le mot après l'update
    await utilGetWord.getWord(req.word._id, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value.word
            req.package.word = value.word
            req.data.push({
                name: "utilWord.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilWord.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.package
}
