import React, { useState } from "react";

function WordUnderscored({phrase, i}) {
    return(<>
        <div style={{ display:"flex", flexFlow:"column", alignItems:"center", bottom:"20px" }}>
            <h2>{phrase[0].phrase[i].word.content}</h2>
            <p style={{position:"relative", fontSize:"100px", height:"20px", bottom:"110px"}}>_</p>
        </div>
    </>)
}


const WaitingOpponentDeck = ({phrase}) => {
    //exemples de messages avec leur useState
    let turnA = "À votre tour";
    let turnB = "Au tour de l'adversaire";
    const [turnStatus, setTurnStatus] = useState(turnB)

    let actA = "Vous avez loupé votre adversaire"
    let actB = "Vous avez touché votre adversaire"
    let actC = "Vous avez gagné"
    const [action, setAction] = useState(actA)

    return(<>
    <div className="gridContainer" style={{width:"1568px", position:"relative",height:"1000px", display:"flex", flexFlow:"column nowrap", alignItems:"center"}}> 
        
        <div className="ironPlankContainer">
            <img className="ironPlank" src="../assets/images/element/CC0/waitingopponentdeck/element/iron_plank.png"/>
            <p className="ironPlankText" style={{fontSize:"45px"}}> {turnStatus} </p> 
        </div>
        <img className="settings" alt="" src="../assets/images/element/CC0/waitingopponentdeck/element/settings-icon.png"/>

        <div className="redblueGridContainer">
            <img className="redGrid" alt="Grille Rouge" src="../assets/images/element/CC0/waitingopponentdeck/fight_grid/opponent_grid_red.png"/>
            <img className="blueGrid" alt="Grille Bleue" src="../assets/images/element/CC0/waitingopponentdeck/fight_grid/player_grid.png"/>
        </div>

        <div className="wordFound">
           <WordUnderscored phrase={phrase} i={0}/>
           <WordUnderscored phrase={phrase} i={1}/>
           <WordUnderscored phrase={phrase} i={2}/>
           <WordUnderscored phrase={phrase} i={3}/>
           <WordUnderscored phrase={phrase} i={4}/>
        </div>

        <div className="woodContainer">
            <img className="woodLayout" alt="Layout du bas couleur bois, emplacement du host" src="../../../assets/images/element/CC0/waitingopponentdeck/layouts/wood_layout.png"/>
            <h1 className="username">Hello</h1>
            <div style={{position:"relative", display:"flex", flexFlow:"column wrap"}}>
                <p className="woodLayoutText"> {action} </p>
                <img className="imgExplosion"src="../assets/images/element/CC0/waitingopponentdeck/element/explosion.png"/>
            </div>
        </div>

    </div>

    </>)
}

export default WaitingOpponentDeck