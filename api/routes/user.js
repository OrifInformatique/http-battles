// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité utilisateur
const userCtrl = require('../controllers/user')

const middleUser = require('../middleware/user')

const check = require('../middleware/check')

// importe les fonctionalité d'authorisation moderateur
const modAut = require('../middleware/modAut')

// importe les fonctionalité d'authorisation moderateur
const auth = require('../middleware/auth')

// redirige la requette post de création utilisateur
router.post('/user/signup', check.dataInit, middleUser.signup, check.logInit, check.dataValidity, userCtrl.signup)

// redirige la requet post de connexion utilisateur
router.post('/user/login', check.dataInit, middleUser.login, check.logInit, check.dataValidity, userCtrl.login)

// retourne une liste des profils utilisateurs
router.post('/user/findUsers', modAut, check.dataInit, middleUser.findUser, check.logInit, check.dataValidity, userCtrl.findUser)

// retourne une liste des profils utilisateurs
router.put('/user/updateUser', auth, check.dataInit, middleUser.updateUser, check.logInit, check.dataValidity, userCtrl.updateUser)

// export le router
module.exports = router