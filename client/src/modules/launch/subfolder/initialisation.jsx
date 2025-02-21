import React from "react";
import PhraseLaunch from "../../ui/launch/initialisation";
import '../../general.css';

export default ({handleChange, dynamicVal, staticVal1, staticVal2, phrase, setIsSubmitted}) => {
    return(<>
        <div className="initialisationContainer">
            <h1 className="title"style={{fontWeight:'bold'}}>Partie #{/*numéro de la partie */} - Initialisation de la phrase </h1>
            
            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>
                <div>
                    {/*Liste*/}
                    <div className="listLaunchContainer" >
                        <div className="firstListLaunchContainer"> 
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1} phrase={phrase.d1}/>
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2} phrase={phrase.d2}/>
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3} phrase={phrase.d3}/>
                        </div>
                        <div></div>
                        <div className="thirdListLaunchContainer">
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4} phrase={phrase.d4}/>
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5} phrase={phrase.d5}/>
                        </div>  
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
            <button form="myForm" type="submit" className="initbtn">Valider la phrase</button>
        </div>
    </>);
}
