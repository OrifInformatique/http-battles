import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth"

import { API_BASE_URL, API_GAMES_BASE_ROUTE, API_GAMES_JOIN_ROUTE } from "../../config/api";

export const GamesJoinLink = () => {
  return (
    <>
      <hr />

      <p className="font-bold">Navigation : </p>

      <ul>
        <li>
          <Link className="text-blue-500 underline" to="/lobby">
            Retour au lobby
          </Link>
        </li>
        <li>
          <Link className="text-blue-500 underline" to={`/lobby/join-game`}>
            Rejoindre une partie (redirection)
          </Link>
        </li>
      </ul>

      <hr />

      <p className="font-bold">Contenu : </p>

      <ul>
        <li>Vérificaiton de la clé dans l'URL</li>
        <li>
          <hr />
        </li>
        <li>Redirection vers le panel pour rejoindre une partie.</li>
      </ul>

      <hr />
    </>
  );
};

const GamesJoin = () => {
  const [gameLink, setGameLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState(null);

  const { auth } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

     setLoading(true)
    
    const res = await fetch(`${API_BASE_URL}${API_GAMES_BASE_ROUTE}/${gameLink}${API_GAMES_JOIN_ROUTE}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${auth.token}` },
    });
    
    const data = await res.json();
    setGame(data);
    setLoading(false)
  }

  return (
    <>
      <section className="w-full mb-8">
        <header className="border-b border-gray-200">
          <h2 className="py-4 text-lg text-primary">Rejoindre une partie</h2>
        </header>

        <p className="py-4">
          Entrez la clé qu vous avez reçu d’un autre joueur :
        </p>

        <input
          className="w-full max-w-lg p-2 border border-gray-300"
          type="text"
          value={gameLink}
          placeholder="Entrez une clé"
          onChange={(e) => setGameLink(e.target.value)}
        />

        <button className="px-4 py-2 min-w-32 text-center bg-primary text-white" onClick={handleClick}>
          Rejoindre la partie
        </button>

        <article className="border-t border-gray-200 py-4 mt-6">
          {!game ? <>
            <h2 className="py-4 text-2xl">
                {loading ? <>
                  Vérification de la clé...
                </> : <>
                  Ajouter une clé pour trouver une partie...
                </>}
            </h2>
          </> : <>
            <h2 className="py-4 text-2xl">
                Vous avez rejoint la partie de{" "}
                <span className="text-primary">{game.owner.username}</span>
            </h2>
            <p className="pt-2 pb-4">
              <Link
                to={`/games/${game.id}`}
                className="px-6 py-4 min-w-32 text-center bg-primary text-white"
              >
                Démarrer
              </Link>
            </p>          
          </>}
        </article>
      </section>
    </>
  );
};

export default GamesJoin;
