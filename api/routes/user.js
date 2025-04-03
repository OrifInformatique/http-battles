// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité utilisateur
const userCtrl = require('../controllers/user')

const middleUser = require('../middleware/user')

const check = require('../middleware/check')

const auth = require('../middleware/auth')

// redirige la requette post de création utilisateur
router.post('/user/signup', userCtrl.signup)
// redirige la requet post de connexion utilisateur
router.post('/user/login', userCtrl.login)

router.post('/user/find', auth, check.dataInit, middleUser.findUser, check.logInit, check.dataValidity, userCtrl.findUser)

// export le router
module.exports = router