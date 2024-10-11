import React from 'react'
import { Outlet } from "react-router-dom";

import { Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ProtectedRoute } from './protected-route';
import { useAuth } from '../../hooks/useAuth';

export const TopBar = () => {

    const { user } = useAuth();
    console.log(user);
    return (<>
        <div className='bg-white border-b border-gray-200'>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-8 justify-end items-center">
                <p className="text-gray-400 text-sm">Connecté avec l'email "{user.email}" (<Link className="text-blue-500 underline" to="/logout">logout</Link>)</p>                    
            </div>
        </div>
        <nav className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 justify-between">

                {/* Logo de l'Orif */}
                <div className="flex flex-shrink-0 justify-center items-center">
                    <img src="/assets/images/logo.jpg" alt="Orif" className="block h-8 w-auto" />
                </div>

                {/* Navigation (nouvelle partie) */}
                <div className="flex justify-center items-center">
                    <Link to="/lobby/new-game" className="ml-auto flex items-center gap-x-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <PlusIcon aria-hidden="true" className="-ml-1.5 h-5 w-5" /> Nouvelle partie
                    </Link>
                </div>
            </div>
        </nav>
        </>)
}

const LobbyLayout = () => {
    return (
        <ProtectedRoute>
            <div className="flex w-full h-full absolute justify-center items-center z-20">
                <div className="w-full min-h-full">
                    <TopBar />
                    <div className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 justify-between">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default LobbyLayout
