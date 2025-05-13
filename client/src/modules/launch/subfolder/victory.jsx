import React,{useState} from 'react';
import Button from "../../ui/button";

function Word({phrase}) {
    /*
        Récolter les mots sur l'API
    */
   return(<>
        <p style={{position:"relative", fontSize:"30px", height:"20px", }}> * </p>
   </>)
}

function Victory({phrase}) {

    const [victory, setDefaite] = useState(true)
        

    return(<>
        {
            victory ? <h1 className="congratulationsPhrase">Félicitations vous avez gagné ! </h1> 
            : <h1 className="congratulationsPhrase">Malheuresement vous avez perdu !</h1>
        }

        <div className="wordEndContainer" /*style={{display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"stretch"}}*/>
            <div style={{ display:"flex", flexFlow:"column", alignItems:"center"}} >
                <h2> Votre phrase choisie </h2>
                <div style={{ display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"space-between", width:"190px" }}>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                </div>  
            </div>

           
            <div style={{ display:"flex", flexFlow:"column", alignItems:"center"}} >
                <h2> La phrase de votre adversaire </h2>
                <div style={{ display:"flex", flexFlow:"row", alignItems:"center", justifyContent:"space-between", width:"190px"}}>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                    <Word phrase={phrase}/>
                </div>
            </div>
        </div>

        <div style={{ display:"flex", flexFlow:"column", alignItems:"center", gap:"20px", paddingTop:"500px"}}>
            <h1>
                Nouvelle partie contre [username]
            </h1>
            <Button className={"initbtn"} label={"Valider la phrase"}/>
        </div>
    </>)
}

export default Victory