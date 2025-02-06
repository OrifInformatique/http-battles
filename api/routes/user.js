// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité utilisateur
const userCtrl = require('../controllers/user')

// redirige la requette post de création utilisateur
router.post('/signup', userCtrl.signup)
// redirige la requet post de connexion utilisateur
router.post('/login', userCtrl.login)

// export le router
module.exports = router