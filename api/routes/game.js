// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

// créé une partie
router.get('/games/createGame', auth, gameCtrl.createGame)

router.get('/games/findGame', auth, gameCtrl.findGame)

router.get('/games/listGames', auth, gameCtrl.listGames)

router.post('/games/joinGame', auth, gameCtrl.joinGame)

// export le router
module.exports = router