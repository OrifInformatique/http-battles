// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/testUserTurn"

// test quel utilisateur commence
exports.testUserTurn = async (gameUserId, reqId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: testUserTurn"

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

    // test si le client est le créateur
    // si oui
    if (gameUserId === reqId) {

        // renvoi un message pour informer que c'est le tour du client
        req.turn = { message: "CLIENT_TURN" }
        req.package.turn = { message: "CLIENT_TURN" }

        // si non
    } else {
        // renvoi un message pour informer que ce n'est pas le tour du client
        req.turn = { message: "ADVERSAIRE_TURN" }
        req.package.turn = { message: "ADVERSAIRE_TURN" }
    }
    
    return req.package
}