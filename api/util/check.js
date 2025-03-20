// location global pour la gestion d'erreur
const LOC_GLOB = "file: ../util/check"


// test si les donnée sont valide
exports.dataValidityTest = async (req, next) => {

    if (req.data !== undefined && req.data !== null && req.data.length > 0) {

        for (const d of req.data) {

            if (d.value === null || d.value === undefined) {
                if (next !== undefined) {
                    next()
                }

                return true
            }
        }
        return false
    } else {

        return false
    }
}

exports.dataValidityFilter = async (req, filterName) => {
    req.filteredData = []
    if (req.data !== undefined) {
        for (const d of req.data) {
            if (d.value === null || d.value === undefined) {
                if (d.name === filterName) {
                    d.value = "not found"
                    req.filteredData.push(d)
                }
            }
        }
    }
    return req.filteredData
}



exports.dataValidityFilterListGame = async (req) => {
    // location local pour la gestion d'erreur
    const LOC_LOC = "methode: dataValidityFilterListGameCreatorId"

    // filtre les erreur de la fonction User.findOne qui sont attendue à cause des donnée invalides
    await this.dataValidityFilter(req, "User.findOne")
        .then(value => {

            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    await this.dataValidityFilter(req, "utilUser.getUserById")
        .then(value => {

            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction User.findOne qui sont attendue à cause des donnée invalides
    await this.dataValidityFilter(req, "utilUser.getCreatorFiltered")
        .then(value => {

            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    // filtre les erreur de la fonction User.findOne qui sont attendue à cause des donnée invalides
    await this.dataValidityFilter(req, "utilGetUser.getUserById")
        .then(value => {

            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                value: value
            })
        })
        .catch(error => {
            console.log(error)
            req.data.push({
                name: "this.dataValidityFilter",
                loc: LOC_GLOB + " " + LOC_LOC,
                error: error
            })
        })

    return req.filteredData
}