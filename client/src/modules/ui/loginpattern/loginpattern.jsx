import React, { useState } from "react";
import Navigation from "../navigation/navigation";
import {Link} from "react-router-dom";
import './loginpattern.css';
import '../general.css';

function LoginConnected() {
    return  <h1>Heureux de vous voir de retour mousaillon! Vôtre équipage n'attend plus que vous afin de partir à la conquête du web.</h1>

}

function LoginPattern() {
    const [loginAccount, setLoginAccount] = useState (<>
      {/*- Container contenant photo de fond*/} 
      <div id="containerFullBackground" className="fullBackground">
        <p className="sloganLogin">Bienvenue à bord du navire ! 🏴‍☠️
            Il est temps de lever l’ancre et de naviguer vers de nouveaux horizons. <br/>⚓ Connecte-toi avec ton mot de passe secret pour accéder à la carte au trésor et rejoindre l’équipage. Si tu es un nouveau pirate, ne tarde pas à t’inscrire pour ne pas manquer l’aventure.
            <br/><br/>

            {/*a mettre en italique*/}
            🦜 "Seuls les pirates authentiques peuvent entrer sur le pont principal. Garde ton mot de passe aussi sûr qu’un coffre à trésor !" Prêt à hisser les voiles ?
        </p>

        {/*- Container Blanc*/}
        <div className="loginContainer">
            <h1 className="textLogin">Login</h1>
            <input type="email" className="calibri" id="email" name="email" placeholder='Entrez votre email' required />
            <input type="password" className="calibri" id="password" name="password" placeholder='Entrez votre mot de passe' required />

            <div className="checkboxRegisterLogin">
                <span className="checkbox-border"> <input type="checkbox" className="calibri" id="checkboxRegisterLogin"/> </span><label className="spaceBetweenLoginAndPassword">Rester connecter</label> <Link className="text-black-500 underline" to="/forgotpassword" > Oublié mon mot de passe </Link>
            </div>
            
            <button onClick={() => setLoginAccount(LoginConnected)} className="buttonLogin">Se connecter</button>
            <p>
                Pas encore de compte ? <Link className="text-blue-500 underline" to="/register">Créez un compte.</Link>
            </p>
        </div>

    </div>

    </>)

    return (<>
        <Navigation/>
        {loginAccount}
    </>
    )
};

export default LoginPattern