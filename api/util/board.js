const Board = require('../models/Board')
const utilGame = require('../util/game')
const utilPhrase = require('../util/phrase')
const utilWord = require('../util/word')

// import fonctions util pour check
const utilCheck = require('../util/check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/board"

// ccrée un plateau de jeux
exports.createBoard = async (gameId, userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: createBoard"

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

    // crée un nouveaux plateau de jeux
    const board = new Board({
        gameId: gameId,
        userId: userId,
        board: [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ]
    })

    // stoque le plateau dans la base donnée
    await this.saveBoard(board, req)
        .then(value => {
            // retourne le plateau sauvegarder et le stoque dans la requete
            req.newBoard = value
            req.data.push({
                name: "this.saveBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.saveBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // retourne la variable traité pour la gestion d'erreur
    return req.newBoard
}

// stoque le plateua dans la requete
exports.saveBoard = async (board, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: saveBoard"

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

    // sauvegarde le plateau dans la base donnée
    await board.save()
        .then(value => {
            // stoque le plateau dans la requete
            req.newBoard = value
            req.data.push({
                name: "board.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "board.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoard
}

// retourne le plateau selon son id
exports.getBoard = async (req, boardId) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getBoard"

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

    // récupère le plateau dans la base données selon son id
    await Board.findOne({ _id: boardId })
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

// crée et remplie le plateau avec les mot de la phrase
exports.fillBoard = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: fillBoard"

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

    // crée le plateau pour le client pour une partie
    await this.createBoard(req.body.gameId, req.auth.userId, req)
        .then(value => {
            // stoque le plateau dans la requete
            req.board = value
            req.data.push({
                name: "this.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.createBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // crée une phrase en fonction de la phrase dans la requete
    await utilPhrase.createPhrase(req.board._id, req.body.phrase, req)
        .then(value => {
            // stoque la nouvele phrase dans le plateau de la requete
            req.board.phrase = value
            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilPhrase.createPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // insert la phrase dans le plateau du plateau de la requete
    await this.insertPhraseInBoard(req.board, req.board.phrase, req)
        .then(value => {
            // retourn le plateau rempli et le stoque dans le plateau de la requete
            req.board.board = value
            req.data.push({
                name: "this.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.insertPhraseInBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update le plateau de la requette
    await this.updateBoard(req)
        .then(value => {
            // stoque le plateau après update dans la requete
            req.board = value
            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.board
}

// insert les mot de la phrse dans le plateau selon leur position
exports.insertPhraseInBoard = async (board, userPhrase, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoard"

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

    // initialise le nouveau plateau qui sera remplit
    req.newBoardFull = []

    // parcoure l'ancien plateau dans le plateau de la requette
    for (const keyY in board.board) {
        // Crée et remplie les ligne du plateau
        await this.insertPhraseInBoardY(board, userPhrase, keyY, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardY",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.insertPhraseInBoardY",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
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
        await this.insertPhraseInBoardX(userPhrase, keyY, keyX, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardX",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.insertPhraseInBoardX",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}

// insert les case de la ligne du nouveaux plateaux et les remplie 
exports.insertPhraseInBoardX = async (userPhrase, keyY, keyX, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoardX"

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

    // parcour la phrase du plateaux
    for (const keyW in userPhrase.words) {
        // insert les mot de la phrase dans les case du plateaux si leurs positions est égal
        await this.insertPhraseInBoardW(userPhrase, keyY, keyX, keyW, req)
            .then(value => {
                req.data.push({
                    name: "this.insertPhraseInBoardW",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.insertPhraseInBoardW",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // si la case du tableau n'existe pas, la crée rempli d'une valeur null
    if (req.newBoardFull[keyY][keyX] === undefined) {
        req.newBoardFull[keyY].push(null)
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}

// insert les mot de la phrase dans les case du plateaux si leurs positions est égal
exports.insertPhraseInBoardW = async (userPhrase, keyY, keyX, keyW, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhraseInBoardW"

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

    // test si la position de la case est égal à la postion du mot
    if (userPhrase.words[keyW].position[0].toString() === keyY && userPhrase.words[keyW].position[1].toString() === keyX) {
        // si oui, rempli la case avec le mot
        req.newBoardFull[keyY].push(userPhrase.words[keyW])
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.newBoardFull
}

// check si la case du plateau testée est rempli avec un mot
exports.checkBoard = async (y, x, gameId, userId, req) => {
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
    await this.getBoardGameUser(gameId, userId, req)
        .then(value => {
            // stoque le plateau dans la requette
            req.board = value
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // test si la case du plateau n'est pas null
    if (req.board.board[y][x] !== null) {

        // si elle n'est pas null revelle la cas et retourn le mot
        await this.checkBoardSuccess(y, x, req)
            .then(value => {
                // stoque le resultat dans la requette
                req.result = value

                req.data.push({
                    name: "this.checkBoardSuccess",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.checkBoardSuccess",
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

// effectue les opération en cas de success pour le cheque de la case
exports.checkBoardSuccess = async (y, x, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: checkBoardSuccess"

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
    await utilWord.revealWord(req.board.board[y][x], req)
        .then(value => {
            // stoque le mot dans la case du tableau du plateau dans la requete
            req.board.board[y][x] = value

            req.data.push({
                name: "utilWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilWord.revealWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // updadet le plateau avec le nouveaux tableaux
    await this.updateBoard(req)
        .then(value => {
            // stoque le nouveaux tableaux dans la requete
            req.board = value

            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.updateBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // stoque le mot et le succes du check dans un objet résultat dans la requete
    req.result = {
        word: req.board.board[y][x],
        result: true
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.result
}

// update le plateau
exports.updateBoard = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: updateBoard"

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

    // update le tableau en fonction du contenu de la requete
    await Board.updateOne({ _id: req.board._id }, {
        $set: {
            gameId: req.board.gameId,
            userId: req.board.userId,
            phrase: req.board.phrase,
            board: req.board.board
        }
    })
        .then(value => {
            req.data.push({
                name: "Board.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Board.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère le tableau après l'update
    await this.getBoard(req, req.board._id)
        .then(value => {
            // stoque le tableaux dans la requete
            req.board = value

            req.data.push({
                name: "this.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.board
}

// test la phrase fourni par le client
exports.tryPhrase = async (adversaireId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhrase"

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

    // récupère le plateau en fonction d'un id utilisateur et d'un id de pertie
    await this.getBoardGameUser(req.body.gameId, adversaireId, req)
        .then(value => {
            // retourne le plateau de l'adversaire du client et le stoque dans la requete
            req.advBoard = value
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // intialise un compteur de mot de la phrase dans la requete
    req.wordCounter = 0
    // test si la phrase proposé par le client est la mème que celle de 'l'adversaire
    await this.tryPhraseCheckAdv(req.advBoard, req)
        .then(value => {
            // retourn le nombre de mot juste
            req.wordCounter = value
            req.data.push({
                name: "this.tryPhraseCheckAdv",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.tryPhraseCheckAdv",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    // si le nombre de mot just est égale à la longueur en mots de la phrase, renvoie vrai sinon faux
    if (req.wordCounter === req.advBoard.phrase.words.length) {
        return true
    } else {
        return false
    }
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

    // parcour la phrase du plateau adverse
    for (const keyAdv in advBoard.phrase.words) {
        // test si le mot est le même que celui de la requete et au même endroit
        await this.tryPhraseCheckReq(advBoard, req, keyAdv)
            .then(value => {
                // retourn le nombre de mot juste
                req.wordCounter = value
                req.data.push({
                    name: "this.tryPhraseCheckReq",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.tryPhraseCheckReq",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.wordCounter
}

// test si le mot est le même que celui de la requete et au même endroit
exports.tryPhraseCheckReq = async (advBoard, req, keyAdv) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseCheckReq"

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
        await this.tryPhraseCheckAll(advBoard, req, keyAdv, keyReq)
            .then(value => {
                // retourn le nombre de mot just
                req.wordCounter = value
                req.data.push({
                    name: "this.tryPhraseCheckAll",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "this.tryPhraseCheckAll",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreu
    return req.wordCounter
}

// test si le mot est le même que celui contenu dans le plateau
exports.tryPhraseCheckAll = async (advBoard, req, keyAdv, keyReq) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: tryPhraseCheckAll"

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

    // test si le mot est le mem que celui contenu dans cette case du plateau et au meme endroit
    if (advBoard.phrase.words[keyAdv].content === req.body.phrase[keyReq].word.content && keyAdv === keyReq) {
        // si oui, incremente le compteur de mot juste
        req.wordCounter = req.wordCounter + 1
    }

    // retourne la variable traitéeF pour la gestion d'erreu
    return req.wordCounter
}