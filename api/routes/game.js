/**
 * Role:    Route pour les fonctionnalité des parties
 * Date:    0.3.06.2025
 * 
 */


// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const gameCtrl = require('../controllers/game')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

// importe les fonctionalité d'authorisation moderateur
const modAut = require('../middleware/modAut')

const routeParam = require('../middleware/routeParam')

const check = require('../middleware/check')

const middleGame = require('../middleware/game')

router.all('/games/testAll', modAut, check.dataInit, middleGame.testAll, check.logInit, check.dataValidity, gameCtrl.testAll)

// créé une partie pour cette utilisateur
router.all('/games/createGame', auth, check.dataInit, middleGame.createGameV2, check.logInit, check.dataValidity, gameCtrl.createGameV2)

/**
 * trouve une partie selon la clefs
 *  
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "gameId": "",       // id de la partie (facultatif)
 *      "creatorId": "",    // id du créateur de la partie (facultatif) 
 *      "gameStatus": ""    // statut de la partie (facultatif)
 *  }
 * 
 * gameStatus possible: 
 *  - "WAITING_CHALLENGER"
 *  - "SETTINGS"
 *  - "PLAYING"
 *  - "WON"
 *  - "EMDED"
 * 
 * */ 
router.post('/games/findGames', auth, check.dataInit, middleGame.findGamesV2, check.logInit, check.dataValidity, gameCtrl.findGamesV2)

// permet à un utilisateur de rejoindre une partie
router.all('/games/joinGame', auth, check.dataInit, middleGame.joinGameV2, check.logInit, check.dataValidity, gameCtrl.joinGameV2)

// commence la partie
router.all('/games/startGame', auth, check.dataInit, middleGame.startGameV2, check.logInit, check.dataValidity, gameCtrl.startGameV2)

// términe la partie
router.all('/games/endGame', auth, check.dataInit, middleGame.endGameV2, check.logInit, check.dataValidity, gameCtrl.endGameV2)

// test la phrase du client
router.all('/games/tryPhrase', auth, check.dataInit, middleGame.tryPhraseV2, check.logInit, check.dataValidity, gameCtrl.tryPhraseV2)

router.all('/games/tryA', auth, check.dataInit, routeParam.a, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryB', auth, check.dataInit, routeParam.b, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryC', auth, check.dataInit, routeParam.c, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryD', auth, check.dataInit, routeParam.d, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)


// export le router
module.exports = router