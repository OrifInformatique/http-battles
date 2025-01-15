import React from "react";
import { Link } from "react-router-dom";
import './navigation.css';
import '../general.css'

function Navigation() {
    return(<>
      <p className="font-bold">Navigation : </p>
        <nav className="loginNav">
            <li><Link className="text-blue-500 underline" to="/login">Formulaire de login</Link></li>
            <li><Link className="text-blue-500 underline" to="/lobby">Lobby</Link></li>
        </nav>
    </>)
}

export default Navigation