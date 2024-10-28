import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {

    return (<>
    
        <hr />        

        <p className="font-bold">Navigation : </p>

        <ul>
            <li><Link className="text-blue-500 underline" to="/login">Formulaire de login</Link></li>
            <li><Link className="text-blue-500 underline" to="/lobby">Lobby</Link></li>
        </ul>

        <hr />        
        
        <p className="font-bold">Contenu : </p>

        <ul className="list-disc">
            <li>Un lien vers le formulaire de login</li>
            <li>Un formulaire de création de compte contenant : </li>
            <li>- Un champs email</li>
            <li>- Un champs username</li>
            <li>- Un champs mot de passe</li>
            <li>- Un champs confirmer le mot de passe</li>
            <li>- Un bouton de validation du formulaire</li>
        </ul>
        
        <hr />        
    
    </>)

}

export default RegisterForm
