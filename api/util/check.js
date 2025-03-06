exports.dataValidityTest = async (req, next) => {
    if (req.data !== undefined) {
        console.log("data")
        for (const d of req.data) {
            console.log(d)
            if (d.value === null || d.value === undefined) {
                console.log("test")
                if (next !== undefined) {
                    next()
                }

                return true
            } else {

                return false
            }
        }
    }
}

exports.dataValidityFilter = async (req, filterName) => {
    if (req.data !== undefined) {
        for (const d of req.data) {
            if (d.value === null || d.value === undefined) {
                if (d.name === filterName) {
                    d.value = "not found"
                }
            }
        }
    }
}