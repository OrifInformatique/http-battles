import React, {useState} from "react";
import { Link } from "react-router-dom";
import Navigation from "../navigation/navigation";
import '../general.css';
import './registerpage.css'

function AccountCreated() {
    console.log(formData)

    return (<>
        <h1 id="textRegister2" className="calibri">
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

function RegisterContainer({formData, onChange}) {
    /*     State de changement du contenu du container     */

    const [registerAccount, setRegisterAccount] = useState (
        <>
            <h1 id="textRegister1" >
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

            <div className="nameContainer">
                <input type="text" className="calibri" id="prenom" name="Prénom" placeholder='Prénom' value={formData.prenom} onChange={onChange} required />
                <input type="text" className="calibri" id="nomDeFamille" name="Nom de Famille" value={formData.nom} onChange={onChange} placeholder='Nom de famille' required />
            </div>
                <input type="text" className="calibri" id="username" name="username" value={formData.username} onChange={onChange} placeholder="Nom d'utilisateur" required/>
                <input type="email" className="calibri" id="email" name="email" value={formData.prenom} onChange={onChange} placeholder='Entrez un email' required />
                <input type="password" className="calibri" id="password1" name="password1" value={formData.password1} onChange={onChange} placeholder='Entrez un mot de passe' required />
                <input type="password" className="calibri" id="password2" name="password2" value={formData.password2} onChange={onChange} placeholder='Confirmez le mot de passe' required />

            <div className="checkboxRegisterLogin">
                <input type="checkbox" className="calibri" id="checkboxRegisterLogin"/> 
                <label htmlFor="checkboxRegisterLogin">   
                    <span className="checkbox-border"></span>
                    <span className="checkbox-label">J'accepte les {/*A passer le texte suivant en LINK pour les conditions */} conditions d'utilisations de HTTP Battles</span>
                </label>
            </div>
        </>);


    return(<>{registerAccount}
    </>)
}

function RegisterPage() {     
    
    /*     State de sauvegarde de données     */

    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        username: "",
        email: "",
        password1: "",
        password2: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Données soumises :", formData);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (<>
        <Navigation/>
        <div id="containerFullBackground" className="fullBackgroundRegister">

            <form onSubmit={handleSubmit} className="registerContainer">
                <RegisterContainer formData={formData} onChange={onChange}/>
                <button type="submit" onClick={() => setRegisterAccount(<AccountCreated/>)} className="buttonRegister">Création de votre compte</button>
            </form>

        </div>

    </>)
    }

export default RegisterPage


