import React, {useState} from 'react';
import Button from "../../ui/button";

function Word({phrase, word}) {
    /*
        Récolter les mots sur l'API
    */
   return(<>
        <p style={{display:"flex", position: "relative", fontSize: "30px", height: "20px", }}> {word} </p>
   </>)
}

function Victory({phrase, victory}) {        

    return(<>

        <div className={victory ? "victoryContainer" : "defeatContainer"} style={{display:"flex", flexFlow:"column nowrap", alignItems:"center", zIndex:"4"}}>
            {
                victory ? 
                <h1 className="congratulationsPhrase">Félicitations vous avez gagné !  
                    <img style={{ width: "50px", paddingLeft:"5px"}} src="../../../../assets/images/element/CC0/victory/golden_trophy.png" alt="golden trophy"/>
                </h1> 
                : 
                <h1 className="congratulationsPhrase">Malheuresement vous avez perdu !
                    <img style={{ width: "100px", paddingLeft:"5px"}} src="./../../../assets/images/element/CC0/victory/game_over.png" alt="game over"/>
                </h1>
            }

            <div className={victory ? "wordEndContainer" : "wordEndContainerGO"} /*style={{display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"stretch"}}*/>
                <div style={{ display:"flex", flexFlow:"column", alignItems:"center"}}>
                    <h2> Votre phrase choisie </h2>
                    <div style={{ display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"space-between", width:"auto", gap:"5px" }}>
                        <Word phrase={phrase} word={"word"}/>
                        <Word phrase={phrase} word={"word"}/>
                        <Word phrase={phrase} word={"l"}/>
                        <Word phrase={phrase} word={"osos"}/>
                        <Word phrase={phrase} word={"sadsad"}/>
                    </div>  
                </div>

            
                <div style={{ display:"flex", flexFlow:"column", alignItems:"center", }} >
                    <h2> La phrase de votre adversaire </h2>
                    <div style={{ display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"space-between", width:"auto", gap:"5px" }}>
                        <Word phrase={phrase} word={"l"}/>
                        <Word phrase={phrase} word={"word"}/>
                        <Word phrase={phrase} word={"os5124"}/>
                        <Word phrase={phrase} word={"osos"}/>
                        <Word phrase={phrase} word={"sadsad"}/>
                    </div>
                </div>
            </div>

            <div style={{ display:"flex", flexFlow:"column", alignItems:"center", gap:"20px", paddingTop:"400px", fontSize:"30px"}}>
                <h1 style={{}} >
                    Nouvelle partie contre [username]
                </h1>
                <Button className={victory ? "victoryButton" : "defeatButton"} label={"Revanche"}/>
            </div>
        </div>
    </>)
}

export default Victory