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
        d1: { word: dynamicVal[0][0],  route: staticVal1[0], method: staticVal2[0]},
        d2: { word: dynamicVal[1][0],route: staticVal1[0], method: staticVal2[0] },
        d3: {word: dynamicVal[2][0], route: staticVal1[0], method: staticVal2[0] },
        d4: {word: dynamicVal[3][0], route: staticVal1[0], method: staticVal2[0] },
        d5: { word: dynamicVal[4][0], route: staticVal1[0], method: staticVal2[0] }
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
    
    const handleSubmit = () => {
        e.preventDefault();

        const timer = setTimeout(() => {
            navigate(''); // Rediriger automatiquement après 3 secondes  
        }, 3000);

        console.log("Redirection effectuée");
        return () => clearTimeout(timer); 
    };

    console.log("phrase array via handleChange :", phrase)
    return (
        <div className="firstContainer">
            <div className="initialisationContainer">
                <h1 style={{fontWeight:'bold'}}>Partie #{/*numéro de la partie */} - Initialisation de la phrase </h1>

                <form onSubmit={handleSubmit}>
                            {/*Liste*/}
                            <div className="listLaunchContainer">
                                <div className="firstListLaunchContainer"> 
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1} phrase={phrase.d1}/>
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2} phrase={phrase.d2}/>
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3} phrase={phrase.d3}/>
                                </div>
                                <div></div>
                                <div className="thirdListLaunchContainer">
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4} phrase={phrase.d4}/>
                                    <LoopForList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5} phrase={phrase.d5}/>

                                </div>
                            </div>
                </form>
            </div>
        
            <div className="validationContainer">
                <div className="titleValidationContainer">
                    <h2 style={{fontWeight:'bold'}}>Etape 1: </h2>
                    <h3>Rentrez votre phrase.</h3>
                </div>
                <div className="phraseLaunchContainer">
                    <div className="elementContainer">
                        <div className="fixPhrase">
                            <h1 className="phrase">Phrase choisie : {phrase.d1.word} {phrase.d2.word} {phrase.d3.word} {phrase.d4.word} {phrase.d5.word} </h1>
                        </div>
                    </div>
                </div>
                <button type="submit" className="buttonLaunch">Valider la phrase</button>
            </div>
       
        </div>
    ); 
}

export default LaunchPage