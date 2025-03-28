// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

const routeParam = require('../middleware/routeParam')

const check = require('../middleware/check')

const middleGame = require('../middleware/game')


// créé une partie pour cette utilisateur
router.get('/games/createGame', auth, check.dataInit, middleGame.createGame, check.logInit, check.dataValidity, gameCtrl.createGame)

// créé une partie pour cette utilisateur
router.post('/games/createGameV2', auth, check.dataInit, middleGame.createGameV2, check.logInit, check.dataValidity, gameCtrl.createGameV2)

// trouve une partie selon la clefs
router.get('/games/findGame', auth, check.dataInit, check.checkReqDataFindGame, middleGame.findGame, check.logInit, check.dataValidity, gameCtrl.findGame)

// trouve une partie selon la clefs
router.get('/games/findGamesV2', auth, check.dataInit, middleGame.findGamesV2, check.logInit, check.dataValidity, gameCtrl.findGamesV2)

// liste toute les partie en attente
router.get('/games/listGames', auth, check.dataInit, middleGame.listGames, check.logInit, check.dataValidity, gameCtrl.listGames)

// permet à un utilisateur de rjoindre une partie
router.post('/games/joinGame', auth, check.dataInit, check.checkReqDataJoinGame, middleGame.joinGame, check.logInit, check.dataValidity, gameCtrl.joinGame)
// commence la partie
router.post('/games/startGame', auth, check.dataInit, check.checkReqDataStartGame, middleGame.startGame, check.logInit, check.dataValidity, gameCtrl.startGame)
// vérifie à qui est le tour
router.get('/games/checkTurn', auth, check.dataInit, check.checkReqDataCheckTurn, middleGame.checkTurn, check.logInit, check.dataValidity, gameCtrl.checkTurn)
// términe la partie
router.post('/games/endGame', auth, check.dataInit, check.checkReqDataEndGame, middleGame.endGame, check.logInit, check.dataValidity, gameCtrl.endGame)
// vérifie à qui est le tour
router.get('/games/tryPhrase', auth, check.dataInit, check.checkReqDataTryPhrase, /*check.checkTurn,*/ middleGame.tryPhrase, check.logInit, check.dataValidity, gameCtrl.tryPhrase)

// routes pour le jeux
router.all('/games/tryA', auth, check.dataInit, check.checkReqDataTryCase, /*check.checkTurn,*/ routeParam.a, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryB', auth, check.dataInit, check.checkReqDataTryCase, check.checkTurn, routeParam.b, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryC', auth, check.dataInit, check.checkReqDataTryCase, check.checkTurn, routeParam.c, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryD', auth, check.dataInit, check.checkReqDataTryCase, check.checkTurn, routeParam.d, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)


// export le router
module.exports = router