const Word = require('../models/Word')

// import fonctions util pour board
const utilCheck = require('../util/check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/word"

// récupère le mot suivant son id
exports.getWord = async (wordId, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: getWord"

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

    // retourn le mot dans la base donée suivant son id
    await Word.findOne({ _id: wordId })
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
            req.data.push({
                name: "Word.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Word.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.word
}

// crée un objet mot
exports.createWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createWord"

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

    // crée un nouvel objet mot avec les info en parametre
    const newWord = new Word({
        content: word.content,
        position: word.position
    })

    // enregistre le mot dans la base deonnées
    await newWord.save()
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
            req.data.push({
                name: "newWord.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "newWord.save()",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.word
}

// Reveal le mot
exports.revealWord = async (word, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: revealWord"

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
    await Word.updateOne({ _id: word._id }, {
        $set: {
            revealed: true
        }
    })
        .then(value => {
            req.data.push({
                name: "Word.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "Word.updateOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })
    
    // récupère le mot après l'update
    await this.getWord(word._id, req)
        .then(value => {
            // stoque le mot dans la requete
            req.word = value
            req.data.push({
                name: "this.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.getWord",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.word
}
