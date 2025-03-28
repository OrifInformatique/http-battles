
// import fonctions util pour check
const utilCheck = require('../../../../check')

// import les fonction utiles pour tryPhrase
const utilTryCase = require('./depthFive/depthBottom/trycase')

// import les fonction utiles pour board
const utilUpdateBoardXgetBoard = require('./depthFive/crossRoad/updateBoardXgetBoard')

const utilQueryConstructXgetBoard = require('./depthFive/crossRoad/queryConstructXgetboard')

const utilBuiltCheckCaseResult = require('./depthFive/depthBottom/builtCheckCaseResult')

// import les fonction utiles pour getWord
const utilGetWord = require('./depthFive/depthBottom/getWord')

// import les fonction utiles pour updateWord
const utilUpdateWord = require('./depthFive/depthBottom/updateWord')

// import les fonction utiles pour reavealWord
const utilRevealWord = require('./depthFive/depthBottom/reavealWord')

// import les fonction utiles pour switchArrayX
const utilSwitchArrayX = require('./depthFive/depthBottom/switchArrayX')

// import les fonction utiles pour switchArrayY
const utilSwitchArrayY = require('./depthFive/depthBottom/switchArrayY')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthFour/tryCase"



/*
subFunctions
    -utilSwitchArrayX.switchArrayX
    -utilSwitchArrayY.switchArrayY
*/
exports.switchArrays = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: switchArrays"

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

    // retourne la position X de la case sur le plateaux en fonction de la route utilisée
    await utilSwitchArrayX.switchArrayX(req.route, req)
        .then(value => {
            // stoque la position X du plateau dans la requette
            req.package.arrayX = value
            req.arrayX = value

            req.data.push({
                name: "utilSwitchArrayX.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilSwitchArrayX.switchArrayX",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la position y de la case sur le plateaux en fonction de la méthode utilisée
    await utilSwitchArrayY.switchArrayY(req.method, req)
        .then(value => {
            // stoque la position Y du plateau dans la requette
            req.package.arrayY = value
            req.arrayY = value

            req.data.push({
                name: "utilSwitchArrayY.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilSwitchArrayY.switchArrayY",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -this.checkBoard
        -this.getBoardByGameAndUser
            -utilQueryConstructXgetBoard.queryConstructXgetBoard
                -utilQueryConstructor.queryConstructor
                -utilGetBoard.getBoard
        -this.updateBoardXbuildResult
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
    -utilTryCase.tryCase
*/
exports.checkBoardAndTryCase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoardAndTryCase"

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

    // test une case du plateau
    await this.checkBoard(req.body.gameId, req.otherUserId, req)
        .then(value => {
            // stoque le resultat (inclue le mot si réussi)
            req.check = value
            req.package.check = value

            req.data.push({
                name: "this.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.checkBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilTryCase.tryCase(req)
        .then(value => {
            req.tryCaseMessage = value
            req.package.tryCaseMessage = value

            req.data.push({
                name: "utilTryCase.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryCase.tryCase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
}

/*
subFunctions
    -this.getBoardByGameAndUser
        -utilQueryConstructXgetBoard.queryConstructXgetBoard
            -utilQueryConstructor.queryConstructor
            -utilGetBoard.getBoard
    -this.updateBoardXbuildResult
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
// check si la case du plateau testée est rempli avec un mot
exports.checkBoard = async ( gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoard"

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

    // récupère le plateau suivant son utilisateur et la partie
    await this.getBoardByGameAndUser(gameId, userId, req)
        .then(value => {
            // stoque le plateau dans la requette
            req.board = value.board
            req.package.board = value.board
            
            req.data.push({
                name: "this.getBoardByGameAndUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getBoardByGameAndUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la case du plateau n'est pas null
    if (req.board.board[req.arrayY][req.arrayX] !== null) {

        // si elle n'est pas null revelle la cas et retourn le mot
        await this.updateBoardXbuildResult(req)
            .then(value => {
                // stoque le resultat dans la requette
                req.result = value.result

                req.data.push({
                    name: "this.updateBoardXbuildResult",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.updateBoardXbuildResult",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    } else {
        // si la case est vide, stoque un resutat d'échèque dans la requete
        req.result = {
            result: false
        }
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.result
}

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