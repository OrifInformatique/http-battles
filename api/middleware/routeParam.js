const LOC_GLOB = "file: ../middleware/routeParam"

exports.a = (req, res, next) => {
    const LOC_LOC = "methode: a"
    // test le code contenu
    try {
        req.route = "A"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        req.data.push({
            name: "a",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

}

exports.b = (req, res, next) => {
    const LOC_LOC = "methode: b"
    // test le code contenu
    try {
        req.route = "B"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        req.data.push({
            name: "b",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

}

exports.c = (req, res, next) => {
    const LOC_LOC = "methode: c"
    // test le code contenu
    try {
        req.route = "C"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        req.data.push({
            name: "c",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

}

exports.d = (req, res, next) => {
    const LOC_LOC = "methode: d"
    // test le code contenu
    try {
        req.route = "D"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        req.data.push({
            name: "d",
            loc: LOC_GLOB + " " + LOC_LOC,
            error: error
        })
    }

}

exports.getParams = (req, res, next) => {
    const LOC_LOC = "methode: getParams"
    
    if(req.query !== undefined){
        for(const i in req.query){

            req.body[i] = req.query[i]
        }
        next()
    } else {
        // renvoie le status de l'erreur
        res.status(400).json({ error })
    }

}