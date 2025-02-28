// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

const routeParam = require('../middleware/routeParam')

const checkTurn = require('../middleware/checkTurn')

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
router.get('/games/checkTurn', auth, gameCtrl.checkTurn)
// términe la partie
router.post('/games/endGame', auth, gameCtrl.endGame)
// vérifie à qui est le tour
router.get('/games/tryPhrase', auth, checkTurn.checkTurn, gameCtrl.tryPhrase)

// routes pour le jeux
router.all('/games/tryA', auth, checkTurn.checkTurn, routeParam.a, gameCtrl.tryCase)

router.all('/games/tryB', auth, checkTurn.checkTurn, routeParam.b, gameCtrl.tryCase)

router.all('/games/tryC', auth, checkTurn.checkTurn, routeParam.c, gameCtrl.tryCase)

router.all('/games/tryD', auth, checkTurn.checkTurn, routeParam.d, gameCtrl.tryCase)


// export le router
module.exports = router