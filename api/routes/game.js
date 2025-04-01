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

router.post('/games/testAll', auth, check.dataInit, middleGame.testAll, check.logInit, check.dataValidity, gameCtrl.testAll)

// créé une partie pour cette utilisateur
router.post('/games/createGame', auth, check.dataInit, middleGame.createGameV2, check.logInit, check.dataValidity, gameCtrl.createGameV2)

// trouve une partie selon la clefs
router.get('/games/findGames', auth, check.dataInit, middleGame.findGamesV2, check.logInit, check.dataValidity, gameCtrl.findGamesV2)

// permet à un utilisateur de rejoindre une partie
router.put('/games/joinGame', auth, check.dataInit, middleGame.joinGameV2, check.logInit, check.dataValidity, gameCtrl.joinGameV2)

// commence la partie
router.put('/games/startGame', auth, check.dataInit, middleGame.startGameV2, check.logInit, check.dataValidity, gameCtrl.startGameV2)

// términe la partie
router.put('/games/endGame', auth, check.dataInit, middleGame.endGameV2, check.logInit, check.dataValidity, gameCtrl.endGameV2)

// vérifie à qui est le tour
router.put('/games/tryPhrase', auth, check.dataInit, middleGame.tryPhraseV2, check.logInit, check.dataValidity, gameCtrl.tryPhraseV2)

router.all('/games/tryA', auth, check.dataInit, routeParam.a, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryB', auth, check.dataInit, routeParam.b, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryC', auth, check.dataInit, routeParam.c, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryD', auth, check.dataInit, routeParam.d, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)


// export le router
module.exports = router