import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Contextes
import { AuthContext } from "../../contexts/auth";

// Styles
import "./form.css";
import "../general.css";

// UI 
import Button from "../ui/button";

const RegisterForm = ({ formData, onChange, handleSubmit, errorMessage }) => {
  return (
    <form onSubmit={handleSubmit} className="registerContainer">
      <h1 id="textRegister1">Register</h1>
      <h3 className="phraseRegister">
        Créez votre premier compte, rejoignez désormais les flots obscurs des
        richesses oubliées de HTTP Battles
      </h3>

      <div className="facultatifContainer">
        <h4 className="facultatif">*facultatif</h4>
        <p></p>
        <h4 className="facultatif" id="facultatif2">
          *facultatif
        </h4>
      </div>

      <div className="nameContainer">
        <input
          type="text"
          className="calibri name"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={onChange}
          placeholder="Prénom"
          required
        />
        <input
          type="text"
          className="calibri name"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={onChange}
          placeholder="Nom de famille"
          required
        />
      </div>

      <input
        type="text"
        className="calibri"
        id="username"
        name="username"
        value={formData.username}
        onChange={onChange}
        placeholder="Nom d'utilisateur"
        required
      />
      <input
        type="email"
        className="calibri"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Entrez un email"
        required
      />
      <input
        type="password"
        className="calibri"
        id="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Entrez un mot de passe"
        required
      />
      <input
        type="password"
        className="calibri"
        id="confirm_password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={onChange}
        placeholder="Confirmez le mot de passe"
        required
      />

      <div className="checkboxRegisterLogin">
        <input type="checkbox" className="calibri" id="checkboxRegisterLogin" />
        <label htmlFor="checkboxRegisterLogin">
          <span className="checkbox-border"></span>
          <span className="checkbox-label">
            J'accepte les{" "}
            {/*A passer le texte suivant en LINK pour les conditions */}{" "}
            conditions d'utilisations de HTTP Battles
          </span>
        </label>
      </div>

      <Button className={"buttonRegister"} label={"Création de votre compte"}/>

      { errorMessage ? <div>
        <p><strong>Error : </strong> {errorMessage}</p> 
      </div> : ''}
    </form>
  );
}

const RegisterCompleted = ({ formData }) => {
  return (
    <div className="registerContainer">
      <h1 id="textRegister2" className="calibri">
        Register
      </h1>

      <div className="accountCreatedContainer">
        <h3 className="registerPhrase ">
          {formData.username}, nous vous remercions chaleureusement de vous être
          inscrit/e sur notre plateforme. <br />
          <br />
          Votre inscription a bien été prise en compte. Vous pouvez dès à
          présent vous rendre sur la page de connexion pour accéder à votre
          compte et profiter de nos services : 👉{" "}
          <Link className="text-blue-500 underline" to="/">
            Lien vers le formulaire de connexion
          </Link>{" "}
          <br />
          <br />
          Si vous avez des questions ou besoin d'assistance, n'hésitez pas à
          nous contacter. Nous sommes là pour vous aider ! Encore merci de votre
          confiance et à très bientôt,
          <br />
          <br />
          L'équipe HTTP BATTLE de l'Orif de Pomy
        </h3>
      </div>
    </div>
  );
}

const RegisterPage = () => {
  // Hooks d'état
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // Hooks de contexte
  const { authRegister } = useContext(AuthContext);

  // Fonction d'enregistrement de nouveau compte
  const callRegister = async () => {
    setErrorMessage(null);
    const data = await authRegister(formData);
    if (data && !data.error) {
      console.log(data);
      setIsSubmitted(true);
    } else {
      setErrorMessage(data.error.message);
    }
  };

  // Evenements
  const handleSubmit = (e) => {
    e.preventDefault();
    callRegister();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div id="containerFullBackground" className="fullBackgroundRegister">
        {isSubmitted ? (
          <RegisterCompleted formData={formData} />
        ) : (
          <RegisterForm
            formData={formData}
            onChange={onChange}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </>
  );
}

export default RegisterPage;
