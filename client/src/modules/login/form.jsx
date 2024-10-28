import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {

    return (<>

        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/register">Formulaire de creation de compte</Link></li>
            <li><Link className="text-blue-500 underline" to="/lobby">Lobby</Link></li>
        </ul>

        <hr />        
        
        <p className="font-bold">Contenu : </p>
        <ul>
            <li>Un lien vers le formulaire de création de compte</li>
            <li>Un formulaire de login contenant :</li>
            <li>- Un champs email</li>
            <li>- Un champs mot de passe</li>
            <li>- Un bouton de validation du formulaire</li>
        </ul>
        
        <hr />        
    
    </>)

}

export default LoginForm
