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

const middleUser = require('../middleware/user')

const middleGame = require('../middleware/game')

const middleBoard = require('../middleware/board')

// créé une partie pour cette utilisateur
router.get('/games/createGame', auth, check.dataInit, middleGame.createGame, middleGame.saveGame, check.dataValidity, gameCtrl.createGame)
// trouve une partie selon la clefs
router.get('/games/findGame', auth, check.dataInit, middleGame.getGame, middleUser.getCreatorById, middleGame.getCreateurUsername, middleGame.formatedGame, check.dataValidity, gameCtrl.findGame)
// liste toute les partie en attente
router.get('/games/listGames', auth, check.dataInit, middleGame.getGames, middleGame.formatedGames, check.dataValidity, gameCtrl.listGames)
// permet à un utilisateur de rjoindre une partie
router.post('/games/joinGame', auth, check.dataInit, middleGame.getGame, middleGame.joinGame, middleGame.updateGame, middleUser.getCreatorById, middleUser.getUserById, middleGame.joinSuccessMessage, check.dataValidity, gameCtrl.joinGame)
// commence la partie
router.post('/games/startGame', auth, check.dataInit, check.checkReqDataStart, middleGame.getGame, middleGame.checkStartStat, middleGame.checkStartUserId, middleBoard.createBoard, middleBoard.insertPhrase, middleBoard.insertPhraseInBoard, middleBoard.fillBoard, middleGame.startMessageTest, middleGame.startMessage, middleGame.updateGame, check.dataValidity, gameCtrl.startGame)
// vérifie à qui est le tour
router.get('/games/checkTurn', auth, check.dataInit, middleGame.getGame, middleGame.testTurn, middleGame.getOtherUserId, middleBoard.getBoardGameUser, middleBoard.getBoardGameAdversaire, check.dataValidity, gameCtrl.checkTurn)
// términe la partie
router.post('/games/endGame', auth, check.dataInit, middleGame.endGame, middleGame.updateGame, check.dataValidity, gameCtrl.endGame)
// vérifie à qui est le tour
router.get('/games/tryPhrase', auth, check.dataInit, middleGame.getGame, check.checkTurn, middleGame.getOtherUserId, middleBoard.tryPhrase, middleGame.tryPhraseResult, check.dataValidity, gameCtrl.tryPhrase)

// routes pour le jeux
router.all('/games/tryA', auth, check.dataInit, middleGame.getGame, check.checkTurn, routeParam.a, middleGame.getOtherUserId, middleGame.switchArrayY, middleGame.switchArrayX, middleBoard.checkBoard, middleGame.tryCase, middleGame.switchTurn, middleGame.updateGame, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryB', auth, check.dataInit, middleGame.getGame, check.checkTurn, routeParam.b, middleGame.getOtherUserId, middleGame.switchArrayY, middleGame.switchArrayX, middleBoard.checkBoard, middleGame.tryCase, middleGame.switchTurn, middleGame.updateGame, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryC', auth, check.dataInit, middleGame.getGame, check.checkTurn, routeParam.c, middleGame.getOtherUserId, middleGame.switchArrayY, middleGame.switchArrayX, middleBoard.checkBoard, middleGame.tryCase, middleGame.switchTurn, middleGame.updateGame, check.dataValidity,  gameCtrl.tryCase)

router.all('/games/tryD', auth, check.dataInit, middleGame.getGame, check.checkTurn, routeParam.d, middleGame.getOtherUserId, middleGame.switchArrayY, middleGame.switchArrayX, middleBoard.checkBoard, middleGame.tryCase, middleGame.switchTurn, middleGame.updateGame, check.dataValidity,  gameCtrl.tryCase)


// export le router
module.exports = router