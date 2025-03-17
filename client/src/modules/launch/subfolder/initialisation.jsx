import React, { useState } from "react";
import Button from "../../ui/button";
import '../../general.css';

function MyList({ handleChange, valeurs = [], i, tech}) {

    switch (tech) {
        case "dynamicVal":
            return(<>
                <ul className="initUl" style={{ color: "black"}}>
                    <div className="initLiContainer">
                        {valeurs[i-1] && valeurs[i-1].map((value, index) => (
                        <li className="initLi" key={index} onClick={() => handleChange({ target: { name: `${i}.${tech}` } })}>
                            {value}
                        </li>
                        ))}
                    </div>
                </ul>
            </>);
    
        default:
            return (<>
                <ul className="initUl" style={{ color: "black" }}>
                     <div className="initLiContainer">
                        {valeurs.map((valeur, index) => (
                            <li className="initLi" key={index} onClick={() => handleChange({ target: { name: `${tech}[${i}]`, value: valeur } })} style={{ cursor: "pointer" }}>
                                {valeur}
                            </li>
                        ))}
                    </div>
                </ul>
            </>);
    }
}

function InitialisationList({ handleChange, staticVal1, staticVal2, dynamicVal, i}) {

    return (<>   
                <div className="initWord"style={{display:"flex",flexFlow:"row" }}>
                    <h3>Mot {i}</h3>
                    <MyList handleChange={handleChange} tech={"dynamicVal"} valeurs={dynamicVal} i={i}/> 
                </div>
                
                <div className="initRoute" style={{display:"flex",flexFlow:"column"}}>
                    <h3>Route</h3>
                    <MyList handleChange={handleChange} tech={"route"} valeurs={staticVal1} i={i}/> 
                </div>

                <div className="initMethod" style={{display:"flex",flexFlow:"column"}}>
                    <h3>Methode</h3>
                    <MyList handleChange={handleChange} tech={"method"} valeurs={staticVal2} i={i}/>
                </div>
        
    </>);
}

export default ({handleChange, dynamicVal, staticVal1, staticVal2, phrase, setIsSubmitted}) => {
const [position, setPosition] = useState(1)
const totalSlides = 5;
let positionSet = "position-";
let arrowd = null;
let positiond = positionSet + position ;

//   Enlever la flèche lorsque on est sur le 1er ou dernier élément.
    function handleChangeArrowLeft() {
        if (position > 1) { 
            setPosition(position- 1)
        }
    }

    function handleChangeArrowRight() {
        if ( position < totalSlides) {
            setPosition(position + 1)
        }
    }

switch ( position ){
    case 1:
     
    arrowd = (<> <img className="initRightArrow" id="arrowRight" src="/assets/images/element/CC0/right-arrow.png" alt="Right arrow" onClick={() => handleChangeArrowRight() }/></>);
    break;

    case 5:
    arrowd = (<><img className="initLeftArrow" id="arrowLeft" src="/assets/images/element/CC0/left-arrow.png" alt="Left arrow" onClick={() => handleChangeArrowLeft() }/></>)
    break;

    default:
    arrowd = (<><img className="initLeftArrow" id="arrowLeft" src="/assets/images/element/CC0/left-arrow.png" alt="Left arrow" onClick={() => handleChangeArrowLeft() }/> <img className="initRightArrow" id="arrowRight" src="/assets/images/element/CC0/right-arrow.png" alt="Right arrow" onClick={() => handleChangeArrowRight() }></img></>)
    

}

    return(<> 
  
        <div className="initInitialisationContainer">
            <h1 className="initTitle"style={{fontWeight:'bold', display:"flex",flexFlow:"column",alignItems:"center",paddingBottom:"0px"}}> Initialisation de la phrase </h1>
            <div className="initPhraseLaunchContainer">
                <div className="initElementContainer">
                    <div className="initFixPhrase">
                        <h1 className="initChoosenPhrase">Phrase choisie : </h1>
                    </div>
                </div>
            </div>
                
            <div className="initPhrase">
                <div className={position === 1 ?"init5Word wordPosition-0" :"init5Word position-0 a"} id="position">
                {phrase[0].word} 
               {/* <p className="p">_</p>*/}
                <img src="assets/images/element/sword_1.png"/>
                </div>

                <div className={position === 2 ?"init5Word wordPosition-1" :"init5Word position-1 a"} id="position">
                {phrase[1].word} 
               {/* <p className="p">_</p>*/}
               <img src="assets/images/element/sword_1.png"/>
               </div>

                <div className={position === 3 ?"init5Word wordPosition-2" :"init5Word position-2 a"} id="position">
                {phrase[2].word} 
               {/* <p className="p">_</p>*/}
               <img src="assets/images/element/sword_1.png"/>
               </div>
                
                <div className={position === 4 ?"init5Word wordPosition-3" :"init5Word position-3 a"} id="position">
                {phrase[3].word}  
               {/* <p className="p">_</p>*/}
               <img src="assets/images/element/sword_1.png"/>

               </div>

                <div className={position === 5 ?"init5Word wordPosition-4" :"init5Word position-4 a"} id="position">      
                {phrase[4].word} 
               {/* <p className="p">_</p>*/}
               <img src="assets/images/element/sword_1.png"/>

               </div>
            </div>

            {arrowd}

            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>

                <div className="initContainerVisible"> 
                    <div className={ "initContainerContent position-" + position} id="slider">
                        <div className="initContainerContent1 initContainerContentX">
                            <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1} phrase={phrase[1]}/> 
                        </div >    
                        <div className="initContainerContent2 initContainerContentX">          
                            <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2} phrase={phrase[1]}/> 
                        </div>                         
                        <div className="initContainerContent3 initContainerContentX">          
                            <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3} phrase={phrase[1]}/> 
                        </div>  
                        <div className="initContainerContent4 initContainerContentX">          
                            <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4} phrase={phrase[1]}/> 
                        </div>
                        <div className="initContainerContent5 initContainerContentX">          
                            <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5} phrase={phrase[1]}/> 
                        </div>                 
                    </div>
                </div> 
            </form>
            {/* <div className="initFirstListLaunchContainer"> 
                    <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1} phrase={phrase[1]}/>
                    <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2} phrase={phrase[2]}/>
                    <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3} phrase={phrase[3]}/>
                    
                </div>

                <div className="initThirdListLaunchContainer">
                    <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4} phrase={phrase[4]}/>
                    <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5} phrase={phrase[5]}/>
                </div>  */}

            <div className="initButtonContainer">
                <div className="buttons">
                    <img src="assets/images/element/CC0/dice.png" alt="Dés pour tirer aléatoirement" />
                    <h1>Aléatoire</h1>
                </div>
                <Button form={"myForm"} className={"initbtn"} label={"Valider la phrase"}/>
            </div>
        </div>
    </>);
}
