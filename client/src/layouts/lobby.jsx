import React from 'react'
import { Outlet } from "react-router-dom";

const LobbyLayout = () => {
    return (<>
        <div>
            <Outlet />
        </div>
    </>);
}

export default LobbyLayout