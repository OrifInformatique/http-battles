const Phrase = require('../models/Phrase')
// import fonctions util pour word
const utilWord = require('../util/word')

const LOC_GLOB = "file: ../util/phrase"

// import fonctions util pour board
const utilCheck = require('../util/check')

// crée une phrase et l'enregistre dans la base donnée
exports.createPhrase = async (userPhrase, req) => {
    // test de la validité des données
    const LOC_LOC = "methode: createPhrase"

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

    // crée et rempli un tableaux de la phrase avec des objet mot suivant la phrase de la requete
    await this.fillPhrase(userPhrase, req)
        .then(value => {
            // retourn la phrase en tant que tableaux et la stoque dans la requete
            req.wordObjectsArray = value
            req.data.push({
                name: "this.fillPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.fillPhrase",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // crée un objet phrase avec le tableaux
    const phrase = new Phrase({
        words: req.wordObjectsArray
    })

    // enregistre la phrase dans la base de donnée
    await phrase.save()
        .then(value => {
            // stoque la phrase dans la requete
            req.phrase = value
            req.data.push({
                name: "phrase.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "phrase.save",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traitée pour la gestion d'erreur
    return req.phrase
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
        await utilWord.createWord(mot.word, req)
            .then(value => {
                // stoque l'objet mot dans la requete
                req.word = value
                req.data.push({
                    name: "utilWord.createWord",
                    loc: LOC_GLOB + " " + LOC_LOC,
                    value: value
                })
            })
            .catch(error => {
                req.data.push({
                    name: "utilWord.createWord",
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