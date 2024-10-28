import React from "react";
import { Link } from "react-router-dom";

import { MOCKED_GAME_ID } from "@mocks/config"; 

export const GamesJoinLink = () => {
    return (<>

        <hr />        
    
        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby">Retour au lobby</Link></li>
            <li><Link className="text-blue-500 underline" to={`/lobby/join-game`}>Rejoindre une partie (redirection)</Link></li>
        </ul>

        <hr />        
        
        <p className="font-bold">Contenu : </p>

        <ul>
            <li>Vérificaiton de la clé dans l'URL</li>
            <li><hr /></li>
            <li>Redirection vers le panel pour rejoindre une partie.</li>
        </ul>
        
        <hr />        
    
    </>)
}

const GamesJoin = () => {

    return (<>

        <hr />        
    
        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby">Retour au lobby</Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Partie en cours</Link></li>
        </ul>

        <hr />        
        
        <p className="font-bold">Contenu : </p>

        <ul>
            <li>Un lien vers le module de lobby</li>
            <li><hr /></li>
            <li>Un formulaire contenant : </li>
            <li>- Un champs texte permettant d'entrer la clé de partie</li>
            <li>- Un bouton de validation du formulaire</li>
            <li><hr /></li>
            <li>Lorsque le formulaire est validé, afficher un panel contenant : </li>
            <li>- Un message précisant la partie du joueur que vous avez rejoint</li>
            <li>- Un lien de navigation vers la partie rejointe</li>
        </ul>
        
        <hr />        
    
    </>)

}

export default GamesJoin
