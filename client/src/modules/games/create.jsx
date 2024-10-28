import React from "react";
import { Link } from "react-router-dom";

import { MOCKED_GAME_ID } from "@mocks/config"; 

const GamesCreate = () => {

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
            <li>- Un champs texte permettant de visualiser l'URL à partager pour rejoindre une partie</li>
            <li>- Un bouton permettant de copier l'URL à partager</li>
            <li><hr /></li>
            <li>Un formulaire contenant : </li>
            <li>- Un champs texte permettant de visualiser la clé à partager pour rejoindre une partie</li>
            <li>- Un bouton permettant de copier la clé à partager</li>
            <li><hr /></li>
            <li>Un panel contenant : </li> 
            <li>- L'état de la partie ("En attente d'un adversaire / Un utilisateur a rejoint la partie)</li>
            <li>- Lorsqu'un utilisateur a rejoint la partie, un lien vers la partie créée</li>
        </ul>
        
        <hr />        
    
    </>)

}

export default GamesCreate
