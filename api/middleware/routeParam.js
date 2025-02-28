
exports.a = (req, res, next) => {
    // test le code contenu
    try {
        req.route = "A"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        // renvoie le status de l'erreur
        res.status(401).json({ error })
    }

}

exports.b = (req, res, next) => {
    // test le code contenu
    try {
        req.route = "B"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        // renvoie le status de l'erreur
        res.status(401).json({ error })
    }

}

exports.c = (req, res, next) => {
    // test le code contenu
    try {
        req.route = "C"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        // renvoie le status de l'erreur
        res.status(401).json({ error })
    }

}

exports.d = (req, res, next) => {
    // test le code contenu
    try {
        req.route = "D"
        // fait suivre au prochain middleware
        next()
        // en cas d'erreur
    } catch (error) {
        // renvoie le status de l'erreur
        res.status(401).json({ error })
    }

}