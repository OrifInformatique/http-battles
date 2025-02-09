import React, { useState } from "react";
import '../general.css';
import './form.css';
//Composant comportant la modification
const EmailReadyForgotPassword = () => {
  return <p>Un e-mail contenant les instructions pour réinitialiser votre mot de passe vient de vous être envoyé. Nous vous invitons à vérifier votre boîte de réception ainsi que vos spams ou courriers indésirables.
Si vous ne recevez pas l’e-mail dans les prochaines minutes, veuillez réessayer ou contacter notre support pour assistance.</p>;
};

function ForgotPassword() {
  const [resetPassword, setResetPassword] = useState(
    <>
      <input type="email" className="emailReset" name="email" placeholder="Entrez votre adresse mail" required />
      <button onClick={() => setResetPassword(<EmailReadyForgotPassword />)} className="resetButton" >Envoi</button>
    </>);

  return ( <div className="containerForgotPassword">
              <h1>Réinitialiser votre mot de passe</h1>
              {resetPassword}             
           </div>);
}

export default ForgotPassword;