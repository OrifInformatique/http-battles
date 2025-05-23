import React, { useState } from "react";
import Victory from "../subfolder/victory.jsx"

function WordUnderscored({phrase, i}) {
    console.log(i)
    console.log(phrase[2])

    return(<>
        <div style={{ display:"flex", flexFlow:"column", alignItems:"center", bottom:"20px" }}>
            <h2> {phrase[2][i].word.content} </h2>
            <p style={{position:"relative", fontSize:"100px", height:"20px", bottom:"110px"}}>__</p>
        </div>
    </>)
}

function Grid({phrase, turnStatus, action}) {
        return(<>
        <div className="gridContainer" style={{width:"1568px", position:"relative",height:"1000px", display:"flex", flexFlow:"column nowrap", alignItems:"center"}}> 
            <div style={{position:"absolute", display:"flex", flexFlow:"column nowrap", zIndex:"2", left:"24.6%", top:"16.8%"}}>
                <div className="gGrid" style={{display:"flex", flexFlow:"row nowrap", }}>
                    <div className="grid alpha get"><h1>i</h1></div>
                    <div className="grid beta get"><h1>i</h1></div>
                    <div className="grid delta get"><h1>i</h1></div>
                    <div className="grid gamma get"><h1>i</h1></div>
                </div>
                <div className="gGrid" style={{display:"flex", flexFlow:"row nowrap",}}>
                    <div className="grid alpha post"><h1>i</h1></div>
                    <div className="grid beta post"><h1>i</h1></div>
                    <div className="grid delta post"><h1>i</h1></div>
                    <div className="grid gamma post"><h1>i</h1></div>

                </div>
                <div className="gGrid" style={{display:"flex", flexFlow:"row nowrap", }}>
                    <div className="grid alpha put" ><h1>i</h1></div>
                    <div className="grid beta put"><h1>i</h1></div>
                    <div className="grid delta put"><h1>i</h1></div>
                    <div className="grid gamma put"><h1>i</h1></div>

                </div>
                <div className="gGrid" style={{display:"flex", flexFlow:"row nowrap", }}>
                    <div className="grid alpha delete" ><h1>i</h1></div>
                    <div className="grid beta delete"><h1>i</h1></div>
                    <div className="grid delta delete"><h1>i</h1></div>
                    <div className="grid gamma delete"><h1>i</h1></div>
                </div>
            </div>
            <div style={{position:"absolute", display:"flex", flexFlow:"column nowrap", zIndex:"2", left:"54.7%", top:"17.9%"}}>
                <div className="gGridOpp" style={{display:"flex", flexFlow:"row nowrap", }}>
                    <div className="gridOpp alpha get"><h1>i</h1></div>
                    <div className="gridOpp beta get"><h1>i</h1></div>
                    <div className="gridOpp delta get"><h1>i</h1></div>
                    <div className="gridOpp gamma get"><h1>i</h1></div>
                </div>
                <div className="gGridOpp" style={{display:"flex", flexFlow:"row nowrap",}}>
                    <div className="gridOpp alpha post"><h1>i</h1></div>
                    <div className="gridOpp beta post"><h1>i</h1></div>
                    <div className="gridOpp delta post"><h1>i</h1></div>
                    <div className="gridOpp gamma post"><h1>i</h1></div>

                </div>
                <div className="gGridOpp" style={{display:"flex", flexFlow:"row nowrap", }}>
                    <div className="gridOpp alpha put" ><h1>i</h1></div>
                    <div className="gridOpp beta put"><h1>i</h1></div>
                    <div className="gridOpp delta put"><h1>i</h1></div>
                    <div className="gridOpp gamma put"><h1>i</h1></div>

                </div>
                <div className="gGridOpp" style={{display:"flex", flexFlow:"row nowrap", }}>
                    <div className="gridOpp alpha delete" ><h1>i</h1></div>
                    <div className="gridOpp beta delete"><h1>i</h1></div>
                    <div className="gridOpp delta delete"><h1>i</h1></div>
                    <div className="gridOpp gamma delete"><h1>i</h1></div>
                </div>
            </div>

            <div className="ironPlankContainer">
                <img className="ironPlank" src="../assets/images/element/CC0/waitingopponentdeck/element/iron_plank.png"/>
                <p className="ironPlankText" style={{fontSize:"45px"}}> {turnStatus} </p> 
            </div>
            <img className="settings" alt="" src="../assets/images/element/CC0/waitingopponentdeck/element/settings-icon.png"/>

            <div className="redblueGridContainer">
                <img className="redGrid" alt="Grille Rouge" src="../assets/images/element/CC0/waitingopponentdeck/fight_grid/opponent_grid.png"/>
                <img className="blueGrid" alt="Grille Bleue" src="../assets/images/element/CC0/waitingopponentdeck/fight_grid/player_grid.png"/>
            </div>

            <div className="wordFound">
                <img style={{position:"absolute", width:"150px", left:"-55px", top:"-55px"}} src="../assets/images/element/CC0/waitingopponentdeck/element/1st_leave.png"/>
                    <WordUnderscored phrase={phrase} i={0}/>
                    <WordUnderscored phrase={phrase} i={1}/>
                    <WordUnderscored phrase={phrase} i={2}/>
                    <WordUnderscored phrase={phrase} i={3}/>
                    <WordUnderscored phrase={phrase} i={4}/>
                <img style={{position:"absolute", width:"18%", left:"620px", top:"20px"}} src="../assets/images/element/CC0/waitingopponentdeck/element/2nd_leaves.png"/>
            </div>

            <div className="woodContainer">
                <img className="woodLayout" alt="Layout du bas couleur bois, emplacement du host" src="../../../assets/images/element/CC0/waitingopponentdeck/layouts/wood_layout.png"/>
                <div style={{position:"relative", display:"flex", flexFlow:"row wrap", justifyContent:"center", alignItems:"center", position:"absolute", width:"90%", bottom:"15px", gap:"40px"}}>
                    <p className="woodLayoutText"> {action} </p>
                    <img className="imgExplosion" src="../assets/images/element/CC0/waitingopponentdeck/element/explosion.png"/>
                    <img className="" src=""/>
                </div>
            </div>

        </div>
    </>)
}

const WaitingOpponentDeck = ({phrase, i}) => {

    //exemples de messages avec leur useState

    let turnA = "À votre tour";
    let turnB = "Au tour de l'adversaire";
    const [turnStatus, setTurnStatus] = useState(turnB)

    let actA = "Vous avez loupé votre adversaire";
    let actB = "Vous avez touché votre adversaire";
    let actC = "Vous avez gagné";
    const [action, setAction] = useState(actA)

    const [end, setEnd] = useState(false)
    const [victory, setVictory] = useState(false)

    // Si fin de partie, afficher page de victoire sinon laisser Grid

    return(<>
        { end  ?
        <>
            <Victory victory={victory} />
            <Grid phrase={phrase} i={i} turnStatus={turnStatus} action={action}/>
        </>
        :
            <Grid phrase={phrase} i={i} turnStatus={turnStatus} action={action}/>
        }
    </>)
}

export default WaitingOpponentDeck