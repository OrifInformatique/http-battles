
// import le schema d'un utilisateur
const User = require("../../../../../../../../models/User")

// import fonctions util pour check
const utilCheck = require('../../../../../../../check')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../depthBottom/getUserById"

// récupère un utilisateur suivant sin id
exports.getUserById = async (userId, req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: getUserById"

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

    // récupère un tulisateur suivant son id
    await User.findOne({ _id: userId })
        .then(value => {
            // stoque l'utilisateur dans la requete
            req.user = value
            req.package.user = value
            req.data.push({
                name: "User.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })

        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "User.findOne",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // retourne la variable traité pour la gestion d'erreur
    return req.package
}