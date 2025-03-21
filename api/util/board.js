const Board = require('../models/Board')

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
    await this.createBoard(req.body.gameId, req.auth.userId, req)
        .then(value => {
            //stoque le plateau dans la requete
            req.package.board = value
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

    await this.insertAndSavePhrase(req)
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
                name: "this.insertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.insertPhrase",
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

    await this.insertPhrase(req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value.board.phrase
            req.board.phrase = value.board.phrase
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value.board.board
            req.board.board = value.board.board

            req.data.push({
                name: "this.insertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.insertPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // update le plateau dans la requete
    await this.updateBoard(req)
        .then(value => {
            // stoque le plateu après update dans la requete
            req.package.board = value
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

    return req.package
}

exports.insertPhrase = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: insertPhrase"

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

    // crée la phrase (objet)
    await utilPhrase.createPhrase(req.body.phrase, req)
        .then(value => {
            // insert la phrase (objet) dans le plateau (objet) del requete
            req.package.board.phrase = value
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

    // insert la phrase (suite de mots) dans le plateau (table)
    await this.insertPhraseInBoard(req.board, req.board.phrase, req)
        .then(value => {
            // stoque le plateau (table) rempli dans le plateau (objet)
            req.package.board.board = value
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

    return req.package
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

