import React from 'react'
import { Outlet } from "react-router-dom";

const InGameLayout = () => {
    return (<>
        <div>
            <Outlet />
        </div>
    </>);
}

export default InGameLayout