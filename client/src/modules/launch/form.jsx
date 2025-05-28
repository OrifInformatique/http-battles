import React, { useState } from "react";
import Initialisation from "./subfolder/initialisation";
import WaitingOpponentDeck from "./subfolder/waitingopponentdeck";
import Victory from "./subfolder/victory.jsx"

import './form.css';
import '../general.css';

/*     Tableaux    */
    export const dynamicVal = [
        ["Le","La","Un","Une","Mon"],
        ["chat","chien","enfant","oiseau","voisin"],
        ["mange","regarde","porte","attrape","entend"],
        ["le","la","un","une","mon"],
        ["croquette","ballon","livre","gâteau","arbre"]
    ]

/*     Tableaux statiques   */

    export const staticVal1 = ["/alpha","/beta","/gamma","/delta"];
    export const staticVal2 = ["GET","POST","PUT","DELETE"];

function LaunchPage() {
    let userId = useState(0);
    let gameId = useState(0);
    let i = 0;

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
    
    const [isSubmitted, setIsSubmitted] = useState(1);

    switch(isSubmitted) { 
        case 1:
            return (<>
                <div style={{color:"white"}} className="initBackgroundContainer1">
                    <Initialisation setPhrase={setPhrase} phrase={phrase} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
                </div>
            </>); 
   
        case 2:
            return (<>  
            
                <div className="waitBackgroundContainer2">
                    <WaitingOpponentDeck i={i} phrase={phrase} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>
                </div>
            </>); 
    }
}

export default LaunchPage