import React from "react";
import 'loginpattern.css';
import {link} from "react-router-dom"

function LoginPattern() {
    return (
    
        <div className="fullBackground">
            <nav className="loginNav">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            </nav>
    
            <p className="loginText">Se connecter</p>
    
            <div className='containerAccount'>
            <div></div>
            <input type="email" id="email" name="email" placeholder='Entrez un email' required />
            <div></div>
            <input type="password" id="password" name="password" placeholder='Entrez un mot de passe' required />
            
            </div>

            <div className="loginConnexion" >
            <h1>{/*Space*/}</h1>
            <button className="loginButton">Se connecter</button>
            </div>
        </div>
    )
};

export default LoginPattern;