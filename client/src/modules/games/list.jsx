import React from "react";
import { Link } from "react-router-dom";

import { MOCKED_GAME_ID } from "@mocks/config"; 

const GamesList = () => {

    return (<>

        <hr />        
    
        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby/join-game">Rejoindre une partie</Link></li>
            <li><Link className="text-blue-500 underline" to="/lobby/new-game">Nouvelle partie</Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Partie en cours</Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Partie terminée</Link></li>
            <li><Link className="text-blue-500 underline" to={`/login`}>Déconnexion</Link></li>
        </ul>

        <hr />        
        
        <p className="font-bold">Contenu : </p>

        <ul>
            <li>Un lien vers le module permettant de rejoindre une partie</li>
            <li>Un lien vers le module permettant de créer une partie</li>
            <li><hr /></li>
            <li>La liste des parties en cours, pour chaque partie :</li>
            <li>- Le numéro de la partie</li>
            <li>- L'état de la partie (Pas d'adversaire, en configuration, au tour de l'adversaire, à votre tour)</li>
            <li>- Un lien vers la partie en cours</li>
            <li><hr /></li>
            <li>La liste des parties terminée, pour chaque partie :</li>
            <li>- Le numéro de la partie</li>
            <li>- Un lien vers le résultat de la partie</li>
            <li><hr /></li>
            <li>Un lien de déconnexion vers le module de formulaire de login</li>

        </ul>
        
        <hr />        
    
    </>)

}

export default GamesList
