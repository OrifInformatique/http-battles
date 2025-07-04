export default function(){
    console.log("Mon jeux RPG ici");
};


// Jeu Textuel : Labyrinthe du Cosmos - Version JavaScript
console.log("Orif/Infobs - Jeu textuel - Tristan Schorr\nLabyrinthe du Cosmos");

// État global du jeu
let gameState = {
    playerName: "Bob123",
    playerLife: 20,
    playerMana: 30,
    playerDef: 2,
    playerSpeed: 8,
    playerWeapon: null,
    playerDead: false,
    playerWin: false,
    floorCounter: 1,
    enemy: {}
};

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Setup jeu
function gameSetup() {
    //gameState.playerName = changeUserName();
    console.log("Bonjour " + gameState.playerName + ". Vous êtes bloqué au dernier étage d'un labyrinthe !");
    console.log("Pour vous échapper, vous allez devoir monter les 6 étages et trouver la sortie !");
    console.log("Choisissez votre arme de départ : des dagues, un arc ou un bâton magique.\n" +
          "Les dagues font des petits dégats mais peuvent attaquer plusieurs fois.\n" +
          "L'arc peut faire des dégats critiques mais peut rater sa cible.\n" +
          "Le bâton magique peut exploiter la faiblesse de certains monstres mais consomme de la mana.");
}

// Choix d'arme
function chooseWeapon() {
    let weaponChosen = false;
    while (!weaponChosen) {
        let weapon = prompt("Tapez le nom de votre arme (dagues, arc ou bâton.) :").toLowerCase();
        switch (weapon) {
            case "dagues":
                gameState.playerWeapon = "dagues";
                weaponChosen = true;
                break;
            case "arc":
                gameState.playerWeapon = "arc";
                weaponChosen = true;
                break;
            case "bâton":
                gameState.playerWeapon = "bâton";
                weaponChosen = true;
                break;
            default:
                console.log("Veuillez choisir CORRECTEMENT votre arme");
        }
    }
}

// Chemin
function pathSelection() {
    let askingPath = true;
    while (askingPath) {
        let direction = prompt("Aller à droite ou gauche ? Tapez la direction (d / g) :").toLowerCase();
        if (["gauche", "g", "droite", "d"].includes(direction)) {
            askingPath = false;
            let room = randomRange(0, 4);
            switch (room) {
                case 0:
                    console.log("Vous entrez dans une anti-chambre…");
                    break;
                case 1:
                    console.log("Vous passez par un couloir lugubre…");
                    break;
                case 2:
                    console.log("Coin de repos, vous gagnez 5 PV.");
                    gameState.playerLife += 5;
                    break;
                case 3:
                    console.log("Vous trouvez un escalier. Vous passez à l'étage supérieur");
                    gameState.floorCounter += 1;
                    if (gameState.floorCounter === 3) {
                        gameState.playerWin = true;
                    }
                    break;
            }
        } else {
            console.log("Veuillez choisir CORRECTEMENT votre route.");
        }
    }
}

function findItem() {
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
            break;
        default:
            console.log("Vous ne trouvez rien d'intéressant dans cette pièce... ");
            break;
    }
}

function findMonster() {
    let monster = randomRange(0, 4);
    switch (monster) {
        case 0:
            console.log("Soudain, une araignée apparaît, préparez-vous au combat. ");
            startBattle()
            battleChoice()
            break;
        case 1:
            console.log("Soudain, un squelette apparaît, préparez-vous au combat. ");
            startBattle()
            battleChoice()
            break;
        case 2:
            console.log("Soudain, un minotaure apparaît, préparez-vous au combat. ");
            startBattle()
            battleChoice()
            break;
        default:
            console.log("Il n'y aucune présence hostile autour de vous. Vous poursuivez votre chemin... ");
            break;
    }
}

function startBattle() {
    const types = ["air", "feu", "eau", "terre"];
    const enemyType = types[randomRange(0, 4)];
    gameState.enemy.type = enemyType;

    const monsters = [
        {
            name: "araignée",
            dmg: 5,
            life: 7,
            speed: 10,
            def: 1,
            accuracyMax: 9
        },
        {
            name: "squelette",
            dmg: 8,
            life: 14,
            speed: 7,
            def: 2,
            accuracyMax: 7
        },
        {
            name: "minotaure",
            dmg: 10,
            life: 25,
            speed: 5,
            def: 4,
            accuracyMax: 5
        }
    ];

    const monster = monsters[randomRange(0, monsters.length)];
    gameState.enemy.name = monster.name;
    gameState.enemy.life = monster.life;
    gameState.enemy.dmg = monster.dmg;
    gameState.enemy.speed = monster.speed;
    gameState.enemy.def = monster.def;
    gameState.enemy.accuracyMax = monster.accuracyMax;
    gameState.enemy.accuracy = 5;
}

