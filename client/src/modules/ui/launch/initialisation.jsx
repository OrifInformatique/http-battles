import React from "react";
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

export default PhraseLaunch