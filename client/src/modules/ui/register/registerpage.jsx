import React, {useState} from "react";
import { Link } from "react-router-dom";
import Navigation from "../navigation/navigation";
import '../general.css';
import './registerpage.css'

function AccountCreated() {
    return (<>
        <h1 className="textRegister2">
            Register
        </h1>
        <div className="accountCreatedContainer">
            <h3 className="registerPhrase ">
                [Nom/Prénom], nous vous remercions chaleureusement de vous être inscrit/e sur notre plateforme. <br/><br/>Votre inscription a bien été prise en compte. Vous pouvez dès à présent vous rendre sur la page de connexion pour accéder à votre compte et profiter de nos services : 👉 <Link className="text-blue-500 underline" to="/login">Lien vers le formulaire de connexion</Link> <br/>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter. Nous sommes là pour vous aider ! Encore merci de votre confiance et à très bientôt,
                <br/><br/>L'équipe HTTP BATTLE de l'Orif de Pomy
            </h3>
        </div>
    </>)
}

function RegisterContainer() {
    const [registerAccount, setRegisterAccount] = useState (
        <>
            <h1 className="textRegister1">
                Register
            </h1>
            <h3 className="phraseRegister">
                Créez votre premier compte, rejoignez désormais les flots obscurs des richesses oubliées de HTTP Battles
            </h3>
                
            <div className="facultatifContainer">
                    <h4 className="facultatif">*facultatif</h4>
                    <p></p>
                    <h4 className="facultatif" id="facultatif2">*facultatif</h4>
            </div>

            <div className="name">
                <input type="text" className="calibri" id="prenomRegister" name="Prénom" placeholder='Prénom' required />
                <input type="text" className="calibri" id="ndfRegister" name="Nom de Famille" placeholder='Nom de famille' required />
            </div>
                <input type="text" className="calibri" id="username" name="username" placeholder="Nom d'utilisateur" required/>
                <input type="email" className="calibri" id="email" name="email" placeholder='Entrez un email' required />
                <input type="password" className="calibri" id="password" name="password" placeholder='Entrez un mot de passe' required />
                <input type="password" className="calibri" id="password" name="password" placeholder='Confirmez le mot de passe' required />

            <div className="checkboxRegister">
                <input type="checkbox" className="calibri" id="loginCheckbox"/> <span class="checkbox-border"></span><label>J'accepte les {/*A passer le texte suivant en LINK pour les conditions */}conditions d'utilisations de HTTP Battles</label>
            </div>

                <button type="submit" onClick={() => setRegisterAccount(<AccountCreated/>)} className="buttonRegister">Création de votre compte</button>
        </>);

    return(<>{registerAccount}
    </>)
}

function RegisterPage() { 
    return (<>
        <Navigation/>

        <div id="containerFullBackground" className="fullBackgroundRegister">
            <div className="registerContainer">
                <RegisterContainer/>
            </div>
        </div>

    </>)
    }

export default RegisterPage