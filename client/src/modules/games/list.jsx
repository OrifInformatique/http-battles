import React from "react";
import { Link } from "react-router-dom";

import { MOCKED_GAME_ID } from "@mocks/config"; 

const GamesList = () => {

    return (<>
        
        <hr />
        <br />         
    
        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby/join-game">Lien de connexion sur une partie existante (bouton) </Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Lien de connexion sur une nouvelle partie (bouton) </Link></li>
        </ul>

        <hr />

        <ul>
            <li className="font-bold">Liste des parties en cours :</li>
            <li>Partie #1 (état de partie)  <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #2 (état de partie) <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #3 (état de partie) <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #4 (état de partie) <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #5 (état de partie) <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #42 (état de partie) <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
        </ul>

        <hr />

        <ul>
            <li className="font-bold">Liste des parties terminées :</li>
            <li>Partie #1 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #2 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #3 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #4 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #5 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #42 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
        </ul>

        <hr />        
        <p><Link className="text-blue-500 underline" to={`/login`}>Retour au menu (déconnexion)</Link></p>
        <br />
    </>)

}

export default GamesList
