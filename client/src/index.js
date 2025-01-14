import React from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Layouts
import PublicLayout from './layouts/public';
import LobbyLayout from './layouts/lobby';
import InGameLayout from './layouts/in-game'

// Pulic Components
import LoginForm from './modules/login/form';
import RegisterForm from './modules/register/form';
import ForgotPasswordForm from './modules/forgotpassword/form';

// Lobby Components
import GamesCreate from './modules/games/create';
import GamesJoin, { GamesJoinLink } from './modules/games/join';
import GamesList from './modules/games/list';

// In-Game Components
import GamesLaunch from './modules/games/launch';
import GamesEnded from './modules/games/ended';

// Utilitaires
import Redirect from './utils/redirect';

// Styles
import './index.pcss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<BrowserRouter>
    <Routes>
        <Route path="/login" element={<PublicLayout />}>
            <Route index element={<LoginForm />} />
        </Route>

        <Route path="/register" element={<PublicLayout />}>
            <Route index element={<RegisterForm />} />
        </Route>

        <Route path="/forgotpassword" element={<PublicLayout />}>
            <Route index element={<ForgotPasswordForm />} />
        </Route>

        <Route path="/lobby" element={<LobbyLayout />}>
            <Route index element={<GamesList />} />
            <Route path="new-game" element={<GamesCreate />} />
            <Route path="join-game" element={<GamesJoin />} />
        </Route>

        <Route path="/games" element={<InGameLayout />}>
            <Route path=":gameId" element={<GamesLaunch />} />
            <Route path=":gameId/ended" element={<GamesEnded />} />
            <Route path=":gameId/join" element={<GamesJoinLink />} />
        </Route>
        <Route path="*" element={<Redirect to="login" />} />
    </Routes>
</BrowserRouter>);
