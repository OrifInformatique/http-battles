import React, { useEffect, useState } from "react";
import Navigation from "../navigation/navigation";
import {Link, Navigate, useNavigate} from "react-router-dom";
import './loginpattern.css';
import '../general.css';

function LoginPattern() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    })

    const navigate = useNavigate();

    /*     Redirection de page si l'user est login    */

        useEffect(() => {
            if (isLoggedIn) {

                const timer = setTimeout(() => {
                    navigate('/lobby');
                }, 3000);        //     Rediriger automatiquement après 3 secondes  

    
                console.log("Redirection effectuée");
    
                return () => clearTimeout(timer);
            }
            
        }, [isLoggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoggedIn(true)
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };
    
    console.log("données:", loginData)

    return (<>
        
        <Navigation/>

        {/*- Container contenant photo de fond*/} 

        <div id="containerFullBackground" className="fullBackground">

            {
                isLoggedIn ? 
                    <h1>Heureux de vous voir de retour mousaillon! Vôtre équipage n'attend plus que vous afin de partir à la conquête du web.</h1>
                :
                <div className="centerTextContainer">
                    <p className="sloganLogin">Bienvenue à bord du navire ! 🏴‍☠️
                    Il est temps de lever l’ancre et de naviguer vers de nouveaux horizons. <br/>⚓ Connecte-toi avec ton mot de passe secret pour accéder à la carte au trésor et rejoindre l’équipage. Si tu es un nouveau pirate, ne tarde pas à t’inscrire pour ne pas manquer l’aventure.
                    <br/><br/>

                    {/*a mettre en italique*/}
                    🦜 "Seuls les pirates authentiques peuvent entrer sur le pont principal. Garde ton mot de passe aussi sûr qu’un coffre à trésor !" Prêt à hisser les voiles ?
                </p>

                    {/*- Container Blanc*/}
                    <form onSubmit={handleSubmit} className="loginContainer">
                        <h1 className="textLogin">Login</h1>
                            <input type="email" className="calibri" id="emaillogin" name="email" value={loginData.email} onChange={onChange} placeholder='Entrez votre email' required />
                            <input type="password" className="calibri" id="passwordlogin" name="password" value={loginData.password} onChange={onChange} placeholder='Entrez votre mot de passe' required />

                            <div className="checkboxRegisterLogin">
                                <input type="checkbox" className="calibri" id="checkboxRegisterLogin"/> 
                                <label htmlFor="checkboxRegisterLogin">
                                    <span className="checkbox-border"></span>
                                    <span className="checkbox-label">Rester connecter <Link className="text-black-500 underline" to="/forgotpassword" > Oublié mon mot de passe </Link> </span>
                                </label>
                            </div>
                            
                            <button type="submit" className="buttonLogin">Se connecter</button>
                            <p>
                                Pas encore de compte ? <Link className="text-blue-500 underline" to="/register">Créez un compte.</Link>
                            </p>
                        </form>
                </div>
            }
        
        </div>
    </>
    )
};

export default LoginPattern