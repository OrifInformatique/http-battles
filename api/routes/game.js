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

// permet à un utilisateur de rejoindre une partie
router.post('/games/joinGame', auth, check.dataInit, check.checkReqDataJoinGame, middleGame.joinGame, check.logInit, check.dataValidity, gameCtrl.joinGame)

// permet à un utilisateur de rejoindre une partie
router.put('/games/joinGameV2', auth, check.dataInit, middleGame.joinGameV2, check.logInit, check.dataValidity, gameCtrl.joinGameV2)


// commence la partie
router.post('/games/startGame', auth, check.dataInit, check.checkReqDataStartGame, middleGame.startGame, check.logInit, check.dataValidity, gameCtrl.startGame)

// commence la partie
router.post('/games/startGameV2', auth, check.dataInit, middleGame.startGameV2, check.logInit, check.dataValidity, gameCtrl.startGameV2)


// vérifie à qui est le tour
router.get('/games/checkTurn', auth, check.dataInit, check.checkReqDataCheckTurn, middleGame.checkTurn, check.logInit, check.dataValidity, gameCtrl.checkTurn)

// términe la partie
router.post('/games/endGame', auth, check.dataInit, check.checkReqDataEndGame, middleGame.endGame, check.logInit, check.dataValidity, gameCtrl.endGame)

// términe la partie
router.post('/games/endGameV2', auth, check.dataInit, middleGame.endGameV2, check.logInit, check.dataValidity, gameCtrl.endGameV2)

// vérifie à qui est le tour
router.get('/games/tryPhrase', auth, check.dataInit, check.checkReqDataTryPhrase, /*check.checkTurn,*/ middleGame.tryPhrase, check.logInit, check.dataValidity, gameCtrl.tryPhrase)

// vérifie à qui est le tour
router.get('/games/tryPhraseV2', auth, check.dataInit, middleGame.tryPhraseV2, check.logInit, check.dataValidity, gameCtrl.tryPhraseV2)

// routes pour le jeux
router.all('/games/tryA', auth, check.dataInit, check.checkReqDataTryCase, /*check.checkTurn,*/ routeParam.a, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryB', auth, check.dataInit, check.checkReqDataTryCase, check.checkTurn, routeParam.b, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryC', auth, check.dataInit, check.checkReqDataTryCase, check.checkTurn, routeParam.c, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryD', auth, check.dataInit, check.checkReqDataTryCase, check.checkTurn, routeParam.d, middleGame.tryCase, check.logInit, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryAV2', auth, check.dataInit, routeParam.a, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryBV2', auth, check.dataInit, routeParam.b, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryCV2', auth, check.dataInit, routeParam.c, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryDV2', auth, check.dataInit, routeParam.d, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)


// export le router
module.exports = router