
// import fonctions util pour res
const utilRes = require('../util/res')

// exporte la fonctionalité de création d'un utilisateur
exports.signup = (req, res, next) => {
  utilRes.sendSuccess(200, req.body.user, res)
}

// export les fonctionalité de connexion utilisateur
exports.login = (req, res, next) => {
  utilRes.sendSuccess(200, req.body.answer, res)
}

// renvoit une list d'utilisateur
exports.findUser = async (req, res, next) => {
  utilRes.sendSuccess(200, req.body.users, res)
}
