import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../general.css';

import Button from "../../ui/button";
import Random from "../../ui/random";

import {dynamicVal, staticVal1, staticVal2} from "../form.jsx"

function Mylistitem({i, value, setPhrase, phrase, tech}) {

    const handleChange = (e) => {
            const newPhrase = [...phrase]

            switch (tech) {
                case "dynamicVal":
                    newPhrase[2][i-1].word.content = value
                break;

                case "route":
                   newPhrase[2][i-1].word.position[0] = value
                break;

                default:
                    newPhrase[2][i-1].word.position[1] = value
                break;
            }

            setPhrase(newPhrase)
    };

    return  (<>
        <li className="initLi" onClick={handleChange} style={{ cursor: "pointer" }}>
            {value}
        </li>
    </>)
}

function MyList({ phrase, setPhrase, valeurs = [], i, tech}) {
    switch (tech) {
        case "dynamicVal":
            return(<>
                <ul className="initUl" style={{ color: "black"}}>
                    <div className="initLiContainer">
                        {valeurs[i-1] && valeurs[i-1].map((value, index) => (
                            <Mylistitem key={index} tech={tech} i={i} value={value} setPhrase={setPhrase} phrase={phrase} />
                        ))}
                    </div>
                </ul>
            </>);
    
        default:
            return (<>
                <ul className="initUl" style={{ color: "black" }}>
                     <div className="initLiContainer">
                        {valeurs.map((value, index) => (
                            <Mylistitem key={index} tech={tech} i={i} value={value} setPhrase={setPhrase} phrase={phrase} />
                        ))}
                    </div>
                </ul>
            </>);
        }
}

function InitialisationList({ phrase, setPhrase, i}) {

    return (<>   
        <div className="initWord"style={{display:"flex",flexFlow:"row" }}> 
            <h3>Mot {i} </h3> 
            <MyList phrase={phrase} setPhrase={setPhrase} tech={"dynamicVal"} valeurs={dynamicVal} i={i}/> 
        </div>
        
        <div className="initRoute" style={{display:"flex",flexFlow:"column"}}>
            <h3>Route</h3>
            <MyList phrase={phrase} setPhrase={setPhrase} tech={"route"} valeurs={staticVal1} i={i}/> 
        </div>

        <div className="initMethod" style={{display:"flex",flexFlow:"column"}}>
            <h3>Methode</h3>
            <MyList phrase={phrase} setPhrase={setPhrase} tech={"method"} valeurs={staticVal2} i={i}/>
        </div>
            </>);
    }

function ElementSlider({position , i , phrase}) {
    return(<>
        <div className={position === i ? `init5Word wordPosition-${i}` :`init5Word position-${i} a`} id="position">
            {phrase[2][i-1].word.content} 
            <img src="assets/images/element/sword_1.png" alt="sword" />
        </div>
    </>)
}

function Slider({setPhrase, phrase, position}) {

    return(<>
        <div className="initContainerVisible"> 
            <div className={ "initContainerContent position-" + position} id="slider">
                <div className="initContainerContent1 initContainerContentX">
                    <InitialisationList phrase={phrase} setPhrase={setPhrase} i={1} /*phrase={phrase[0]}*/ /> 
                </div >    
                <div className="initContainerContent2 initContainerContentX">          
                    <InitialisationList phrase={phrase} setPhrase={setPhrase} i={2} /> 
                </div>                         
                <div className="initContainerContent3 initContainerContentX">          
                    <InitialisationList phrase={phrase} setPhrase={setPhrase} i={3} /> 
                </div>  
                <div className="initContainerContent4 initContainerContentX">          
                    <InitialisationList phrase={phrase} setPhrase={setPhrase} i={4} /> 
                </div>
                <div className="initContainerContent5 initContainerContentX">          
                    <InitialisationList phrase={phrase} setPhrase={setPhrase} i={5} /> 
                </div>                 
            </div>
        </div> 
    </>)
}



export default ({setPhrase, phrase, setIsSubmitted}) => {
//  Flèches
const [position, setPosition] = useState(1)
const TOTAL_SLIDES = 5;
let arrowd = null;
let i = null;

//   Enlever la flèche lorsque on est sur le 1er ou dernier élément.
    function handleChangeArrowLeft() {
        if (position > 1) { 
            setPosition(position- 1)
        }
    }

    function handleChangeArrowRight() {
        if ( position < TOTAL_SLIDES) {
            setPosition(position + 1)
        }
    }
//  Flèches
    switch ( position ){
        case 1:
            arrowd = (<> <img className="initRightArrow" id="arrowRight" src="/assets/images/element/CC0/initialisation/right-arrow.png" alt="Right arrow" onClick={() => handleChangeArrowRight() }/></>);
        break;

        case 5:
            arrowd = (<><img className="initLeftArrow" id="arrowLeft" src="/assets/images/element/CC0/initialisation/left-arrow.png" alt="Left arrow" onClick={() => handleChangeArrowLeft() }/></>);
        break;

        default:
            arrowd = (<><img className="initLeftArrow" id="arrowLeft" src="/assets/images/element/CC0/initialisation/left-arrow.png" alt="Left arrow" onClick={() => handleChangeArrowLeft() }/> <img className="initRightArrow" id="arrowRight" src="/assets/images/element/CC0/initialisation/right-arrow.png" alt="Right arrow" onClick={() => handleChangeArrowRight() }></img></>);
        break;

    }
    const [hostUsername, setHostUsername] = useState('');

    const opponentUsername = "Jasy";

    useEffect(() => {
        axios.post("http://localhost:4000/api/user/findusers", {
        })
        .then(res=> {
        //    console.log("succes res", res)
          

        })
        .catch(resC => {
        //    console.log("echec res", resC)
        })
    }, []);

    return(<> 
        <div className="initInitialisationContainer">

            <p className="initLayoutText1 initLayoutText">Hébergeur</p>
            <img className="initLayout1" src="assets/images/element/CC0/layouts/blue_layout.png" alt="sword" />
            <p className="hostText"> {hostUsername} </p>

            <p className="initLayoutText2 initLayoutText">Adversaire</p>
            <img className="initLayout2" src="assets/images/element/CC0/layouts/red_layout.png" alt="sword" />
            <p className="opponentText"> {opponentUsername} </p>

            <h1 className="initTitle"style={{fontWeight:'bold', fontSize:"50px", display:"flex",flexFlow:"column",alignItems:"center",paddingBottom:"0px"}}> Initialisation de la phrase </h1>
            <div className="initPhraseLaunchContainer">
                <div className="initElementContainer">
                    <div className="initFixPhrase">
                        <h1 className="initChoosenPhrase">Phrase selectionnée : </h1>
                    </div>
                </div>
            </div>
                
            <div className="initPhrase">
                <ElementSlider i={1} position={position} phrase={phrase}/>
                <ElementSlider i={2} position={position} phrase={phrase}/>
                <ElementSlider i={3} position={position} phrase={phrase}/>
                <ElementSlider i={4} position={position} phrase={phrase}/>
                <ElementSlider i={5} position={position} phrase={phrase}/>
            </div>
             
            {arrowd}

            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>
                <Slider position={position} setPhrase={setPhrase} phrase={phrase}/>
            </form>

            <div className="initButtonContainer">
                <div className="buttons">
                    <img src="assets/images/element/CC0/initialisation/dice.png" alt="Dés pour tirer aléatoirement" />
                    <Random className={"randombtn"} label={"Aléatoire"}/>
                </div>
                <Button form={"myForm"} className={"initbtn"} label={"Valider la phrase"}/>
            </div>
        </div>
    </>);
}
