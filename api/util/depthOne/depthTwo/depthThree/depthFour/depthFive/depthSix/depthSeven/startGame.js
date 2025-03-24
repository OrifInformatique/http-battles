
// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

const utilInsertWord = require('./depthBottom/insertWord')

const utilInsertBlank = require('./depthBottom/insertBlank')


// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthSeven/startGame"


/*
subFunctions
    -this.phraseLoopAndTestCase
        -this.testTableWord
            -utilInsertWord.insertWord
        -this.testTableVoid
            -utilInsertBlank.insertBlank
*/
// Crée et remplie les ligne du plateau
exports.lineLoopAndPhraseLoop = async (board, userPhrase, keyY, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: lineLoopAndPhraseLoop"

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
    req.package.newBoardFull.push([])

    // parcour les case de la ligne Y de l'ancient plateaux
    for (const keyX in board.board[keyY]) {
        // insert les case de la ligne du nouveaux plateaux et les remplie 
        await this.phraseLoopAndTestCase(userPhrase, keyY, keyX, req)
            .then(value => {
                req.data.push({
                    name: "this.phraseLoopAndTestCase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.phraseLoopAndTestCase",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }
    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -this.testTableWord
        -utilInsertWord.insertWord
    -this.testTableVoid
        -utilInsertBlank.insertBlank
*/
// insert les case de la ligne du nouveaux plateaux et les remplie 
exports.phraseLoopAndTestCase = async (userPhrase, keyY, keyX, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: phraseLoopAndTestCase"

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
        await this.testTableWord(userPhrase, keyY, keyX, keyW, req)
            .then(value => {
                req.data.push({
                    name: "this.testTableWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "this.testTableWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    await this.testTableVoid(keyY, keyX, req)
        .then(value => {
            req.data.push({
                name: "this.utilTestTableVoid",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.utilTestTableVoid",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable  pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -utilInsertWord.insertWord
*/
// insert les mot de la phrase dans les case du plateaux si leurs positions est égal
exports.testTableWord = async (userPhrase, keyY, keyX, keyW, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTableWord"

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
        await utilInsertWord.insertWord(userPhrase, keyY, keyW, req)
            .then(value => {
                req.data.push({
                    name: "utilInsertWord.insertWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilInsertWord.insertWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}

/*
subFunctions
    -utilInsertBlank.insertBlank
*/
// insert les cases vides
exports.testTableVoid = async (keyY, keyX, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testTableVoid"

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

    // si la case du tableau n'existe pas, la crée rempli d'une valeur null
    if (req.newBoardFull[keyY][keyX] === undefined) {
        await utilInsertBlank.insertBlank(keyY, req)
            .then(value => {
                req.data.push({
                    name: "utilInsertBlank.insertBlank",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                console.log(error)
                req.data.push({
                    name: "utilInsertBlank.insertBlank",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    error: error
                })
            })
    }

    // retourne la variable traitéeF pour la gestion d'erreur
    return req.package
}


