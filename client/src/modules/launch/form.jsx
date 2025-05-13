import React, { useState } from "react";
import Initialisation from "./subfolder/initialisation";
import WaitingOpponentDeck from "./subfolder/waitingopponentdeck";
import Victory from "./subfolder/victory.jsx"

import './form.css';
import '../general.css';

function LaunchPage() {
    let userId = useState(0);
    let gameId = useState(0);
    let i = 0;

/*     Tableaux    */
    const dynamicVal = [
        ["Le","La","Un","Une","Mon"],
        ["chat","chien","enfant","oiseau","voisin"],
        ["mange","regarde","porte","attrape","entend"],
        ["le","la","un","une","mon"],
        ["croquette","ballon","livre","gâteau","arbre"]
    ]

/*     Tableaux statiques   */

    const staticVal1 = ["/alpha","/beta","/gamma","/delta"];
    const staticVal2 = ["GET","POST","PUT","DELETE"];

/*     Changements d'états    

*/
    const [phrase, setPhrase] = useState(
        [

            userId, 
        
            gameId, 
        
            [ 
                
                { 
        
                    "word": { 
        
                        "content": dynamicVal[0][0], 
        
                        "position": [staticVal1[0], staticVal2[0]] 
        
                    } 
        
                    }, 
        
                    { 
        
                    "word": { 
        
                        "content": dynamicVal[1][0], 
        
                        "position": [staticVal1[0], staticVal2[0]] 
        
                    } 
        
                    }, 
        
                    { 
        
                    "word": { 
        
                        "content":  dynamicVal[2][0], 
        
                        "position": [staticVal1[0], staticVal2[0]] 
        
                    } 
        
                    }, 
        
                    { 
        
                    "word": { 
        
                        "content": dynamicVal[3][0], 
        
                        "position": [staticVal1[0], staticVal2[0]] 
        
                    } 
            
                    },
                    
                    { 
        
                    "word": { 
        
                        "content": dynamicVal[4][0], 
        
                        "position": [staticVal1[0], staticVal2[0]] 
        
                    } 
        
                },
        
            ] 
        
    ])
    
    const [isSubmitted, setIsSubmitted] = useState(3);

    const handleChange = (e) => {
        console.log(newPhrase)
        console.log(newPhrase)

        const { name, value } = e.target;
        const newPhrase = [...phrase];
        newPhrase[0].phrase[i].word.content = value;
        setPhrase(newPhrase);
      
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
                    <WaitingOpponentDeck dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={i} phrase={phrase} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
                </div>
            </>); 

        case 3:
            return(<>
                <div className="waitBackgroundContainer2">
                    <Victory phrase={phrase}/>
                </div>
            </>)
    }
}

export default LaunchPage