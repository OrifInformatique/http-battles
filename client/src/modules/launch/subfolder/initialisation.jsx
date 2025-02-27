import React from "react";
import Button from "../../ui/button";
import '../../general.css';

function MyList({ handleChange, valeurs = [], i, tech}) {
    return (
        <ul className="initUl" style={{ color: "black" }}>
             {valeurs.map((valeur, index) => (
                <li className="initLi" key={index} onClick={() => handleChange({ target: { name: `${i}.${tech}`, value: valeur } })} style={{ cursor: "pointer" }}>
                    {valeur}
                </li>
            ))}
        </ul>
    );
}

function InitialisationList({ handleChange, staticVal1, staticVal2, dynamicVal, i, phrase}) {
    return (
    <>
        <ul className="initUl" style={{ color: "black"}}>
            {dynamicVal[i-1] && dynamicVal[i-1].map((value, index) => (
                <li className="initLi" key={index} >
                    {value}
                </li>
            ))}
        </ul>

        <div style={{display:"flex",flexFlow:"row", gap:"10px"}}>
            <div style={{display:"flex",flexFlow:"column"}}>
                <h3>Route</h3>
                <MyList handleChange={handleChange} tech={"route"} valeurs={staticVal1} i={i}/> 
            </div>

            <div style={{display:"flex",flexFlow:"column"}}>
            <h3>Methode</h3>
            <MyList handleChange={handleChange} tech={"method"} valeurs={staticVal2} i={i}/>
            <br/><br/><br/><br/>
            </div>
        </div>
    </>);
}

function PhraseLaunch({ handleChange ,staticVal1, staticVal2, dynamicVal, i, phrase}) {
return(<>
<h2>Mot {i} </h2>
    <InitialisationList handleChange={handleChange} staticVal1={staticVal1} staticVal2={staticVal2} dynamicVal={dynamicVal} i={i} phrase={phrase} />
</>)
}

export default ({handleChange, dynamicVal, staticVal1, staticVal2, phrase, setIsSubmitted}) => {
    return(<>
        <div className="initInitialisationContainer">
            <h1 className="initTitle"style={{fontWeight:'bold'}}>Partie #{/*numéro de la partie */} - Initialisation de la phrase </h1>
            
            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>
                <div className="">
                    {/*Liste*/}
                    <div className="initListLaunchContainer" >
                        <div className="initFirstListLaunchContainer"> 
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1} phrase={phrase.d1}/>
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2} phrase={phrase.d2}/>
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3} phrase={phrase.d3}/>
                             <div></div>
                        </div>
                        <div className="initThirdListLaunchContainer">
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4} phrase={phrase.d4}/>
                            <PhraseLaunch handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5} phrase={phrase.d5}/>
                        </div>  
                    </div>
                </div>
            </form>
        </div>
    
        <div className="initValidationContainer">
            <div className="titleValidationContainer">
                <h2 style={{fontWeight:'bold'}}>Etape 1: </h2>
                <h3>Rentrez votre phrase.</h3>
            </div>

            <div className="initPhraseLaunchContainer">
                <div className="initElementContainer">
                    <div className="initFixPhrase">
                        <h1 className="initPhrase">Phrase choisie : {phrase[0].word} {phrase[1].word} {phrase[2].word} {phrase[3].word} {phrase[4].word} </h1>
                    </div>
                </div>
            </div>
            <Button form={"myForm"} className={"initbtn"} label={"Valider la phrase"}/>
        </div>
    </>);
}
