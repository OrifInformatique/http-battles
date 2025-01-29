import React, { useEffect, useState } from "react";
import '../general.css';


function LoopForList({ handleChange ,staticVal1, staticVal2, dynamicVal, i}) {

    function MyList({ handleChange, valeurs = [], i, tech}) {
        return (
            <select name={`d${i}.${tech}`} onChange={handleChange} style={{ color: "black" }}>
                {valeurs.map((valeur, index) => (
                    <option key={index}>{valeur}</option>
                ))}
            </select>
        );
    }
    
    function WordList({ handleChange, staticVal1, staticVal2, dynamicVal, i}) {
    
        return (
            <>
                <select onChange={handleChange} name={`d${i}.word`} style={{ color: "black"}}>
                    {dynamicVal[i-1] && dynamicVal[i-1].map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <h3>Route</h3>
                <MyList handleChange={handleChange} tech={"route"} valeurs={staticVal1} i={i}/>
                <h3>Methode</h3>
                <MyList handleChange={handleChange} tech={"method"} valeurs={staticVal2} i={i}/>
                <br/><br/><br/><br/>
            </>
        );
    }

    return(<>
    <h2>Mot {i} </h2>
        <WordList handleChange={handleChange} staticVal1={staticVal1} staticVal2={staticVal2} dynamicVal={dynamicVal} i={i} />
    </>)
}

export default LoopForList