// Librairies externes
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Contextes
import { AuthContext } from "../../contexts/auth";

// Styles
import "./form.css";
import "../general.css";

// Eléments
import Button from "../ui/button";

const LoginForm = ({ loginData, handleSubmit, onChange, messageError }) => {
  return (
    <form onSubmit={handleSubmit} className="loginContainer">
      <h1 className="textLogin">Login</h1>
      <input
        type="email"
        className="calibri"
        id="emaillogin"
        name="email"
        value={loginData.email}
        onChange={onChange}
        placeholder="Entrez votre email"
        required
      />
      <input
        type="password"
        className="calibri"
        id="passwordlogin"
        name="password"
        value={loginData.password}
        onChange={onChange}
        placeholder="Entrez votre mot de passe"
        required
      />

      <div className="checkboxRegisterLogin">
        <input type="checkbox" className="calibri" id="checkboxRegisterLogin" />
        <label htmlFor="checkboxRegisterLogin">
          <span className="checkbox-border"></span>
          <span className="checkbox-label">
            <div className="labelContainer">
              <p>Rester connecter{" "}</p>
              <Link className="text-black-500 underline" to="/forgotpassword">
                {" "}
              <p>Oublié mon mot de passe{" "}</p>
              </Link>{" "}
            </div>
          </span>
        </label>
      </div>

      <Button className={"initbtn"} label={"Se connecter"}/>
   
      <p>
        Pas encore de compte ?{" "}
        <Link className="text-blue-500 underline" to="/register">
          Créez un compte.
        </Link>
      </p>

      {messageError ? (
          <p><strong>Error : </strong>{messageError}</p>

      ) : (
        ""
      )}
    </form>
  );
};

const LoginMessage = () => {
  return (
    <div className="sloganLogin">
      <p>
        Bienvenue à bord du navire ! 🏴‍☠️ Il est temps de lever l’ancre et de
        naviguer vers de nouveaux horizons.{" "}
      </p>
      <p>
        ⚓ Connecte-toi avec ton mot de passe secret pour accéder à la carte au
        trésor et rejoindre l’équipage. Si tu es un nouveau pirate, ne tarde pas
        à t’inscrire pour ne pas manquer l’aventure.
      </p>
      {/*a mettre en italique*/}
      <p>
        🦜 "Seuls les pirates authentiques peuvent entrer sur le pont principal.
        Garde ton mot de passe aussi sûr qu’un coffre à trésor !" Prêt à hisser
        les voiles ?
      </p>
    </div>
  );
};

// Composant principal
function LoginPage() {
  // Hooks d'état
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [messageError, setMessageError] = useState(null);

  // Hooks de contexte
  const { authLogin } = useContext(AuthContext);

  // Fonction de login
  const callLogin = async () => {
    setMessageError(null);
    const data = await authLogin(loginData);
    if (data && data.message) {
      setMessageError(data.message);
    }
  };

  // Evènement déclenché lorsque le formulaire est soumis
  const handleSubmit = (e) => {
    e.preventDefault();
    callLogin();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div id="containerFullBackground" className="fullBackground">
      <LoginMessage />
      <LoginForm
        loginData={loginData}
        handleSubmit={handleSubmit}
        onChange={onChange}
        messageError={messageError}
      />
    </div>
  );
}
         //   <Button form={"myform"} className={"initbtn"} label={"Valider la phrase"}/>

export default LoginPage;
