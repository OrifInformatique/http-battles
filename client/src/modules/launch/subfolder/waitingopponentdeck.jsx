import React from "react";


const WaitingOpponentDeck = ({phrase}) => {
    return(<>
    {/*
    <div className="waitTitle">
        <h1>Partie # numéro de la partie  - Initialisation de la phrase</h1>
    </div>*/}
    <div className="gridContainer" style={{width:"1568px", position:"relative",height:"1000px", display:"flex", flexFlow:"column nowrap"}}> 
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center",width:"100%"}}/*className="settingsContainer"*/>
            <p style={{fontSize:"30px"}}>À votre tour</p> 
        </div>
        <img className="settings" alt="" src="../assets/images/element/CC0/waitingopponentdeck/element/settings-icon.png" />

        <div className="redblueGridContainer">
            <img className="redGrid" alt="Grille Rouge" src="../assets/images/element/CC0/waitingopponentdeck/fight_grid/opponent_grid_red.png"/>
            <img className="blueGrid" alt="Grille Bleue" src="../assets/images/element/CC0/waitingopponentdeck/fight_grid/player_grid.png"/>
        </div>

        <div className="woodContainer">
        <img className="woodLayout" alt="Layout du bas couleur bois, emplacement du host" src="../assets/images/element/CC0/waitingopponentdeck/layouts/wood_layout.png" />
            <div>
                <p className="wood" style={{position:"absolute", paddingLeft:"30%",zIndex:"11"}}>Helloasdsa</p>
            </div>
        </div>
    </div>
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
    </>)
}

export default WaitingOpponentDeck