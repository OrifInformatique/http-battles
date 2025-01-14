import React from "react";
import Navigation from "../navigation/navigation";
import '../general.css';
import './registerpattern.css'

function LoginContainer() {
    return(<>
        <div className="containerRegister">
            <h1 className="registerText">
                Register
            </h1>
            <h3 className="phraseRegister">
                Créez votre premier compte, rejoignez désormais les flots obscurs des richesses oubliées de HTTP Battles
            </h3>
                
            <div className="containerFacultatif">
                    <h4 className="facultatif">*facultatif</h4>
                    <p></p>
                    <h4 className="facultatif" id="facultatif2">*facultatif</h4>
            </div>

            <div className="name">
                <input type="text" id="prenomRegister" name="Prénom" placeholder='Prénom' required />
                <input type="text" id="ndfRegister" name="Nom de Famille" placeholder='Nom de famille' required />
            </div>
                <input type="text" id="usernameRegister" name="username" placeholder="Nom d'utilisateur" required/>
                <input type="email" name="email" placeholder='Entrez un email' required />
                <input type="password" name="password" placeholder='Entrez un mot de passe' required />
                <input type="password" name="password" placeholder='Confirmez le mot de passe' required />

            <div>
                <input type="checkbox" className="loginCheckbox"/> <label>J'accepte les {/*A passer le texte suivant en LINK pour les conditions */}conditions d'utilisations de HTTP Battles</label>
            </div>

            <button type="submit" className="registerButton">Création de votre compte</button>
        </div>
    </>)
}

function RegisterPattern() { 
    return (<>
        <Navigation/>

        <div id="containerFullBackground" className="fullBackgroundRegister">
            <LoginContainer/>
        </div>

    </>)
    }

export default RegisterPattern