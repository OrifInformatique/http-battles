// import express
const express = require('express')
// crée un router
const router = express.Router()

const logCtrl = require('../controllers/log')

// importe les fonctionalité d'authorisation moderateur
const modAut = require('../middleware/modAut')

/**
 * recupère la liste des logs suivant les informations fourni par le client
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "_id": "",          // id du log (facultatif)
 *      "user": {           // contient les informations sur le client dont on veut les logs (facultatif)
 *                  ...
 *              },          
 *      "game": {           // contient les informations sur la partie dont on veut les logs (facultatif)
 *                  ...
 *              }, 
 *      "year": "",         // année du log (facultatif)
 *      "month": "",        // mois du log (facultatif)
 *      "day": "",          // jours du log (facultatif)
 *      "hour": "",         // heur du log (facultatif)
 *      "minute": "",       // minute du log (facultatif)
 *      "data": {           // contient les informations sur les données du log que l'ont désire récupéré (facultatif) renvoit toute les données si vide et aucune si non inclus
 *                  "name": "Player.find",                                      // nom de la donnée (facultatif)
 *                  "loc": "file: ../util/player/find methode: findPlayer",​     // localisation de la données (facultatif)
 *                  "value":    {                                               // contient les informations sur les valeurs contenue dans la données que l'on désire (facultatif) renvoit toute les valeurs si vide et aucune si non inclus. Ne fonctionne que avec 1 degré d'abstractions
 *                                  ...
 *                              }
 *              }
 *  }
 * 
 * */ 
router.post('/log/listLog', modAut, logCtrl.listLogs)

/**
 * recupère la liste des logs suivant les informations fourni par le client de manière récursive sans limite d'abstraction
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "_id": "",          // id du log (facultatif)
 *      "user": {           // contient les informations sur le client dont on veut les logs (facultatif)
 *                  ...
 *              },          
 *      "game": {           // contient les informations sur la partie dont on veut les logs (facultatif)
 *                  ...
 *              }, 
 *      "year": "",         // année du log (facultatif)
 *      "month": "",        // mois du log (facultatif)
 *      "day": "",          // jours du log (facultatif)
 *      "hour": "",         // heur du log (facultatif)
 *      "minute": "",       // minute du log (facultatif)
 *      "data": {           // contient les informations sur les données du log que l'ont désire récupéré (facultatif) renvoit toute les données si vide et aucune si non inclus
 *                  "name": "Player.find",                                      // nom de la donnée (facultatif)
 *                  "loc": "file: ../util/player/find methode: findPlayer",​     // localisation de la données (facultatif)
 *                  "value":    {                                               // contient les informations sur les valeurs contenue dans la données que l'on désire (facultatif) renvoit toute les valeurs si vide et aucune si non inclus
 *                                  ...
 *                              }
 *              }
 *  }
 * 
 * */ 
router.post('/log/listLogV3', modAut, logCtrl.listLogsV3)

// export le router
module.exports = router