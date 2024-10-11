import React from "react";

import { Link, useParams } from "react-router-dom";

const GamesLaunch = () =>{

    let { gameId } = useParams();

    return <div className="text-center">
        <h1>Interface de la <span className="font-bold">partie {gameId}</span></h1>
        <Link className="underline text-blue-500" to="/lobby">Retour à la liste des parties</Link>
    </div>;
}

export default GamesLaunch
