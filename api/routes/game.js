// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')

// créé une partie
router.get('/games', gameCtrl.createGame)

// export le router
module.exports = router