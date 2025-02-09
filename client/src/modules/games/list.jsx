import React from "react";
import { Link } from "react-router-dom";

import { MOCKED_GAME_ID } from "@mocks/config"; 

const GamesList = () => {

    return (<>

          <h1>
            Heureux de vous voir de retour mousaillon! Vôtre équipage n'attend
            plus que vous afin de partir à la conquête du web.
          </h1>

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
        <br />         
    
        <ul>
            <li><Link className="text-blue-500 underline" to="/lobby/join-game">Lien de connexion sur une partie existante (bouton) </Link></li>
            <li><Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Lien de connexion sur une nouvelle partie (bouton) </Link></li>
        </ul>

        <hr />

        <ul>
            <li>Liste des parties en cours :</li>
            <li>Partie #1<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #2<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #3<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #4<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #5<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
            <li>Partie #42<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}`}>Continuer la partie</Link></li>
        </ul>

        <hr />

        <ul>
            <li>Liste des parties terminées :</li>
            <li>Partie #1<Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #2 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat de la partie</Link></li>
            <li>Partie #3 <Link className="text-blue-500 underline" to={`/games/${MOCKED_GAME_ID}/ended`}>Résultat lol de la partie</Link></li>
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
