import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './launchpage.css'
import '../general.css';

function MyList({valeurs}) {
    return (<>
        <select style={{color:"black"}}>
        {valeurs.map((value, index) =>(
            <option key={index}>
                {value}
            </option>
        ))}
        </select>
    </>)
}

function WordList({staticVal1, staticVal2, dynamicVal, selectedIndex = 0 }) {
    let i = 0;

    return (<>
            <select>
                {dynamicVal[selectedIndex]?.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <MyList valeurs={staticVal1}/>
            <MyList valeurs={staticVal2}/>

        {/*dynamicVal[i].map((value, index) =>    (
            <div key={index}>
                {value}
            </div>
        ))*/}
    </>)
}


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
        d1: {
            firstword: [""],
            firstroute: [""],
            firstmethod: [""],
        },
        d2: {
            secondword: [""],
            secondroute: [""],
            secondmethod: [""],
        },
        d3: {
            thirddword: [""],
            thirdroute: [""],
            thirdsmethod: [""],
        },
        d4: {
            fourthword: [""],
            fourthroute: [""],
            fourthsmethod: [""],
        },
        d5: {
            fifthword: [""],
            fifthroute: [""],
            fifthmethod: [""],
        }
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const timer = setTimeout(() => {
            navigate(''); // Rediriger automatiquement après 3 secondes  
        }, 3000);

        console.log("Redirection effectuée");

        return () => clearTimeout(timer);
    };
/*
    const handleChange = (e) => {
        const { name, value } = e.target
        const [dimension, key] = name.split('.');

        setPhrase((prevPhrase) => ({
            ...prevPhrase,
            [dimension]: {
                ...prevPhrase[dimension],
                [key]: [value],
            }
        }));
    };
*/
    console.log("Array :", phrase)
    return (
        <>  <div className="testContainer">
            <h2>Partie #{/*numéro de la partie */} - Création du deck</h2>

            <form onSubmit={handleSubmit}>
                <h1>Partie {/*numéro de la partie */} - Initialisation de la phrase </h1>
                <h2>WordList</h2>

                <WordList dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} selectedIndex={0}/>
                <h2>MyList</h2>
                <MyList valeurs={valeurs} />
                
            {/*
        <MyList onChange={handleChange} valeurs={["Le","La","Un","Une","Mon"]}/>
        <br/>
        <MyList valeurs={staticVal1}/>
        <MyList valeurs={staticVal2}/>
        <br/><br/>

        <MyList valeurs={["chat","chien","enfant","oiseau","voisin"]}/>
        <br/>
        <MyList valeurs={staticVal1}/>
        <MyList valeurs={staticVal2}/>
        <br/><br/>

        <MyList valeurs={["mange","regarde","porte","attrape","entend"]}/>
        <br/>
        <MyList valeurs={staticVal1}/>
        <MyList valeurs={staticVal2}/>
        <br/><br/>

        <MyList valeurs={["Le","La","Un","Une","Mon"]}/>
        <br/>
        <MyList valeurs={staticVal1}/>
        <MyList valeurs={staticVal2}/>
        <br/><br/>

        <MyList valeurs={["croquette","ballon","livre","gâteau","arbre"]}/>
        <br/>
        <MyList valeurs={staticVal1}/>
        <MyList valeurs={staticVal2}/>

           {/*                                      
                <h2>Mot 1</h2>
                <select >
                    <option onChange={handleChange} value="Le" >Le</option>
                    
                </select>
                
                <h3>Route</h3>
                <select style={{color:"black"}}>
                    <option value="alpha" >/alpha</option>
                    <option value="beta" >/beta</option>
                    <option value="gamma" >/gamma</option>
                    <option value="delta" >/delta</option>
                </select>
                
                <h3>Méthode</h3>
                <select style={{color:"black"}}>
                    <option value="" >GET</option>
                    <option value="" >POST</option>
                    <option value="" >PUT</option>
                    <option value="" >DELETE</option>
                </select>
                                        
                <h2>Mot 1</h2>
                <select style={{color:"black"}}>
                    <option value="" >Le</option>
                    <option value="" >La</option>
                    <option value="" >Des</option>
                    <option value="" >Les</option>
                </select>
              
                <h3>Route</h3>
                <select style={{color:"black"}}>
                    <option value="" >/alpha</option>
                    <option value="" >/beta</option>
                    <option value="" >/gamma</option>
                    <option value="" >/delta</option>
                </select>
                
                <h3>Méthode</h3>
                <select style={{color:"black"}}>
                    <option value="" >GET</option>
                    <option value="" >POST</option>
                    <option value="" >PUT</option>
                    <option value="" >DELETE</option>
                </select>
                                             */}  

            </form>
            </div>
        </>
    ); 
}

export default LaunchPage