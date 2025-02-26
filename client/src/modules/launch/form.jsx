import React, { useEffect, useState } from "react";
import Initialisation from "./subfolder/initialisation";
import WaitingOpponentDeck from "./subfolder/waitingopponentdeck";

import './form.css';
import '../general.css';

function LaunchPage() {
    let i = 0;

/*     Tableaux    */
    const dynamicVal = [
        ["Le","La","Un","Une","Mon"],
        ["chat","chien","enfant","oiseau","voisin"],
        ["mange","regarde","porte","attrape","entend"],
        ["Le","La","Un","Une","Mon"],
        ["croquette","ballon","livre","gâteau","arbre"]
    ]

/*     Tableaux statiques   */
    const staticVal1 = ["/alpha","/beta","/gamma","/delta"];
    const staticVal2 = ["GET","POST","PUT","DELETE"];

/*     Changements d'états    */
    const [phrase, setPhrase] = useState([
                // Dimensions
        { word: dynamicVal[0][0], route: staticVal1[0], method: staticVal2[0], position: 1},
        { word: dynamicVal[1][0], route: staticVal1[0], method: staticVal2[0], position: 2},
        { word: dynamicVal[2][0], route: staticVal1[0], method: staticVal2[0], position: 3},
        { word: dynamicVal[3][0], route: staticVal1[0], method: staticVal2[0], position: 4},
        { word: dynamicVal[4][0], route: staticVal1[0], method: staticVal2[0], position: 5}
    ]);
    
    const [isSubmitted, setIsSubmitted] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target
        const [dimension, key] = name.split('.');
        console.log("1",name , "2",dimension,  "3",key,  "4",value)

        {/*
        const { name, value } = e.target
        const [dimension, key] = name.split('.');
        
        setPhrase((prevPhrase) => ({
            ...prevPhrase,
            [dimension]: {
                ...prevPhrase[dimension],
                [key]: [value],
            }}))
            console.log(e.target.value, name)*/}
    };

    switch(isSubmitted) { 
        case 1:
            return (<>
                <div className="initBackgroundContainer1">
                    <Initialisation handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={i} phrase={phrase} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
                </div>
            </>); 
   
        case 2:
            return (<>  
                <div className="waitBackgroundContainer2">
                    <WaitingOpponentDeck phrase={phrase}/>
                </div>
            </>); 
    }
}

export default LaunchPage