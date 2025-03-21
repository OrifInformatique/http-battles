import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../utils/protected-route";
import { AuthContext } from "../contexts/auth";

const TopBarLink = ({ label, route }) => {
  const location = useLocation();

  return (
    <Link
      className={`px-4 ${
        location.pathname === route ? "text-gray-900" : "text-primary underline"
      }`}
      to={route}
    >
      {label}
    </Link>
  );
};

const TopBarLogout = () => {
  // Hooks de contextes
  const { authLogout } = useContext(AuthContext);

  // Evenements
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    authLogout();
  };

  return (
    <a
      className={`px-4 text-primary underline`}
      href="#logout"
      onClick={handleClick}
    >
      Logout
    </a>
  );
};

const TopBar = () => {
  return (
    <header className="w-full h-12 border-b border-gray-200">
      <div className="flex w-full h-full max-w-[960px] m-auto justify-between items-center">
        <h1 className="font-black px-4 ">HTTP Battle</h1>
        <nav className="flex">
          <TopBarLink route="/lobby" label="Lobby" />
          <TopBarLink route="/lobby/new-game" label="Nouvelle partie" />
          <TopBarLink route="/lobby/join-game" label="Rejoindre une partie" />
          <TopBarLogout />
        </nav>
      </div>
    </header>
  );
};

const LobbyLayout = () => {
  return (
    <ProtectedRoute>
      <TopBar />
      <main className="w-full max-w-[960px] m-auto px-4">
        <Outlet />
      </main>
      <div className="lobby-background">
        <div className="bg-boat"></div>
      </div>
    </ProtectedRoute>
  );
};

export default LobbyLayout;
