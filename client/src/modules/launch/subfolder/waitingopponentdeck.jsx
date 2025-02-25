import React from "react";


const WaitingOpponentDeck = ({phrase}) => {
    return(<>
    {/*
    <div className="waitTitle">
        <h1>Partie # numéro de la partie  - Initialisation de la phrase</h1>
    </div>*/}
    
    <div className="waitContainer">
        <h2>Votre phrase est prête</h2>

        <div className="waitPhrase">
            <p>{phrase.d1.word} {phrase.d2.word} {phrase.d3.word} {phrase.d4.word} {phrase.d5.word} </p>
        </div>

        <button type="submit" >Ce n'est pas votre tour</button>
        <p style={{fontWeight:"bold"}}>La phrase de votre adversaire</p>
        <p>__ __ __ __ __</p>
        <div style={{borderBottom:"2px solid grey",height:"50px",width:"100%"}}></div>
        <h1>En attente de [username]
            <p>La partie pourra démarrer dès que [username] a renseigné la phrase</p>
        </h1>
    </div>
    </>)
}

export default WaitingOpponentDeck