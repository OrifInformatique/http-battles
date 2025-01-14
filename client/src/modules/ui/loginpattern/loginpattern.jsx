import React from "react";
import Navigation from "../navigation/navigation";
import './loginpattern.css';
import {Link} from "react-router-dom";
import '../general.css';





function LoginPattern() {
    return (<>
        <Navigation/>
           
    {/*- Container contenant photo de fond*/} 
    <div id="containerFullBackground" className="fullBackground">

        
        <p className="loginSlogan">Heureux de vous voir de retour mousaillon! Vôtre équipage n'attend plus que vous afin de partir à la conquête du web.
        </p>
    {/*- Container Blanc*/}
    <div className="containerAccount">
        <h1 className="loginText">Login</h1>
        <input type="email" id="email" name="email" placeholder='Entrez un email' required />
        <input type="password" id="password" name="password" placeholder='Entrez un mot de passe' required />

        <div className="containerCheckbox">
            <input type="checkbox" className="loginCheckbox"/> <label>Rester connecter</label> <Link className="text-black-500 underline" to="/forgotpassword" > Oublié mon mot de passe </Link>
        </div>

        <button className="loginButton">Se connecter</button>
        <p>
            Pas encore de compte ? <Link className="text-blue-500 underline" to="/register">Créez un compte.</Link>
        </p>
    </div>

    </div>

    </>
    )
};

export default LoginPattern