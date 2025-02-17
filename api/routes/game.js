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

router.post('/games/startGame', auth, gameCtrl.startGame)

router.post('/games/checkTurn', auth, gameCtrl.checkTurn)

// export le router
module.exports = router