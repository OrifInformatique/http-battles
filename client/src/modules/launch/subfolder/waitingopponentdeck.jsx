import React from "react";


const WaitingOpponentDeck = ({phrase}) => {
    return(<>
    {/*
    <div className="waitTitle">
        <h1>Partie # numéro de la partie  - Initialisation de la phrase</h1>
    </div>*/}
    <h1>Hello</h1>
<img className="redGrid" alt="Grille Rouge" src="../assets/images/element/CC0/fight_grid/Grille_de_combat.png"/>
<img className="blueGrid" alt="Grille Bleue" src="../assets/images/element/CC0/fight_grid/player_grid.png"/>

    <div className="waitContainer">


        {/* 
        <h2>Votre phrase est prête</h2>

        <div className="waitPhrase">
            <p>{phrase[0].phrase[0].word.content} {phrase[0].phrase[1].word.content} {phrase[0].phrase[2].word.content} {phrase[0].phrase[3].word.content} {phrase[0].phrase[4].word.content} </p>
        </div>

        <button type="submit"> Ce n'est pas votre tour </button>
        <p style={{fontWeight:"bold"}}>La phrase de votre adversaire</p>
        <p>__ __ __ __ __</p>
        <div style={{borderBottom:"2px solid grey",height:"50px",width:"100%"}}></div>
        <h1>En attente de [username]
            <p>La partie pourra démarrer dès que [username] a renseigné la phrase</p>
        </h1>

        */}
    </div>
    </>)
}

export default WaitingOpponentDeck