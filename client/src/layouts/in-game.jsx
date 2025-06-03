import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ProtectedRoute } from "../utils/protected-route";

const TopBarQuit = () => {
  return (
    <Link
      className={`px-4 text-primary underline`}
      to="/lobby"
    >
      Quitter la partie
    </Link>
  );
};

const TopBar = () => {
  return (
    <header className="w-full h-12 border-b border-gray-200">
      <div className="flex w-full h-full max-w-[960px] m-auto justify-between items-center">
        <h1 className="font-black px-4 ">HTTP Battle : Jeux en cours</h1>
        <nav className="flex">
          <TopBarQuit />
        </nav>
      </div>
    </header>
  );
};

const InGameLayout = () => {
  return (
    <ProtectedRoute>
      <TopBar />
        <main className="w-full max-w-[1600px] m-auto px-4">
          <Outlet />
        </main>
    </ProtectedRoute>
  );
};

export default InGameLayout;
