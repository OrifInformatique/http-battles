import React, { useState } from "react";
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

    const [name,setName] = useState("Votre clé");

    const [gameStatus, setStatus] = UseState(0);

    //{key :"Votre clé"} syntaxe pas tout à fait correcte pour le reste du programme

    /*  
    
    partie feedback de la clé de partie

    handleClick(e) {
    var count = this.state.count;
    count = count !== 3 ? count + 1 : 0;
    this.setState({
      count: count
    });
  }
  
  function fillColor(count) {
    var fill = "";
    if(count === 1) fill = "#E1E0DD";
    if(count === 2) fill = "#999999";
    if(count === 3) fill = "#000";
    return fill;
}  
  */
    
    const handleSubmit = (event) => {
        console.log(name)
        event.preventDefault();
        alert(`The name you entered was: ${name}`)
        console.log(event)
      }

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

        <br />
        <p className="font-bold">Rejoindre une partie : </p>        
        <form onSubmit={handleSubmit}>
      <label>Entrez la clé de la partie d'un autre joueur : <br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <br />
      <input type="submit" />
    </form>
    <p>Current Input Value: {name}</p>

    </>)

}

export default GamesJoin
