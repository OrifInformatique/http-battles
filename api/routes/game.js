// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

// créé une partie pour cette utilisateur
router.get('/games/createGame', auth, gameCtrl.createGame)
// trouve une partie selon la clefs
router.get('/games/findGame', auth, gameCtrl.findGame)
// liste toute les partie en attente
router.get('/games/listGames', auth, gameCtrl.listGames)
// permet à un utilisateur de rjoindre une partie
router.post('/games/joinGame', auth, gameCtrl.joinGame)
// commence la partie
router.post('/games/startGame', auth, gameCtrl.startGame)
// vérifie à qui est le tour
router.post('/games/checkTurn', auth, gameCtrl.checkTurn)
// términe la partie
router.post('/games/endGame', auth, gameCtrl.endGame)

// routes Get pour le jeux
router.get('/games/tryA', auth, gameCtrl.tryGetA)

router.get('/games/tryB', auth, gameCtrl.tryGetB)

router.get('/games/tryC', auth, gameCtrl.tryGetC)

router.get('/games/tryD', auth, gameCtrl.tryGetD)

// routes Post pour le jeux
router.post('/games/tryA', auth, gameCtrl.tryPostA)

router.post('/games/tryB', auth, gameCtrl.tryPostB)

router.post('/games/tryC', auth, gameCtrl.tryPostC)

router.post('/games/tryD', auth, gameCtrl.tryPostD)

// routes Put pour le jeux
router.put('/games/tryA', auth, gameCtrl.tryPutA)

router.put('/games/tryB', auth, gameCtrl.tryPutB)

router.put('/games/tryC', auth, gameCtrl.tryPutC)

router.put('/games/tryD', auth, gameCtrl.tryPutD)

// routes Delete pour le jeux
router.delete('/games/tryA', auth, gameCtrl.tryDeleteA)

router.delete('/games/tryB', auth, gameCtrl.tryDeleteB)

router.delete('/games/tryC', auth, gameCtrl.tryDeleteC)

router.delete('/games/tryD', auth, gameCtrl.tryDeleteD)

// export le router
module.exports = router