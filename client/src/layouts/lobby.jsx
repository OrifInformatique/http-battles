import React from 'react'
import { Outlet, Link } from "react-router-dom";

const LobbyLayout = () => {
    return (<>
        <div>            
            <Outlet />
        </div>
    </>);
}

export default LobbyLayout