import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './launchpage.css'
import '../general.css';
import { Select } from "@headlessui/react";

function LaunchPage() {

    const [phrase, setPhrase] = useState({
        // Dimensions
        d1: {
            firstword: [""],
            firstroute: [""],
            firstmethod: [""],
        },
        d2: {
            secondword: [""],
            secondroute: [""],
            secondmethod: [""],
        },
        d3: {
            thirddword: [""],
            thirdroute: [""],
            thirdsmethod: [""],
        },
        d4: {
            fourthword: [""],
            fourthroute: [""],
            fourthsmethod: [""],
        },
        d5: {
            fifthword: [""],
            fifthroute: [""],
            fifthmethod: [""],
        }
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const timer = setTimeout(() => {
            navigate(''); // Rediriger automatiquement après 3 secondes  
        }, 3000);

        console.log("Redirection effectuée");

        return () => clearTimeout(timer);
    };

    const onChange = (e) => {
        const { name, value } = e.target
        const [dimension, key] = name.split('.');

        setPhrase((prevPhrase) => ({
            ...prevPhrase,
            [dimension]: {
                ...prevPhrase[dimension],
                [key]: [value],
            }
        }));
    };


    console.log("Array :", phrase)
    return (
        <>  <div className="testContainer">
            <h2>Partie #{/*numéro de la partie */} - Création du deck</h2>

            <form onSubmit={handleSubmit}>
                <h1>Partie {} - Initialisaiton de la phrase </h1>
                <h2></h2>
           {/*                                      */}  
                <h2>Mot 1</h2>
                <select style={{color:"black"}}>
                    <option value="" >Le</option>
                    <option value="" >La</option>
                    <option value="" >Des</option>
                    <option value="" >Les</option>
                </select>
                
                <h3>Route</h3>
                <select style={{color:"black"}}>
                    <option value="" >/alpha</option>
                    <option value="" >/beta</option>
                    <option value="" >/gamma</option>
                    <option value="" >/delta</option>
                </select>
                
                <h3>Méthode</h3>
                <select style={{color:"black"}}>
                    <option value="" >GET</option>
                    <option value="" >POST</option>
                    <option value="" >PUT</option>
                    <option value="" >DELETE</option>
                </select>
           {/*                                      */}  
                <h2>Mot 1</h2>
                <select style={{color:"black"}}>
                    <option value="" >Le</option>
                    <option value="" >La</option>
                    <option value="" >Des</option>
                    <option value="" >Les</option>
                </select>
              
                <h3>Route</h3>
                <select style={{color:"black"}}>
                    <option value="" >/alpha</option>
                    <option value="" >/beta</option>
                    <option value="" >/gamma</option>
                    <option value="" >/delta</option>
                </select>
                
                <h3>Méthode</h3>
                <select style={{color:"black"}}>
                    <option value="" >GET</option>
                    <option value="" >POST</option>
                    <option value="" >PUT</option>
                    <option value="" >DELETE</option>
                </select>
            {/*                                      */}  

            </form>
            </div>
        </>
    ); 
}

export default LaunchPage