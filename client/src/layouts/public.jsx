// Librairies externes
import React from 'react'
import { Outlet } from "react-router-dom";

// Utilitaires
import { PublicRoute } from '../utils/public-route';

// Composant principal
const PublicLayout = () => {
    return (<PublicRoute>
        <div>
            <Outlet />
        </div>
    </PublicRoute>);
}

export default PublicLayout
