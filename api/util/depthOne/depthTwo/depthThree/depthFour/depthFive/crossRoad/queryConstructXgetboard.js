

// import fonctions util pour check
const utilCheck = require('../../../../../../check')

const utilQueryConstructor = require('../depthBottom/queryConstructor')

const utilGetBoard = require('../depthBottom/getBoard')

// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/../crossRoad/queryConstructXgetBoard"

/*
subFunctions
    -utilQueryConstructor.queryConstructor
    -utilGetBoard.getBoard
*/
exports.queryConstructXgetBoard = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: queryConstructXgetBoard"

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

    await utilQueryConstructor.queryConstructor(req)
        .then(value => {
            req.query = value.query
            req.package.query = value.query

            req.data.push({
                name: "utilQueryConstructor.queryConstructor",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilQueryConstructor.queryConstructor",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await utilGetBoard.getBoard(req)
        .then(value => {
            req.board = value.board
            req.package.board = value.board

            req.data.push({
                name: "utilGetBoard.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "utilGetBoard.getBoard",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.package

}