function battleChoice() {
    let asking = true;
    while (asking && !gameState.playerDead && gameState.enemy.life > 0) {
        let choice = prompt("Fuir ou attaquer (fuir / atk) ?").toLowerCase();
        switch (choice) {
            case "fuir":
                const escaped = randomRange(0, 2) === 0;
                if (escaped) {
                    console.log("Vous prenez la fuite.");
                    asking = false;
                } else {
                    console.log("Vous n'arrivez pas à prendre la fuite.");
                    turnDamages();
                }
                break;

            case "atk":
            case "attaquer":
                turnDamages();
                if (gameState.enemy.life <= 0 || gameState.playerDead) {
                    asking = false;
                }
                break;

            default:
                console.log("Veuillez choisir CORRECTEMENT votre action.");
                break;
        }
    }
}

function turnDamages() {
    let playerDmg;
    let askingSpell = true;
    const monster = gameState.enemy;
    const player = gameState;

    let accuracyMonster = monster.accuracy ?? 5;
    const flipCoinAccuracy = randomRange(1, 11);

    // 1. MONSTRE ATTAQUE EN PREMIER
    if (monster.speed >= player.playerSpeed) {
        console.log("L'" + monster.name + " attaque !");
        if (flipCoinAccuracy > accuracyMonster) {
            console.log("L'attaque du monstre rate !");
        } else {
            let dmgTaken = Math.max(monster.dmg - player.playerDef, 1);
            player.playerLife -= dmgTaken;
            console.log("Vous subissez " + dmgTaken + " dégâts. Vie restante : " + player.playerLife);
            if (player.playerLife <= 0) {
                console.log("Vous êtes mort. GAME OVER !");
                player.playerDead = true;
                return;
            }
        }

        if (accuracyMonster < monster.accuracyMax) {
            monster.accuracy = accuracyMonster + 1;
        }

        console.log("Vous attaquez !");
    }

    // 2. JOUEUR ATTAQUE
    switch (player.playerWeapon) {
        case "dagues":
            let hits = randomRange(1, 5);
            playerDmg = 3 * hits;
            console.log(`Vous touchez ${hits} fois l'ennemi avec vos dagues.`);
            break;

        case "arc":
            let critRoll = randomRange(1, 11);
            if (critRoll >= 7) {
                playerDmg = 4 * 3;
                console.log("Coup critique !");
            } else if (critRoll <= 3) {
                playerDmg = 0;
                console.log("Votre flèche rate sa cible.");
            } else {
                playerDmg = 4;
                console.log("Vous touchez l'ennemi avec votre arc.");
            }
            break;

        case "bâton":
            if (player.playerMana <= 0) {
                console.log("Vous n'avez plus de mana !");
                playerDmg = 0;
            } else {
                while (askingSpell) {
                    let element = prompt("Quel sort voulez-vous lancer ? (air, feu, eau, terre)").toLowerCase();
                    const enemyType = monster.type;

                    const bonus = {
                        air: { fort: "terre", faible: "feu" },
                        feu: { fort: "air", faible: "eau" },
                        eau: { fort: "feu", faible: "terre" },
                        terre: { fort: "eau", faible: "air" }
                    };

                    if (bonus[element]) {
                        askingSpell = false;
                        playerDmg = 5;
                        if (enemyType === bonus[element].fort) {
                            playerDmg *= 2;
                            console.log("C'est super efficace !");
                        } else if (enemyType === bonus[element].faible) {
                            playerDmg /= 2;
                            console.log("Ce n'est pas très efficace...");
                        }
                        player.playerMana -= 3;
                        if (player.playerMana < 0) player.playerMana = 0;
                    } else {
                        console.log("Sort invalide, recommencez.");
                    }
                }
            }
            break;
    }

    // 3. APPLICATION DES DÉGÂTS AU MONSTRE
    let dmgToMonster = Math.max(playerDmg - monster.def, 1);
    monster.life -= dmgToMonster;
    console.log(`L'ennemi subit ${dmgToMonster} dégâts. Vie restante : ${monster.life}`);

    if (monster.life <= 0) {
        console.log("L'" + monster.name + " est vaincu !");
        return;
    }

    // 4. MONSTRE RIPOSTE SI JOUEUR EST PLUS RAPIDE
    if (monster.speed < player.playerSpeed) {
        console.log("L'" + monster.name + " contre-attaque !");
        const flip = randomRange(1, 11);
        let dmgTaken = Math.max(monster.dmg - player.playerDef, 1);
        if (flip > accuracyMonster) {
            dmgTaken = 0;
            console.log("L'attaque du monstre rate !");
        } else {
            player.playerLife -= dmgTaken;
            console.log("Vous subissez " + dmgTaken + " dégâts. Vie restante : " + player.playerLife);
            if (player.playerLife <= 0) {
                console.log("Vous êtes mort. GAME OVER !");
                player.playerDead = true;
            }
        }

        if (accuracyMonster < monster.accuracyMax) {
            monster.accuracy = accuracyMonster + 1;
        }
    }
}

function mainGame() {
    gameSetup();
    chooseWeapon();

    while (!gameState.playerDead) {
        console.log(`Vie: ${gameState.playerLife}, Mana: ${gameState.playerMana}`);
        pathSelection();

        if (gameState.playerWin) {
            console.log("Vous avez trouvé la sortie, bravo !");
            break;
        }

        console.log(`Vie: ${gameState.playerLife}, Mana: ${gameState.playerMana}`);
        findItem();
        findMonster();
    }
}


mainGame();