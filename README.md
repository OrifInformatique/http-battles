# http-battles
HTTP Battles - Jeu d'initiation au protocole HTTP

## API
Cette section à pour but d'expliquer la structure et le fonctionnement de l'API pour faciliter les interactions et future devellopement associer

###     1. Outils utilisé
Cette section a pour bute de présenter et de donner une explication brêve des différent frameworks, librairie et module utilisé

####        1A. Express.js
Epress.js est un framework utilisé pour facilité les interaction avec le client

[https://expressjs.com/](https://expressjs.com/)
###     2. index.js et app.js
Ces deux document sont le ceux qui crée le server et l'app [Express](#expressjs)

###     3. routes
Ce dossier contient les routes par lesquel les requêtes passerons

####        [3A. game.js](api/routes/game.js)
Ce fichier contient les routes qui permettent d'acceder aux fonctions qui traite des parties

####        3B. user.js
Ce fichier contient les routes qui permettent d'accèder aux fonctions utilisateur

####        3C. log.js 
Ce fichier contient les routes qui permettent d'accèder aux fonction de log

###     4. middlewares
Ce fichier contient les fonctions et fichiers qui traiterons les données

####        4A. game.js
Ce fichier contient les fonctions qui traites les données de parties

###     5. controllers
Ce dossiers contients, les endpoints, les fonctions qui renvoireons la réponse aux clients

###     6. util
Ce dossier contient différent fichiers utils entre autre ceux qui s'occupe de gérer les requètes envoyer à la base de données

###     7. models / modelV2
Ces dossiers s'occupe de déclrer les modèles de données qui structurerons la base de données

