import React, { useState } from "react";
import { Link } from "react-router-dom";

// Configs
import { GAMES_STATES } from "@src/config/games";

// Mocks
import { MOCKED_GAME_ID } from "@mocks/config"; 

const GamesLaunch = () => {

    const [state, setState] = useState(GAMES_STATES.SETTINGS);

    const handleClick = (newState) => {
        setState(newState)
        
    }

    return (<>
        <hr />        
    
        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby">Retour au lobby</Link></li>
        </ul>
    
        <hr />        
        
        <p className="font-bold">Etat de la partie : </p>
        
        <ul>
            <li><Link className="text-blue-500 underline" onClick={(e) => handleClick(GAMES_STATES.SETTINGS)}>{GAMES_STATES.SETTINGS}</Link></li>
            <li><Link className="text-blue-500 underline" onClick={(e) => handleClick(GAMES_STATES.YOUR_ROUND)}>{GAMES_STATES.YOUR_ROUND}</Link></li>
            <li><Link className="text-blue-500 underline" onClick={(e) => handleClick(GAMES_STATES.OPPONENT_ROUND)}>{GAMES_STATES.OPPONENT_ROUND}</Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>{GAMES_STATES.ENDED}</Link></li>
        </ul>

        <hr />
    
        { (state === GAMES_STATES.SETTINGS) && <>
            <p className="font-bold">Contenu de l'état {GAMES_STATES.SETTINGS} : </p>

            <ul>
                <li>Un lien vers le module de lobby</li>
                <li><hr /></li>
                <li>Un résumé du résultat de la partie avec : </li>
                <li>- La grille de l'utilisateur connecté avec la position des mots</li>
                <li>- La phrase de l'utilisateur connecté avec les mots découverts surlignés</li>
                <li>- La grille de l'utilisateur adversaire avec la position des mots</li>
                <li>- La phrase de l'utilisateur adversaire avec les mots découverts surlignés</li>
                <li><hr /></li>
                <li>Un panel avec : </li>
                <li>- Un message présentant le username du gagnant</li>
                <li>- Un bouton pour recommencer une nouvelle partie</li>
            </ul>
            
            <hr />        
        </>}

        { (state === GAMES_STATES.OPPONENT_ROUND) && <>
            <p className="font-bold">Contenu de l'état "{GAMES_STATES.OPPONENT_ROUND}" : </p>

            <ul>
                <li>Un lien vers le module de lobby</li>
                <li><hr /></li>
                <li>L'interface de jeu vérouillée (voir l'état "{GAMES_STATES.YOUR_ROUND}")</li>
                <li><hr /></li>
                <li>Tant que l'utilisateur adversaire n'a pas joué, présenter un panel avec : </li>
                <li>- Le message précisant que l'utilisateur adversaire est en train de joué</li>
                <li><hr /></li>
                <li>Lorsque l'utilisateur adversaire a joué, présenter un panel avec : </li>
                <li>- Le message précisant que l'utilisateur adversaire a joué, en précisant la case dévoilée ou la tentative de phrase proposée</li>
                <li>- Un bouton pour fermer le panel et dévérouiller l'interface de jeu (changement d'état à "{GAMES_STATES.YOUR_ROUND}")</li>
            </ul>
            
            <hr />        
        </>}

        { (state === GAMES_STATES.YOUR_ROUND) && <>
            <p className="font-bold">Contenu de l'état "{GAMES_STATES.YOUR_ROUND}" : </p>

            <ul>
                <li>Un lien vers le module de lobby</li>
                <li><hr /></li>

                <li>L'interface de jeu dévérouillée avec :</li>
                <li>- La grille de l'utilisateur connecté avec la position des mots</li>
                <li>- La phrase de l'utilisateur connecté avec les mots découverts surlignés</li>
                <li>- La grille de l'utilisateur adversaire avec la position des mots</li>
                <li>- La phrase de l'utilisateur adversaire avec les mots découverts surlignés</li>

                <li>- Un formulaire avec le champs "Route" et le champs "Méthode" pour tenter de dévoiler une case.</li>
                <li>- Un bouton pour valider le formulaire pour dévoiler une case.</li>
                <li>- Un formulaire avec le champs "Phrase" pour tenter de découvrire la phrase de l'adversaire.</li>
                <li>- Un bouton pour valider le formilaire de tentative de phrase proposée.</li>

                <li><hr /></li>
                <li>Si l'utilisateur valide le formulaire pour dévoiler une case, présenter un panel avec : </li>
                <li>- Un message rappelant la route et la méthode choisie.</li>
                <li>- Le mot caché (ou l'absence de mot) derrière la route et la méthode, ainsi que sa position dans la phrase.</li>
                <li>- Un bouton pour passer à l'état "{GAMES_STATES.OPPONENT_ROUND}"</li>

                <li><hr /></li>
                <li>Si l'utilisateur valide le formulaire pour tenter de trouver la phrase de l'adversaire, présenter un panel avec : </li>
                <li>- Un message rappelant la phrase proposée.</li>
                <li>- Un feedback pour valider ou invalider que la phrase proposée correspond à la phrase de l'adversaire.</li>
                <li>- Un bouton pour passer à l'état "{GAMES_STATES.OPPONENT_ROUND}" ou aller au module de fin de partie selon le résultat</li>
            </ul>
            
            <hr />        
        </>}
    </>)

}

export default GamesLaunch
