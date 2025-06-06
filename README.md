# http-battles
HTTP Battles - Jeu d'initiation au protocole HTTP

## API
Cette section à pour but d'expliquer la structure et le fonctionnement de l'API pour faciliter les interactions et future devellopement associer

###     1. Outils utilisé
Cette section a pour bute de présenter et de donner une explication brêve des différent frameworks, librairie et module utilisé

####        1A. Express.js
Epress.js est un framework utilisé pour facilité les interaction avec le client

[https://expressjs.com/](https://expressjs.com/)
###     2. [index.js](api/index.js) et [app.js](api/app.js)
Ces deux document sont le ceux qui crée le server et l'app [Express](#expressjs)

###     3. [routes](api/routes)
Ce dossier contient les routes par lesquel les requêtes passerons

####        [3A. game.js](api/routes/game.js)
Ce fichier contient les routes qui permettent d'acceder aux fonctions qui traite des parties

####        [3B. user.js](api/routes/user.js)
Ce fichier contient les routes qui permettent d'accèder aux fonctions utilisateur

####        [3C. log.js ](api/routes/log.js)
Ce fichier contient les routes qui permettent d'accèder aux fonction de log

###     4. [middlewares](api/middleware)
Ce fichier contient les fonctions et fichiers qui traiterons les données

####        4A. [game.js](api/middleware/game.js)
Ce fichier contient les fonctions qui traites les données de parties

####        4B. [user.js](api/middleware/user.js)
Ce fichier contient les fonctions quitraites les données utilisateurs

####        4C. [auth.js](api/middleware/auth.js) et [modAuth.js](api/middleware/modAut.js)
Ces fichiers contiennes les fonctions d'autentification. Plus précisement l'autentifications des utilisateurs et dévellopeurs

####        4D. [check.js](api/middleware/check.js)
Ce fichier contiens les fonctions de checks des données et de logs

####        4E. [routeParam.js](api/middleware/routeParam.js)
Ce fichier contien les fonctions qui ajoute l'informations de qu'elle route est utilisée dans la requette

###     5. [controllers](api/controllers) 
Ce dossiers contients, les endpoints, les fonctions qui renvoirons la réponse aux clients



###     6. util
Ce dossier contient différent fichiers utils entre autre ceux qui s'occupe de gérer les requètes envoyer à la base de données

###     7. models / modelV2
Ces dossiers s'occupe de déclrer les modèles de données qui structurerons la base de données

