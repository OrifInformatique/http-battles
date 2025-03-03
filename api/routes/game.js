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

const middleGame = require('../middleware/game')

// créé une partie pour cette utilisateur
router.get('/games/createGame', auth, gameCtrl.createGame)
// trouve une partie selon la clefs
router.get('/games/findGame', auth, middleGame.getGame, middleGame.formatedGame, gameCtrl.findGame)
// liste toute les partie en attente
router.get('/games/listGames', auth, middleGame.getGames, middleGame.formatedGames, gameCtrl.listGames)
// permet à un utilisateur de rjoindre une partie
router.post('/games/joinGame', auth, middleGame.getGame, gameCtrl.joinGame)
// commence la partie
router.post('/games/startGame', auth, middleGame.getGame, gameCtrl.startGame)
// vérifie à qui est le tour
router.get('/games/checkTurn', auth, middleGame.getGame, gameCtrl.checkTurn)
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