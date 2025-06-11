# http-battles
HTTP Battles - Jeu d'initiation au protocole HTTP

## API
Cette section à pour but d'expliquer la structure et le fonctionnement de l'API pour faciliter les interactions et future devellopement associer

### Index
1.  [Outils utilisé](#1-outils-utilisé)
    -   1A. [Express.js](#1a-expressjs)
    -   1B. [MongoDB](#1b-mongodb)
        - 1B1. [schemas](#1b1-schemas)
        - 1B2. [MongoDB Atlas](#1b2-mongodb-atlas)
    -   1C. [Node.js](#1c-nodejs)
        - 1C1. [dotenv](#1c1-dotenv)
2.  [index.js et app.js](#2-indexjs-et-appjs)
    -   2A. [index.js](#2a-indexjs)
    -   2B. [app.js](#2b-appjs)
3.  [routes](#3-routes)
    -   3A. [game.js](#3a-gamejs)
        - 3A1 [api/games/createGame](#3a1-apigamescreategame)
        - 3A2 [api/games/findGames](#3a2-apigamesfindgames)
        - 3A3 [api/games/joinGame](#3a3-apigamesjoingame)
        - 3A4 [api/games/startGame](#3a4-apigamesstartgame)
        - 3A5 [api/games/tryPhrase](#3a5-apigamestryphrase)
        - 3A6 [api/games/try...](#3a6-apigamestry)
        - 3A7 [api/games/endGame](#3a7-apigamesendgame)
        - 3A8. [api/games/testAll](#3a8-apigamestestall)
    -   3B. [user.js](#3b-userjs)
        - 3B1. [api/user/signup](#3b1-apiusersignup)
        - 3B2. [api/user/login](#3b2-apiuserlogin)
        - 3B3. [api/user/findUsers](#3b3-apiuserfindusers)
        - 3B4. [api/user/updateUser](#3b4-apiuserupdateuser)
    -   3C. [log.js](#3c-logjs)
        - 3C1. [api/log/listLog](#3c1-apiloglistlog)
        - 3C2. [api/log/listLogV3](#3c2-apiloglistlogsv3)
4.  [middlewares](#4-middlewares)
    -   4A. [game.js](#4a-gamejs)
    -   4B. [user.js](#4b-userjs)
    -   4C. [auth.js et modAuth.js](#4c-authjs-et-modauthjs)
    -   4D. [check.js](#4d-checkjs)
    -   4E. [routeParam.js](#4e-routeparamjs)
5.  [controllers](#5-controllers)
    -   5A. [game.js](#5a-gamejs)
    -   5B. [user.js](#5b-userjs)
    -   5C. [log.js](#5c-logjs)
6.  [util](#6-util)
    -   6A. [game](#6a-game)
        - 6A1. [create.js](#6a1-createjs)
        - 6A2. [find.js](#6a2-findjs)
        - 6A3. [update.js](#6a3-updatejs)
    -   6B. [user](#6b-user)
        - 6B1. [create.js](#6b1-createjs)
        - 6B2. [find.js](#6b2-findjs)
        - 6B3. [update.js](#6b3-updatejs)
    -   6C. [player](#6c-player)
        - 6C1. [create.js](#6c1-createjs)
        - 6C2. [find.js](#6c2-findjs)
        - 6C3. [update.js](#6c3-updatejs)
    -   6D. [word](#6d-word)
        - 6D1. [create.js](#6d1-createjs)
        - 6D2. [find.js](#6d2-findjs)
        - 6D3. [update.js](#6d3-updatejs)
    -   6E. [general](#6e-general)
    -   6F. [log.js](#6f-logjs)
    -   6G. [check.js](#6g-checkjs)
    -   6H. [log.js](#6f-logjs)
7.  [models / modelV2](#7-models--modelv2)
    -   7A. [models](#7a-models)
        - 7A1. [User.js](#7a1-userjs)
        - 7A2. [Log.js](#7a2-logjs)
    -   7B. [modelV2](#7b-modelv2)
        - 7B1. [GameV2.js](#7b1-gamev2js)
        - 7B2. [PlayerV2.js](#7b2-playerv2js)
        - 7B3. [WordV2.js](#7b3-wordv2js)
8.  [.env](#8-env)
9.  [.gitignore](#9-gitignore)

###     1. Outils utilisé
Cette section a pour bute de présenter et de donner une explication brêve des différent frameworks, librairie et module utilisé

####        1A. [Express.js](https://expressjs.com/)
Epress.js est un framework utilisé pour facilité les interaction avec le client

####        1B. [MongoDB](https://www.mongodb.com/)
MongoDB est un langage de base de données [NoSQL](https://fr.wikipedia.org/wiki/NoSQL) (Not only [SQL]((https://fr.wikipedia.org/wiki/Structured_Query_Language))[Structured Query Language]) que nos utilisons pour stoqué et structurer nos données pour ce logiciel

#####           1B1. [Schemas](#7-models--modelv2)
Les schemas sont les structures de données que nous déclarons dans notre codes et qui définirons comment nos donnée serons stoqué

#####           1B2. [MongoDB Atlas](https://www.mongodb.com/)
MongoDB Atlas est une plateform en lign qui propose un service nous permettant de stoquer nos données chez eux plutôt que en local

####        1C. [Node.js](https://nodejs.org/en)
Node.js est un environnement JavaScript qui permet de faire un server et de manager le backend d'une application

#####           1C1. [dotenv](https://www.npmjs.com/package/dotenv)
dotenv est un package [Node.js](#1c-nodejs) qui permet l'utilisation de fichier [.env](#8-env) qui permette de stoquer certaine données seulement en local afin de les garder privée

###     2. [index.js](api/index.js) et [app.js](api/app.js)
Ces deux document sont le ceux qui crée le server et l'app [Express](#expressjs)

####        2A. [index.js](api/index.js)
Ce fichier est le document qui crée le server 

####        2B. [app.js](api/app.js)
Ce fichier est celui qui crée l'app [Express](#1a-expressjs)

###     3. [routes](api/routes)
Ce dossier contient les routes par lesquel les requêtes passerons

####        3A. [game.js](api/routes/game.js)
Ce fichier contient les routes qui permettent d'acceder aux fonctions qui traite des [parties](#7b1-gamev2js)

#####           3A1. [api/games/createGame](https://github.com/OrifInformatique/http-battles/blob/ebf485631833e50e71c32a8ce670de7637c85ce4/api/routes/game.js#L37)
```
/**
 * créé une partie pour cette utilisateur
 * 
 * forme de la requette :
 *  {
 *      "userId": ""        // id du client
 *  }
 * 
 * */ 
router.post('/games/createGame', auth, check.dataInit, middleGame.createGameV2, check.logInit, check.dataValidity, gameCtrl.createGameV2)
```
#####           3A2. [api/games/findGames](https://github.com/OrifInformatique/http-battles/blob/494dbeabaa7dbfba593df29bed8557d617873c3e/api/routes/game.js#L58)
```
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
```
#####           3A3. [api/games/joinGame](https://github.com/OrifInformatique/http-battles/blob/494dbeabaa7dbfba593df29bed8557d617873c3e/api/routes/game.js#L70)
```
/**
 * permet à un utilisateur de rejoindre une partie
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "gameId": ""        // id de la partie
 *  }
 * 
 * */ 
router.post('/games/joinGame', auth, check.dataInit, middleGame.joinGameV2, check.logInit, check.dataValidity, gameCtrl.joinGameV2)
```
#####           3A4. [api/games/startGame](https://github.com/OrifInformatique/http-battles/blob/494dbeabaa7dbfba593df29bed8557d617873c3e/api/routes/game.js#L108)
```
/**
 * commence la partie
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "gameId": "",       // id de la partie
 *      "clientId": "",     // id du joueur
 *      "phrase": [         // phrase du joueur
 *          {               // mot 1
 *              "content": "",          // contenu du mot
 *              "phrasePosition": "",​   // position dans la phrase (ex. "1")
 *              "boardPosition": ""     // position sur le plateau 
 *          },
 *          {               // mot 2
 *              "content": "",
 *              "phrasePosition": "",​
 *              "boardPosition": ""
 *          }
 *      ]
 *  }
 * 
 * "boardPosition" possible input:
 *  - "Get A"
 *  - "Get B"
 *  - "Get C"
 *  - "Get D"
 * 
 *  - "Post A"
 *  - "Post B"
 *  - "Post C"
 *  - "Post D"
 * 
 * etc...
 * 
 * */ 
 router.post('/games/startGame', auth, check.dataInit, middleGame.startGameV2, check.logInit, check.dataValidity, gameCtrl.startGameV2)
```
#####           3A5. [api/games/tryPhrase](https://github.com/OrifInformatique/http-battles/blob/494dbeabaa7dbfba593df29bed8557d617873c3e/api/routes/game.js#L159)
```
/**
 * test la phrase du client
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "gameId": "",       // id de la partie
 *      "clientId": "",     // id du joueur
 *      "targetId": "",     // id du joueur cible
 *      "phrase": [         // phrase que le joueur test
 *          {               // mot 1
 *              "content": "",          // contenu du mot
 *              "phrasePosition": "",​   // position dans la phrase (ex. "1")
 *              "boardPosition": ""     // position sur le plateau (facultatif)
 *          },
 *          {               // mot 2
 *              "content": "",
 *              "phrasePosition": "",​
 *              "boardPosition": ""
 *          }
 *      ]
 *  }
 * 
  * "boardPosition" possible input:
 *   - "Get A"
 *   - "Get B"
 *   - "Get C"
 *   - "Get D"
 * 
 *   - "Post A"
 *   - "Post B"
 *   - "Post C"
 *   - "Post D"
 * 
 * etc...
 * 
 * */ 
router.all('/games/tryPhrase', auth, check.dataInit, middleGame.tryPhraseV2, check.logInit, check.dataValidity, gameCtrl.tryPhraseV2)
```
#####           3A6. [api/games/try...](https://github.com/OrifInformatique/http-battles/blob/494dbeabaa7dbfba593df29bed8557d617873c3e/api/routes/game.js#L173)
```
/**
 * test la case
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "gameId": "",       // id de la partie
 *      "clientId": "",     // id du joueur
 *      "targetId": ""      // id du joueur cible
 *  }
 * 
 * */ 
router.all('/games/tryA', routeParam.getParams, auth, check.dataInit, routeParam.a, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryB', routeParam.getParams, auth, check.dataInit, routeParam.b, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryC', routeParam.getParams, auth, check.dataInit, routeParam.c, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)

router.all('/games/tryD', routeParam.getParams, auth, check.dataInit, routeParam.d, middleGame.tryCaseV2, check.logInit, check.dataValidity,  gameCtrl.tryCaseV2)
```
#####           3A7. [api/games/endGame](https://github.com/OrifInformatique/http-battles/blob/494dbeabaa7dbfba593df29bed8557d617873c3e/api/routes/game.js#L120)
```
/**
 * términe la partie
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "gameId": ""       // id de la partie
 *  }
 * 
 * */ 
router.all('/games/endGame', auth, check.dataInit, middleGame.endGameV2, check.logInit, check.dataValidity, gameCtrl.endGameV2)
```
#####           3A8. [api/games/testAll](https://github.com/OrifInformatique/http-battles/blob/67b244a072bf3c72eb36090eaaaa3dfecb0974c4/api/routes/game.js#L35)
```
/**
 * teste toute les routes games
 * 
 * forme de la requette :
 *  {
 *      "userId": ""       // id du client
 *  }
 * 
 * */ 
router.post('/games/testAll', modAut, check.dataInit, middleGame.testAll, check.logInit, check.dataValidity, gameCtrl.testAll)
```
####        3B. [user.js](api/routes/user.js)
Ce fichier contient les routes qui permettent d'accèder aux fonctions [utilisateur](#7a1-userjs)

#####           3B1. [api/user/signup](https://github.com/OrifInformatique/http-battles/blob/701e01c3b61583789ab5c88f29f2529e07064d90/api/routes/user.js#L42)
```
/**
 * redirige la requette post de création utilisateur
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "email": "",        // email du nouvel utilisateur
 *      "password": "",     // password du nouvel utilisateur
 *      "firstName": "",    // prenom du nouvel utilisateur
 *      "lastname": "",     // nom du nouvel utilisateur
 *      "username": ""      // username du nouvel utilisateur
 *  }
 * 
 * */ 
router.post('/user/signup', check.dataInit, middleUser.signup, check.logInit, check.dataValidity, userCtrl.signup)
```
#####           3B2. [api/user/login](https://github.com/OrifInformatique/http-battles/blob/701e01c3b61583789ab5c88f29f2529e07064d90/api/routes/user.js#L55)
```
/**
 * redirige la requet post de connexion utilisateur
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "email": "",        // email de l'utilisateur
 *      "password": ""      // password de l'utilisateur
 *  }
 * 
 * */ 
router.post('/user/login', check.dataInit, middleUser.login, check.logInit, check.dataValidity, userCtrl.login)
```
#####           3B3. [api/user/findUsers](https://github.com/OrifInformatique/http-battles/blob/701e01c3b61583789ab5c88f29f2529e07064d90/api/routes/user.js#L71)
```
/**
 * retourne une liste des profils utilisateurs
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client (facultatif)
 *      "email": "",        // email du nouvel utilisateur (facultatif)
 *      "password": "",     // password du nouvel utilisateur (facultatif)
 *      "firstName": "",    // prenom du nouvel utilisateur (facultatif) 
 *      "lastname": "",     // nom du nouvel utilisateur (facultatif)
 *      "username": ""      // username du nouvel utilisateur (facultatif)
 *  }
 * 
 * */ 
router.get('/user/findUsers', modAut, check.dataInit, middleUser.findUser, check.logInit, check.dataValidity, userCtrl.findUser)
```
#####           3B4. [api/user/updateUser](https://github.com/OrifInformatique/http-battles/blob/701e01c3b61583789ab5c88f29f2529e07064d90/api/routes/user.js#L90)
```
/**
 * update un profil utilisateur
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client 
 *      "email": "",        // nouvelle email de l'utilisateur (facultatif)
 *      "password": "",     // password de l'utilisateur 
 *      "update": {
 *          "password": ""  // nouveaux password de l'utilisateur (facultatif)
 *      },
 *      "firstName": "",    // nouveau prenom de l'utilisateur (facultatif) 
 *      "lastname": "",     // nouveau nom de l'utilisateur (facultatif)
 *      "username": ""      // nouveau username de l'utilisateur (facultatif)
 *  }
 * 
 * */ 
// update un profil utilisateur
router.put('/user/updateUser', auth, check.dataInit, middleUser.updateUser, check.logInit, check.dataValidity, userCtrl.updateUser)
```
####        3C. [log.js ](api/routes/log.js)
Ce fichier contient les routes qui permettent d'accèder aux fonction de log

#####           3C1. [api/log/listLog](https://github.com/OrifInformatique/http-battles/blob/06846a1be4ae02b6d486bd801e3a387ceb073bff/api/routes/log.js#L39)
```
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
```
#####           3C2. [api/log/listLogsV3](https://github.com/OrifInformatique/http-battles/blob/06846a1be4ae02b6d486bd801e3a387ceb073bff/api/routes/log.js#L69)
```
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
```
###     4. [middlewares](api/middleware)
Ce fichier contient les fonctions et fichiers qui traiterons les données

####        4A. [game.js](api/middleware/game.js)
Ce fichier contient les fonctions qui traites les données de [parties](#7b1-gamev2js)

####        4B. [user.js](api/middleware/user.js)
Ce fichier contient les fonctions quitraites les données [utilisateurs](#7a1-userjs)

####        4C. [auth.js](api/middleware/auth.js) et [modAuth.js](api/middleware/modAut.js)
Ces fichiers contiennes les fonctions d'autentification. Plus précisement l'autentifications des [utilisateurs](#7a1-userjs) et dévellopeurs

####        4D. [check.js](api/middleware/check.js)
Ce fichier contiens les fonctions de checks des données et de [logs](#7a2-logjs)

####        4E. [routeParam.js](api/middleware/routeParam.js)
Ce fichier contient les fonctions qui ajoute l'informations de qu'elle route est utilisée dans la requette

###     5. [controllers](api/controllers) 
Ce dossiers contients les endpoints, les fonctions qui renvoirons la réponse aux clients

####        5A. [game.js](api/controllers/game.js)
Ce fichier contient les endpoints qui envois la réponse au client si la requette concernant la [partie](#7b1-gamev2js) est un succès

####        5B. [user.js](api/controllers/user.js)
Ce fichier contient les endpoints qui envois la réponse au client si la requette concernant l'[utilisateur](#7a1-userjs) est un succès

####        5C. [log.js](api/controllers/log.js)
Ce fichier contient les endpoints qui envoit la réponse au client si la requette concernant les [logs](#7a2-logjs) est un succès ou un echec

###     6. [util](api/util)
Ce dossier contient différent fichiers utils entre autre ceux qui s'occupe de gérer les requètes envoyer à la base de données

####        6A. [game](api/util/game)
Ce dossier contient les fichiers qui traitent des interactions avec la base de données [MongoDB](#1b-mongodb) concernant les données de [parties](#7b1-gamev2js)

#####           6A1. [create.js](api/util/game/create.js)
Ce fichier contient les fonctions de créations de [parties](#7b1-gamev2js) dans la base de données

#####           6A2. [find.js](api/util/game/find.js)
Ce fichier contient les fonctions pour trouver les [parties](#7b1-gamev2js) dans la base de données

#####           6A3. [update.js](api/util/game/update.js)
Ce fichier contient les fonctions pour modifier les [parties](#7b1-gamev2js) dans la base de données

####        6B. [user](api/util/user)
Ce dossier contient les fichiers qui traitent des interactions avec la base de données [MongoDB](#1b-mongodb) concernant les données des [utilisateurs](#7a1-userjs)

#####           6B1. [create.js](api/util/user/create.js)
Ce fichier contient les fonctions de créations d'[utilisateurs](#7a1-userjs) dans la base de données

#####           6B2. [find.js](api/util/user/find.js)
Ce fichier contient les fonctions pour trouver les [utilisateurs](#7a1-userjs) dans la base de données

#####           6B3. [update.js](api/util/user/update.js)
Ce fichier contient les fonctions pour modifier les [utilisateurs](#7a1-userjs) dans la base de données

####        6C. [player](api/util/player)
Ce dossier contient les fichiers qui traitent des interactions avec la base de données [MongoDB](#1b-mongodb) concernant les données des [joueurs](#7b2-playerv2js)

#####           6C1. [create.js](api/util/player/create.js)
Ce fichier contient les fonctions de créations de [joueurs](#7b2-playerv2js) dans la base de données

#####           6C2. [find.js](api/util/player/find.js)
Ce fichier contient les fonctions pour trouver les [joueurs](#7b2-playerv2js) dans la base de données

#####           6C3. [update.js](api/util/player/update.js)
Ce fichier contient les fonctions pour modifier les [joueurs](#7b2-playerv2js) dans la base de données

####        6D. [word](api/util/word)
Ce dossier contient les fichiers qui traitent des interactions avec la base de données [MongoDB](#1b-mongodb) concernant les données des [mots](#7b3-wordv2js)

#####           6D1. [create.js](api/util/word/create.js)
Ce fichier contient les fonctions de créations de [mots](#7b3-wordv2js) dans la base de données

#####           6D2. [find.js](api/util/word/find.js)
Ce fichier contient les fonctions pour trouver les [mots](#7b3-wordv2js) dans la base de données

#####           6D3. [update.js](api/util/word/update.js)
Ce fichier contient les fonctions pour modifier les [mots](#7b3-wordv2js) dans la base de données

####        6E. [general](api/util/general)
Ce dossier contient le fichier qui traite des données en general et les filtre et modifies

####        6F. [log.js](api/util/log.js)
Ce fichier contient les fonctions qui traites, modifie et gère les interactions avec la base de donnée [MongoDB](#1b-mongodb) concernant les données de [log](#7a2-logjs)

####        6G. [check.js](api/util/check.js)
Ce fichier contient la fonctions de test de validité des données 

####        6H. [res.js](api/util/res.js)
Ce fichier contient les fonctions de choix et mise en page des réponse

###     7. [models](api/models) / [modelV2](api/modelV2)
Ces dossiers s'occupe de déclrer les modèles de données qui structurerons la base de données

####        7A. [models](api/models)
Dossier contenant les modèles existant depuis le début du dévellopement de l'application et potenciellemnt des données très anciennes

#####           7A1. [User.js](api/models/User.js)
Ce fichier contient le Schema des utilisateurs qui sera stoqué dans la base de donnée [MongoDB](#1b-mongodb)

#####           7A2. [Log.js](api/models/Log.js)
Ce fichier contient le Schema des logs qui sera stoqué dans la base de donnée [MongoDB](#1b-mongodb)

####        7B. [modelV2](api/modelV2)
Dossier comtenant les modèles qui ont été introduis durant la deuxième version du Backend

#####           7B1. [GameV2.js](api/modelV2/GameV2.js)
Ce fichier contient le Schema des parties qui sera stoqué dans la base de donnée [MongoDB](#1b-mongodb)

#####           7B2. [PlayerV2.js](api/modelV2/PlayerV2.js)
Ce fichier contient le Schema des joueurs qui sera stoqué dans la base de donnée [MongoDB](#1b-mongodb)

#####           7B3. [WordV2.js](api/modelV2/WordV2.js)
Ce fichier contient le Schema des mots qui sera stoqué dans la base de donnée [MongoDB](#1b-mongodb)

###     8. [.env](api/env/.env)
Ce fichier contient des variables local qui ne seront pas retransmit au dépots git distant

###     9. [.gitignore](api/.gitignore)
Ce fichier spécifie des élément que git doit ignorer