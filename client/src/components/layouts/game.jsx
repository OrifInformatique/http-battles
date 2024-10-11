import React from 'react'
import { Outlet } from "react-router-dom";
import { ProtectedRoute } from './protected-route';

const GameLayout = () => {
    return (<>
        <ProtectedRoute>
            <div className="flex w-full h-full absolute justify-center items-center z-20">
                <Outlet />
            </div>
        </ProtectedRoute>
    </>
    );
}

export default GameLayout
