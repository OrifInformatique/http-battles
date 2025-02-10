// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')

// redirige la requette post de création utilisateur
// créé une partie
router.get('/gameCreation', gameCtrl.gameCreation)
// redirige la requet post de connexion utilisateur
//router.post('/login', userCtrl.login)

// export le router
module.exports = router