const RPG = (() => {
    console.log("Bienvenue dans la fonctionnalité cachée de la battaille navale.");
    console.log("Pour jouer à ce jeu, vous devez avoir quelques notions de javascript, de façon à pouvoir modifier des variables et lancer des fonctions.");
    console.log("Pour avoir la liste des variables éditables et des fonctions, vous pouvez entrer la fonction RPG.help()");
    console.log("Pour jouer au jeu du Labyrinthe du Cosmos, veuillez lancer la commande RPG.start() dans la console.");


    // État global du jeu
    let gameStarted = false;    
    let gameState = {
        playerName: null,
        playerLife: 20,
        playerMana: 30,
        playerDef: 2,
        playerSpeed: 8,
        playerGold: 0,
        playerWeapon: null,
        playerDead: false,
        playerWin: false,
        weaponChosen: false,
        floorCounter: 1,
        playerSpellElement: null,
        askingPath: true,
        monsterFound: null,
        trueGamerMode: false,
        enemy: {}
    };

    const randomRange = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const start = () => {

        if (!gameState.playerName) {
            console.log("Vous devez choisir un nom de joueur avant de pouvoir lancer votre première action, merci d'utiliser RPG.changeUsername(\"Votre nom de joueur\")");
        }else if (gameStarted){
            console.log("Le jeu est déjà en cours.");
        }else {
            gameStarted = true;
            console.log("Initialisation du jeu...");
            console.log("Bienvenue " + gameState.playerName + ". Vous êtes bloqué dans les étages sous-terrain du labyrinthe du Cosmos !");
            console.log("Pour vous échapper, vous allez devoir monter les 6 étages pour trouver la sortie !");
            console.log("Choisissez votre arme de départ : des dagues, un arc ou un bâton magique.\n" +
                "Les dagues font des petits dégats mais peuvent attaquer plusieurs fois.\n" +
                "L'arc peut faire des dégats critiques mais peut rater sa cible.\n" +
                "Le bâton magique peut exploiter la faiblesse de certains monstres mais consomme de la mana.");
        }
    };

    const help = () => { 
        console.log("Voici la liste des fonctions utilisables : RPG.start(), RPG.restart(), RPG.changeUsername(), RPG.cheatCode(), RPG.chooseWeapon(), RPG.pathSelection(), RPG.battleChoice(), RPG.spellChoice()");
        console.log("RPG.start() : permet de démarrer le jeu et d'instancier les valeurs.\n" + 
            "RPG.restart() : réinitialise les valeurs par défaut pour relancer le jeu. (Utilisable à tout moment et s'effectue automatiquement en cas de défaite ou victoire)\n" + 
            "RPG.changeUsername(\"nom du joueur\") : permet de changer le nom du joueur. (Utilisable à tout moment)\n" + 
            "RPG.cheatCode(\"le mot de passe ou code secret\") : permet d'activer un code de triche dans le jeu. (Utilisable à tout moment)\n" + 
            "RPG.chooseWeapon(\"l'arme choisie\") : permet de choisir son arme de départ. L'arme n'est pas changeable après l'avoir choisie.\n" + 
            "RPG.pathSelection(\"direction choisie\") : permet de choisir la direction du chemin à explorer. La direction possible est \"droite\" ou \"gauche\" / \"g\" ou \"d\" en raccourci.\n" + 
            "RPG.battleChoice(\"action choisie\") : permet de choisir son action de combat. Les actions possibles sont \"attaquer\" / \"atk\" ou \"fuir\".\n" + 
            "RPG.spellChoice(\"l'élément de magie choisi\") : permet de choisir l'élément du sort que vous utilisez avec votre arme. (Utilisable à tout moment si vous avez le bâton magique choisi)\n");
        console.log("\nL'ordre des fonctions à utiliser est : \n1. Choisir son nom \n2. Start le jeu \n3. Choisir son arme de départ \n4. Choisir son type de sort (si on a choisit le bâton magique) \n5. Choisir la direction du chemin \n6. Choisir son action en combat (si en combat) \n7. Répéter le 5. et 6. jusqu'à trouver la sortie du labyrinthe ou mourrir");
        if(gameStarted){
            console.log("Vie actuelle : " + gameState.playerLife + "\nMana actuelle : " + gameState.playerMana + "\nDéfense actuelle : " + gameState.playerDef + "\nVitesse actuelle : " + gameState.playerSpeed + "\nPièces d'or actuelles : " + gameState.playerGold + "\nArme actuelle : " + gameState.playerWeapon + "\nÉtage actuel : " + gameState.floorCounter + "\nType de sort choisi (si bâton magique): " + gameState.playerSpellElement);
        }      
    };

    const changeUsername = (name) => {
        gameState.playerName = name;
        console.log("Votre nom a bien été modifié")
        console.log("Bienvenue " + name);
    }

    const cheatCode = (code) => {
        if(code == "OrifInfo2009"){        
            console.log("Vous êtes un vrai GAMER de la section informatique")
            gameState.playerLife = 100;
            gameState.playerMana = 100;
            gameState.playerDef = 50;
            gameState.playerSpeed = 50;
            gameState.trueGamerMode = true;
        }else{
            console.log("Votre mot de passe est erroné. Veuillez lancer le bon mot de passe.")
        }
    }

    const chooseWeapon = (weapon) => {
        weapon = weapon.toLowerCase();
        if (!gameStarted) {
            console.log("Vous devez démarrer le jeu avant de pouvoir utiliser cette commande.");
            return;
        }
        if (!gameState.weaponChosen) {
            switch (weapon) {
                case "dagues":
                    gameState.playerWeapon = weapon;
                    gameState.weaponChosen = true;
                    console.log("Vous avez choisi comme arme : " + weapon + ". Bonne chance !");
                    break;
                case "arc":
                    gameState.playerWeapon = weapon;
                    gameState.weaponChosen = true;
                    console.log("Vous avez choisi comme arme : " + weapon + ". Bonne chance !");
                    break;
                case "bâton":
                    gameState.playerWeapon = weapon;
                    gameState.weaponChosen = true;
                    console.log("Vous avez choisi comme arme : " + weapon + ". Bonne chance !");
                    break;
                default:
                    console.log("Veuillez choisir CORRECTEMENT votre arme. Les possibilités sont arc, dagues ou bâton");
            }
        }else
        {
            console.log("Vous ne pouvez pas changer d'arme une fois que vous l'avez choisie !");
        }
    }

    const pathSelection = (direction) => {
        direction = direction.toLowerCase();
        if (!gameStarted) {
            console.log("Vous devez démarrer le jeu avant de pouvoir utiliser cette commande.");
            return;
        }else if (!gameState.weaponChosen) {
            console.log("Vous devez choisir votre arme de départ avant de pouvoir vous déplacez dans le donjon, merci d'utiliser RPG.chooseWeapon(\"l'arme choisie\")");
            return;
        }
        if (gameState.askingPath) {
            if (["gauche", "g", "droite", "d"].includes(direction)) {
                gameState.askingPath = false;
                let room = randomRange(0, 4);
                switch (room) {
                    case 0:
                        console.log("Vous entrez dans une anti-chambre tout ce qu'il y a de plus classique, de la poussière, des crânes et des restes d'aventuriers. Vous avancez prudemment... ");
                        break;
                    case 1:
                        console.log("Vous passez par un couloir lugubre qui donne sur une salle vous donnant froid dans le dos. Mieux vaut ne pas s'attarder ici... ");
                        break;
                    case 2:
                        console.log("Vous trouvez un coin de repos où vous arrêter et regagnez 5 point de vie avant de repartir... ");
                        gameState.playerLife += 5;
                        break;
                    case 3:
                        console.log("Vous trouvez un escalier. Il vous emmène à l'étage supérieur");
                        gameState.floorCounter += 1;
                        gameState.askingPath = true;
                        if (gameState.floorCounter === 6) {
                            gameState.playerWin = true;
                            victory();
                        }
                        return;
                }
                findItem();
                findMonster();
            } else {
                console.log("Veuillez choisir CORRECTEMENT votre route. (\"gauche\" ou \"droite\" / \"g\" ou \"d\"");
            }
        }else
        {
            console.log("Veuillez ne pouvez pas utiliser cette commande tant que votre combat n'est pas terminé");
        }
    }

    const findItem = () => {
        let item = randomRange(0, 4);
        switch (item) {
            case 0:
                console.log("Quelle chance, vous avez trouvé une potion de vie. Vous regagnez de la santé. ");
                gameState.playerLife += 10;
                console.log("Votre vie actuelle est de : " + gameState.playerLife)
                break;
            case 1:
                console.log("Quelle chance, vous avez trouvé une potion de mana. Vous regagnez de la mana. ");
                gameState.playerMana += 10;
                console.log("Votre mana actuelle est de : " + gameState.playerMana)
                break;
            case 2:
                console.log("Vous trouvez un Trésoooooooooor");
                gameState.playerGold += randomRange(1,7);
                break;
            default:
                console.log("Vous ne trouvez rien d'intéressant dans cette pièce... ");
                break;
        }
    }

    const findMonster = () => {
        let monster = randomRange(0, 4);
        gameState.monsterFound = monster
        switch (monster) {
            case 0:
                console.log("Soudain, une araignée apparaît, préparez-vous au combat. ");
                startBattle()
                break;
            case 1:
                console.log("Soudain, un squelette apparaît, préparez-vous au combat. ");
                startBattle()
                break;
            case 2:
                console.log("Soudain, un minotaure apparaît, préparez-vous au combat. ");
                startBattle()
                break;
            default:
                console.log("Il n'y aucune présence hostile autour de vous. Vous poursuivez votre chemin... ");
                gameState.askingPath = true;
                break;
        }
    }

    const startBattle = () => {
        const types = ["air", "feu", "eau", "terre"];
        const enemyType = types[randomRange(0, 4)];
        gameState.enemy.type = enemyType;

        const monsters = [
            {
                name: "'araignée",
                dmg: 5,
                life: 7,
                speed: 10,
                def: 1,
                accuracyMax: 9
            },
            {
                name: "e squelette",
                dmg: 8,
                life: 14,
                speed: 7,
                def: 2,
                accuracyMax: 7
            },
            {
                name: "e minotaure",
                dmg: 10,
                life: 25,
                speed: 5,
                def: 4,
                accuracyMax: 5
            }
        ];

        const monster = monsters[gameState.monsterFound];
        gameState.enemy.name = monster.name;
        gameState.enemy.life = monster.life;
        gameState.enemy.dmg = monster.dmg;
        gameState.enemy.speed = monster.speed;
        gameState.enemy.def = monster.def;
        gameState.enemy.accuracyMax = monster.accuracyMax;
        gameState.enemy.accuracy = 5;
    }

    const battleChoice = (choice) => {
        choice = choice.toLowerCase();
        if (!gameStarted) {
            console.log("Vous devez démarrer le jeu avant de pouvoir utiliser cette commande.");
            return;
        }else if (gameState.askingPath) {
            console.log("Vous devez être en combat pour utiliser cette commande. Veuillez d'abord choisir un chemin avec la commande RPG.pathSelection(\"la direction choisie\")");
            return;
        }else if (gameState.playerWeapon == "bâton" && !gameState.playerSpellElement) {
            console.log("Vous devez choisir quel type de sort vous allez lancer avec votre bâton magique durant le combat. Veuillez au préalable choisir votre sort correctement avec la fonction spellChoice(\"élément du sort choisi\"). Les possibilités des éléments sont air - terre - eau - feu");
            return;
        }
        if (!gameState.playerDead && gameState.enemy.life > 0) {
            //let choice = prompt("Fuir ou attaquer (fuir / atk) ?").toLowerCase();
            //weapon = weapon.toLowerCase();
            switch (choice) {
                case "fuir":
                    const escaped = randomRange(0, 2) === 0;
                    if (escaped) {
                        console.log("Vous prenez la fuite.");
                        gameState.askingPath = true;
                    } else {
                        console.log("Vous n'arrivez pas à prendre la fuite.");
                        console.log("Le monstre en profite pour vous attaquez et vous perdez 3 points de vie.");
                        gameState.playerLife -= 3;
                        turnDamages();
                    }
                    break;
                case "atk":
                case "attaquer":
                    turnDamages();
                    if (gameState.enemy.life <= 0 || gameState.playerDead) {
                        gameState.askingPath = true;
                    }
                    break;
                default:
                    console.log("Veuillez choisir CORRECTEMENT votre action.");
                    break;
            }
        }
    }

    const spellChoice = (element) => {
        element = element.toLowerCase();
        if (!gameStarted) {
            console.log("Vous devez démarrer le jeu avant de pouvoir utiliser cette commande.");
            return;
        }else if (gameState.playerWeapon != "bâton") {
            console.log("Vous devez choisir le bâton magique comme arme de départ avant de pouvoir choisir l'élément du sort, merci d'utiliser RPG.chooseWeapon(\"l'arme choisie\")");
            return;
        }
        let spellChosen = false;
        if (!spellChosen) {            
            switch (element) {
                case "terre":
                    gameState.playerSpellElement = element;
                    spellChosen = true;
                    console.log("Vous infusez votre bâton magique avec de la magie rocheuse");
                    break;
                case "air":
                    gameState.playerSpellElement = element;
                    spellChosen = true;
                    console.log("Vous infusez votre bâton magique avec de la magie ventueuse");
                    break;
                case "eau":
                    gameState.playerSpellElement = element;
                    spellChosen = true;
                    console.log("Vous infusez votre bâton magique avec de la magie aquatique");
                    break;
                case "feu":
                    gameState.playerSpellElement = element;
                    spellChosen = true;
                    console.log("Vous infusez votre bâton magique avec de la magie enflammée");
                    break;
                default:
                    console.log("Veuillez sélectionner CORRECTEMENT votre sort (Les possibilités des éléments sont \"air\" - \"terre\" - \"eau\" - \"feu\")");
            }
        }
    }

    const turnDamages = () => {
        let playerDmg;
        const monster = gameState.enemy;
        const player = gameState;

        let accuracyMonster = monster.accuracy ?? 5;
        const flipCoinAccuracy = randomRange(1, 11);

        // 1. MONSTRE ATTAQUE EN PREMIER
        if (monster.speed >= player.playerSpeed) {
            console.log("L" + monster.name + " attaque !");
            if (flipCoinAccuracy > accuracyMonster) {
                console.log("Mais l'attaque rate !");
            } else {
                let dmgTaken = Math.max(monster.dmg - player.playerDef, 1);
                player.playerLife -= dmgTaken;
                console.log("Vous subissez " + dmgTaken + " dégâts. Vie restante : " + player.playerLife);
                if (player.playerLife <= 0) {
                    console.log("Vous êtes mort. GAME OVER !");
                    player.playerDead = true;
                    gameOver();
                    return;
                }
            }

            if (accuracyMonster < monster.accuracyMax) {
                monster.accuracy = accuracyMonster + 1;
            }
        }

        // 2. JOUEUR ATTAQUE
        let hits = randomRange(1, 5);
        let critRoll = randomRange(1, 11);
        console.log(critRoll);
        switch (player.playerWeapon) {
            case "dagues":
                playerDmg = 3 * hits;
                console.log(`Vous touchez ${hits} fois l'ennemi avec vos dagues.`);
                break;

            case "arc":
                console.log("Vous tirez votre flèche !");
                if (critRoll >= 7) {
                    playerDmg = 4 * 3;
                    console.log("Coup critique !");
                } else if (critRoll <= 3) {
                    playerDmg = 0;
                    console.log("Mais elle rate sa cible.");
                } else {
                    playerDmg = 4;
                }
                break;

            case "bâton":
                if (player.playerMana <= 0) {
                    console.log("Vous n'avez plus de mana !");
                    playerDmg = 0;
                } else {
                    const enemyType = monster.type;

                    const bonus = {
                        air: { fort: "terre", faible: "feu" },
                        feu: { fort: "air", faible: "eau" },
                        eau: { fort: "feu", faible: "terre" },
                        terre: { fort: "eau", faible: "air" }
                    };

                    playerDmg = 5;
                    console.log("Vous lancez un sort de type : " + player.playerSpellElement);
                    if (enemyType === bonus[player.playerSpellElement].fort) {
                        playerDmg *= 2;
                        console.log("C'est super efficace !");
                    } else if (enemyType === bonus[player.playerSpellElement].faible) {
                        playerDmg /= 2;
                        console.log("Ce n'est pas très efficace...");
                    }
                    player.playerMana -= 3;
                    if (player.playerMana < 0) player.playerMana = 0;                    
                }
                break;
        }

        // 3. APPLICATION DES DÉGÂTS AU MONSTRE
        let dmgToMonster = Math.max(playerDmg - monster.def, 1);
        if(gameState.playerWeapon == "arc" && critRoll <= 3){
            dmgToMonster = 0;
        }
        if(gameState.trueGamerMode){
            dmgToMonster = 100;
        }
        monster.life -= dmgToMonster;
        console.log(`L${monster.name} subit ${dmgToMonster} dégâts. Vie restante du monstre : ${monster.life}`);

        if (monster.life <= 0) {
            console.log("L" + monster.name + " est vaincu !");
            return;
        }

        // 4. MONSTRE RIPOSTE SI JOUEUR EST PLUS RAPIDE
        if (monster.speed < player.playerSpeed) {
            console.log("L" + monster.name + " contre-attaque !");
            const flip = randomRange(1, 11);
            let dmgTaken = Math.max(monster.dmg - player.playerDef, 1);
            if (flip > accuracyMonster) {
                dmgTaken = 0;
                console.log("Mais l'attaque rate !");
            } else {
                player.playerLife -= dmgTaken;
                console.log("Vous subissez " + dmgTaken + " dégâts. Vie restante : " + player.playerLife);
                if (player.playerLife <= 0) {
                    console.log("Vous êtes mort. GAME OVER !");
                    player.playerDead = true;
                    gameOver();
                }
            }

            if (accuracyMonster < monster.accuracyMax) {
                monster.accuracy = accuracyMonster + 1;
            }
        }
    }

    const restart = () => {
        if(gameStarted == true){
            gameStarted = false;
            gameState = {
                playerName: null,
                playerLife: 20,
                playerMana: 30,
                playerDef: 2,
                playerSpeed: 8,
                playerGold: 0,
                playerWeapon: null,
                playerDead: false,
                playerWin: false,
                weaponChosen: false,
                floorCounter: 1,
                playerSpellElement: null,
                askingPath: true,
                monsterFound: null,
                trueGamerMode: false,
                enemy: {}
            };
            console.log("Valeurs réinitialisées.");
        }else{
            console.log("Cette commande n'est pas utilisable si le jeu n'a pas démarré.");
        }
        
    }

    const victory  = () => {
        console.log("Bravo " + gameState.playerName + ". Vous avez triomphé du Labyrinthe du Cosmos et survécu votre ascension des 6 étages. Vous parvenez enfin à la sortie et vous remerciez les dieux d'être encore en vie.");
        calculateScore();
        restart();
    }

    const gameOver = () => {
        console.log("Malheureusement, vous mourrez de décès, perdu dans Labyrinthe du Cosmos et une pierre tombale sera érigée en votre honneur où il sera écrit \"ci-gît le regretté " + playerName + ". Paix à son âme.\"");
        calculateScore();
        restart();
    }

    const calculateScore = () => {
        let score = 0;
        console.log("Score final : ");
        console.log("Vie finale : " + gameState.playerLife);
        console.log("Trésors gardés: " + gameState.playerGold);
        console.log("Étages terminés : " + (gameState.floorCounter - 1));
        if(gameState.playerWin){
            console.log("Victoire obtenue : oui");
            score = 100;
        }else{
            console.log("Victoire obtenue : non");
        }       
        score += Math.abs(gameState.playerLife * 2) + (gameState.playerGold * 2) + ((gameState.floorCounter - 1) * 3);
        if(gameState.trueGamerMode){
            console.log("Total : 0");
            console.log("En tant que vrai GAMER de section info vous n'avez pas besoin de score, seule compte la victoire ! Et un CFC ! Et une reprise de contrat ! Bref qu'est-ce que vous fichez encore là ? Allez bosser espèce de chomeur !");
        }else{
            console.log("Total : " + score);
        }
    }

    return {
        start: start,
        help: help,
        changeUsername: changeUsername,
        cheatCode: cheatCode,
        //randomRange: randomRange,
        chooseWeapon: chooseWeapon,
        pathSelection: pathSelection,
        //findMonster: findMonster
        //findItem: findItem
        battleChoice: battleChoice,
        //turnDamages: turnDmamages
        //victory: victory
        //gameOver: gameOver
        //calculateScore: calculateScore
        spellChoice: spellChoice,
        restart: restart
    }
})();