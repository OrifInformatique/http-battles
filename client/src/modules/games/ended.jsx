import React from "react";
import { Link } from "react-router-dom";

import { MOCKED_GAME_ID } from "@mocks/config"; 

const GamesEnded = () => {

    return (<>

        <hr />        
    
        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby">Retour au lobby</Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Nouvelle partie</Link></li>
        </ul>

        <hr />        
        
        <p className="font-bold">Contenu : </p>

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
    
    </>)

}

export default GamesEnded
