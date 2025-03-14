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
let positiond = null;
console.log(positionSet+position)
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
     
    arrowd = (<> <img className="initRightArrow" id="arrowRight" src="/assets/images/element/freeright/right-arrow.png" alt="Right arrow" onClick={() => handleChangeArrowRight() }/></>);
    break;

    case 5:
    arrowd = (<><img className="initLeftArrow" id="arrowLeft" src="/assets/images/element/freeright/left-arrow.png" alt="Left arrow" onClick={() => handleChangeArrowLeft() }/></>)
    break;

    default:
    arrowd = (<><img className="initLeftArrow" id="arrowLeft" src="/assets/images/element/freeright/left-arrow.png" alt="Left arrow" onClick={() => handleChangeArrowLeft() }/> <img className="initRightArrow" id="arrowRight" src="/assets/images/element/freeright/right-arrow.png" alt="Right arrow" onClick={() => handleChangeArrowRight() }></img></>)
    

}

switch ( position ) {
    case 1: 
        
    break;
    case 2: 
    break;
    case 3: 
    break;
    case 4: 
    break;
    case 5: 
    break;
    
}



/*
if (position === 1)
{
    document.getElementById(positionSet+position).classList.add("active")
}
*/
    return(<> 
  
        <div className="initInitialisationContainer">
            <h1 className="initTitle"style={{fontWeight:'bold', display:"flex",flexFlow:"column",alignItems:"center"}}> Initialisation de la phrase </h1>
            <div className="initPhraseLaunchContainer">
                <div className="initElementContainer">
                    <div className="initFixPhrase">
                        <h1 className="">Phrase choisie : </h1>
                    </div>
                </div>
            </div>
                
            <div className="initPhrase">
                <div className="init5Word " id="position-0">
                {phrase[0].word} 
               {/* <img className="p" src="/assets/images/element/sword_1.png" alt="sword" style={{position:"absolute",width:"200px",height:"30px"}}/>*/}
                <p className="p">_</p>
                </div>

                <div className="init5Word position-1">
                {phrase[1].word} 
                <p className="p">_</p>
                </div>

                <div className="init5Word position-2">
                {phrase[2].word} 
                <p className="p">_</p>
                </div>

                <div className="init5Word position-3">
                {phrase[3].word}  
                <p className="p">_</p>
                </div>

                <div className="init5Word position-4">      
                {phrase[4].word} 
                <p className="p">_</p>
                </div>
            </div>

            {arrowd}

            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>

                <div className="initContainerVisible"> 
                    <div className={"initContainerContent position-" + position} id="slider">
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
      
                <Button form={"myForm"} className={"initbtn"} label={"Valider la phrase"}/>
            </div>
        </div>
    </>);
}
