

// import fonctions util pour check
const utilCheck = require('../../../check')

// import les fonction utiles pour utilisateur
const utilGetGame = require('./depthFour/getGame')

// import les fonction utiles pour utilisateur
const utilGetOtherUserId = require('./depthFour/depthFive/depthSix/depthBottom/getOtherUserId')

// import les fonction utiles pour tryPhrase
const utilTryPhrase = require('./depthFour/tryPhrase')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthThree/tryPhrase"

exports.findGameAndOtherUserId = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: findGameAndOtherUserId"

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

    await utilGetGame.getGame(req)
        .then(value => {
            // stock l'objet jeux dans la requette
            req.package.game = value
            req.game = value

            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetGame.getGame",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // récupère l'identifiant de l'opposant du client dans la partie en cours
    await utilGetOtherUserId.getOtherUserId(req)
        .then(value => {
            // stoque l'id de l'opposant dans la requette
            req.package.otherUserId = value.otherUserId
            req.otherUserId = value.otherUserId

            req.data.push({
                name: "utilGetOtherUserId.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetOtherUserId.getOtherUserId",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package
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
    await utilTryPhrase.getBoardGameUser(req.body.gameId, adversaireId, req)
        .then(value => {
            // retourne le plateau de l'adversaire du client et le stoque dans la requete
            req.advBoard = value
            req.data.push({
                name: "utilTryPhrase.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.getBoardGameUser",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })


    // test si la phrase proposé par le client est la mème que celle de 'l'adversaire
    await utilTryPhrase.tryPhraseCheckAdv(req.advBoard, req)
        .then(value => {
            // retourn le nombre de mot juste
            req.wordCounter = value
            req.data.push({
                name: "utilTryPhrase.tryPhraseCheckAdv",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilTryPhrase.tryPhraseCheckAdv",
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
