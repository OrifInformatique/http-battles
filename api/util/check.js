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


