import React from "react";
import Button from "../../ui/button";
import '../../general.css';

function MyList({ handleChange, valeurs = [], i, tech}) {
    return (
        <select name={`d${i}.${tech}`} onChange={handleChange} style={{ color: "black" }}>
            {valeurs.map((valeur, index) => (
                <option key={index}>{valeur}</option>
            ))}
        </select>
    );
}

function InitialisationList({ handleChange, staticVal1, staticVal2, dynamicVal, i, phrase}) {

return (
<>
    <select className="" defaultValue={phrase.word} onChange={handleChange} name={`d${i}.word`} style={{ color: "black"}}>
        {dynamicVal[i-1] && dynamicVal[i-1].map((value, index) => (
            <option key={index} value={value}>
                {value}
            </option>
        ))}
    </select>
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
            <h1 className="initTitle"style={{fontWeight:'bold'}}>Partie #{/*numéro de la partie */} - Test </h1>
            
            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>
                <div className="">
                    {/*Liste*/}
                    <ul>
                        <li></li>
                    </ul>
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
                        <h1 className="initPhrase">Phrase choisie : {phrase.d1.word} {phrase.d2.word} {phrase.d3.word} {phrase.d4.word} {phrase.d5.word} </h1>
                    </div>
                </div>
            </div>
            <Button form={"myForm"} className={"initbtn"} label={"Valider la phrase"}/>
        </div>
    </>);
}
