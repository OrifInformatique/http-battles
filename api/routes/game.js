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

// Get
router.get('/games/tryA', auth, gameCtrl.tryGetA)

router.get('/games/tryB', auth, gameCtrl.tryGetB)

router.get('/games/tryC', auth, gameCtrl.tryGetC)

router.get('/games/tryD', auth, gameCtrl.tryGetD)

// Post
router.post('/games/tryA', auth, gameCtrl.tryPostA)

router.post('/games/tryB', auth, gameCtrl.tryPostB)

router.post('/games/tryC', auth, gameCtrl.tryPostC)

router.post('/games/tryD', auth, gameCtrl.tryPostD)

// Put
router.put('/games/tryA', auth, gameCtrl.tryPutA)

router.put('/games/tryB', auth, gameCtrl.tryPutB)

router.put('/games/tryC', auth, gameCtrl.tryPutC)

router.put('/games/tryD', auth, gameCtrl.tryPutD)

// Delete
router.delete('/games/tryA', auth, gameCtrl.tryDeleteA)

router.delete('/games/tryB', auth, gameCtrl.tryDeleteB)

router.delete('/games/tryC', auth, gameCtrl.tryDeleteC)

router.delete('/games/tryD', auth, gameCtrl.tryDeleteD)

// export le router
module.exports = router