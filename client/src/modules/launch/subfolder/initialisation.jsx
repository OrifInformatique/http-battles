import React from "react";
import Button from "../../ui/button";
import '../../general.css';

function MyList({ handleChange, valeurs = [], i, tech, dynamicVal}) {
console.log("s")
console.log("c")
    switch (tech) {
        case "dynamicVal":
            console.log("dynamicVal")
            return(<>{/*
                <ul className="initUl" style={{ color: "black", backgroundColor: "white"}}>
                    {dynamicVal[i-1] && dynamicVal[i-1].map((value, index) => (
                    <li className="initLi" key={index} onClick={() => handleChange({ target: { name: `${i}.${tech}` } })}>
                        {value}
                    </li>
                    ))}
                </ul>*/}
            </>);
    
        default:
            console.log("default")
            return (<>
                <ul className="initUl" style={{ color: "black" }}>
                     {valeurs.map((valeur, index) => (
                        <li className="initLi" key={index} onClick={() => handleChange({ target: { name: `${tech}[${i}]`, value: valeur } })} style={{ cursor: "pointer" }}>
                            {valeur}
                        </li>
                    ))}
                </ul>
            </>);
    }
}

function InitialisationList({ handleChange, staticVal1, staticVal2, dynamicVal, i, phrase, tech}) {
    
    return (<>
        <ul className="initUl" style={{ color: "black", backgroundColor: "transparent"}}>
            {dynamicVal[i-1].map((value, index) => (
                <li className="initLi" key={index} onClick={() => handleChange({ target: { name: `${i}.${tech}` } })}>
                    {value}
                </li>
            ))}
        </ul>

    <div className="initPosition">
        <div className="initWord"style={{display:"flex",flexFlow:"column"}}>
            <h3>Mot {i}</h3>
            <MyList handleChange={handleChange} tech={"dynamicVal"} valeurs={dynamicVal} i={i}/> 
        </div>

        <div className="initRoute"style={{display:"flex",flexFlow:"column"}}>
            <h3>Route</h3>
            <MyList handleChange={handleChange} tech={"route"} valeurs={staticVal1} i={i}/> 
        </div>

        <div className="initMethod" style={{display:"flex",flexFlow:"column"}}>
        <h3>Methode</h3>
        <MyList handleChange={handleChange} tech={"method"} valeurs={staticVal2} i={i}/>
        <br/><br/><br/><br/>
        </div>
    </div>
    </>);
}

export default ({handleChange, dynamicVal, staticVal1, staticVal2, phrase, setIsSubmitted}) => {
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
            <img src="../../../../../public/images/element/left-arrow.png" alt="" />

            <div className="initPhrase">
                {phrase[0].word} {phrase[1].word} {phrase[2].word} {phrase[3].word} {phrase[4].word}
            </div>

            <form id="myForm" onSubmit={(e) => {e.preventDefault(), setIsSubmitted(2)}}>

                    {/*Liste*/}
                    <div className="initListLaunchContainer" >
                        <div className="initFirstListLaunchContainer"> 
                            
                            <div className="initInitialisationList1"> <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={1} phrase={phrase[1]}/> </div>
                            <div className="initInitialisationList2"> <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={2} phrase={phrase[2]}/> </div>
                            <div className="initInitialisationList3"> <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={3} phrase={phrase[3]}/> </div> 
                        </div>
                        <div className="initThirdListLaunchContainer">

                        <div className="initInitialisationList4"> <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={4} phrase={phrase[4]}/> </div>
                        <div className="initInitialisationList5"> <InitialisationList handleChange={handleChange} dynamicVal={dynamicVal} staticVal1={staticVal1} staticVal2={staticVal2} i={5} phrase={phrase[5]}/> </div>
                        
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
