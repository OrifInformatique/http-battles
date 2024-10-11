import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Login Components
import LoginLayout from './components/layouts/login';
import LoginForm from './components/modules/login/form';

// Lobby Components
import LobbyLayout from './components/layouts/lobby';
import GamesCreate from './components/modules/games/create';
import GamesList from './components/modules/games/list';

// In-Game Components
import GameLayout from './components/layouts/game'
import GamesLaunch from './components/modules/games/launch';

// Protected Route
import { ProtectedRoute } from './components/layouts/protected-route';


// Auth utils
import { AuthProvider, useAuth } from './hooks/useAuth';

import './index.pcss';

const container = document.getElementById('root');
const root = createRoot(container);

const NoMatch = () => {
    return (<ProtectedRoute>
        <div className="w-full h-full flex items-center justify-center">
            <p>404 - Aucune page trouvée</p>
        </div>
    </ProtectedRoute>);
}

const Logout = () => {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    })
    return <></>;
}

root.render(<BrowserRouter>
    <AuthProvider>
        <Routes>
            <Route path="/login" element={<LoginLayout />}>
                <Route index element={<LoginForm />} />
            </Route>

            <Route path="/lobby" element={<LobbyLayout />}>
                <Route index element={<GamesList />} />
                <Route path="new-game" element={<GamesCreate />} />
            </Route>

            <Route path="/games" element={<GameLayout />}>
                <Route path=":gameId" element={<GamesLaunch />} />
            </Route>

            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </AuthProvider>
</BrowserRouter>);
