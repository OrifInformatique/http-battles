import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoopForList from "../ui/launch";
import './form.css';
import '../general.css';

function LaunchPage() {

    const dynamicVal = [
        ["Le","La","Un","Une","Mon"],
        ["chat","chien","enfant","oiseau","voisin"],
        ["mange","regarde","porte","attrape","entend"],
        ["Le","La","Un","Une","Mon"],
        ["croquette","ballon","livre","gâteau","arbre"]
    ]

    const staticVal1 = ["/alpha","/beta","/gamma","/delta"];
    const staticVal2 = ["GET","POST","PUT","DELETE"];

    const [phrase, setPhrase] = useState({
        // Dimensions
        d1: {
            word: [""],
            route: [""],
            method: [""],
        },
        d2: {
            word: [""],
            route: [""],
            method: [""],
        },
        d3: {
            word: [""],
            route: [""],
            method: [""],
        },
        d4: {
            word: [""],
            route: [""],
            method: [""],
        },
        d5: {
            word: [""],
            route: [""],
            method: [""],
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        const [dimension, key] = name.split('.');
        
        setPhrase((prevPhrase) => ({
            ...prevPhrase,
            [dimension]: {
                ...prevPhrase[dimension],
                [key]: [value],
            }}))
            console.log(e.target.value, name)
    };

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const timer = setTimeout(() => {
            navigate(''); // Rediriger automatiquement après 3 secondes  
        }, 3000);

        console.log("Redirection effectuée");
        return () => clearTimeout(timer); 
    };


    console.log("phrase array via handleChange :",phrase)
    return (
        <div className="firstContainer">
             
            <div className="initialisationContainer">
                <h1 style={{fontWeight:'bold'}}>Partie #{/*numéro de la partie */} - Initialisation de la phrase </h1>

                <form onSubmit={handleSubmit}>
                            {/*Liste*/}
                            <div className="listLaunchContainer">
                                <div className="firstListLaunchContainer"> 
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1}/>
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2}/>
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3}/>
                                </div>
                                <div></div>
                                <div className="thirdListLaunchContainer"> 
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4}/>
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5}/>

                                </div>
                            </div>
                </form>
            </div>
        
            <div className="testContainer">
                <div className="titleValidationContainer">
                    <h2 style={{fontWeight:'bold'}}>Etape 1: </h2>
                    <h3>Rentrez votre phrase.</h3>
                </div>

                <div className="phraseLaunchContainer">
                    <h1>Phrase choisie : {phrase.d1.word} {phrase.d2.word} {phrase.d3.word} {phrase.d4.word} {phrase.d5.word}</h1>
                </div> 
                
 
                        <button type="submit" className="buttonLaunch">Valider la phrase</button>

            </div>
        </div>
    ); 
}

export default LaunchPage