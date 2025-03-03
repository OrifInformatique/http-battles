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
router.get('/games/createGame', auth, middleGame.createGame, gameCtrl.createGame)
// trouve une partie selon la clefs
router.get('/games/findGame', auth, middleGame.getGame, middleGame.formatedGame, gameCtrl.findGame)
// liste toute les partie en attente
router.get('/games/listGames', auth, middleGame.getGames, middleGame.formatedGames, gameCtrl.listGames)
// permet à un utilisateur de rjoindre une partie
router.post('/games/joinGame', auth, middleGame.getGame, middleGame.joinGame, middleGame.joinSuccessMessage, gameCtrl.joinGame)
// commence la partie
router.post('/games/startGame', auth, middleGame.getGame, middleGame.startMessage, gameCtrl.startGame)
// vérifie à qui est le tour
router.get('/games/checkTurn', auth, middleGame.getGame, middleGame.testTurn, gameCtrl.checkTurn)
// términe la partie
router.post('/games/endGame', auth, middleGame.endGame, gameCtrl.endGame)
// vérifie à qui est le tour
router.get('/games/tryPhrase', auth, middleGame.getGame, checkTurn.checkTurn, middleGame.tryPhraseResult, gameCtrl.tryPhrase)

// routes pour le jeux
router.all('/games/tryA', auth, middleGame.getGame, checkTurn.checkTurn, routeParam.a, middleGame.tryCase, gameCtrl.tryCase)

router.all('/games/tryB', auth, middleGame.getGame, checkTurn.checkTurn, routeParam.b, middleGame.tryCase, gameCtrl.tryCase)

router.all('/games/tryC', auth, middleGame.getGame, checkTurn.checkTurn, routeParam.c, middleGame.tryCase, gameCtrl.tryCase)

router.all('/games/tryD', auth, middleGame.getGame, checkTurn.checkTurn, routeParam.d, middleGame.tryCase, gameCtrl.tryCase)


// export le router
module.exports = router