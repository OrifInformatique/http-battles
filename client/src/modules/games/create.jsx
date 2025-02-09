import React from "react";
import { Link } from "react-router-dom";
import { useNewGame } from "../../utils/games/use-new";

const GamesCreate = () => {
  
  const [game, loading, challengerLoading] = useNewGame();

  return (
    <>
      <section className="w-full mb-8">
        <header className="border-b border-gray-200">
          <h2 className="py-4 text-lg text-primary">Nouvelle partie</h2>
        </header>

        <p className="py-4">
          Une nouvelle partie a été créée. Vous pouvez donner le lien suivant à
          un autre joueur pour qu’il rejoigne la partie :
        </p>

        <input
          className="w-full max-w-lg p-2 bg-gray-300"
          type="text"
          value={
            loading
              ? "Loading..."
              : `https://localhost:4000/games/${game.id}/join`
          }
          disabled
        />

        <p className="py-4">
          Ou transmettez uniquement la clé à rentrer depuis la page “Rejoindre
          une partie” :
        </p>

        <input
          className="w-full max-w-lg p-2 bg-gray-300"
          type="text"
          value={loading ? "Loading..." : `${game.id}`}
          disabled
        />

        <article className="border-t border-gray-200 py-4 mt-6">
          {game && game.challenger ? (
            <>
              <h2 className="py-4 text-2xl">
                <span className="text-primary">{game.challenger.username}</span>{" "}
                a rejoint la partie.
              </h2>
              <p className="pb-4">
                <Link
                  to={`/games/${game.id}`}
                  className="px-4 py-2 min-w-32 text-center bg-primary text-white"
                >
                  Démarrer
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="pt-4 text-2xl">En attente d'un adversaire ...</h2>
            </>
          )}
        </article>
      </section>
    </>
  );
};

export default GamesCreate;
