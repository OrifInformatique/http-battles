import React from "react";
import { Link } from "react-router-dom";

import { useGamesList } from "../../utils/games/use-list";

import { GAMES_STATES } from "../../config/games";

const GamesListItem = ({ game }) => {
  return (
    <article className="flex w-full py-4 justify-between items-center border-b border-gray-200">
      <h2>Partie avec {game.challenger?.username}</h2>
      <div className="flex">
        {game.state !== "ENDED" ? (
          <>
            <p className="pr-4">Etat : {GAMES_STATES[game.state]}</p>
            <Link className="text-primary underline" to={`/games/${game.id}`}>Continuer</Link>
          </>
        ) : (
          <Link className="text-primary underline" to={`/games/${game.id}/ended`}>Résultat</Link>
        )}
      </div>
    </article>
  );
};

const GamesListLoading = () => {
  return (
    <article className="flex w-full py-4 justify-between items-center">
      <h2>Chargement des parties ...</h2>
    </article>
  );
};

const GamesList = () => {
  const [games, loading] = useGamesList();

  let launchedGames, endedGames;
  if (games) {
    launchedGames = games.filter(
      (aGame) => aGame.state !== "WAITING_PLAYER" && aGame.state !== "ENDED"
    );
    endedGames = games.filter((aGame) => aGame.state === "ENDED");
  }

  return (
    <>
      <h1 className="py-8 text-3xl max-w-[660px]">
        Heureux de vous voir de retour mousaillon! Vôtre équipage n'attend plus
        que vous afin de partir à la conquête du web.
      </h1>

      <section className="w-full mb-8">
        <header className="border-b border-gray-200">
          <h2 className="py-4 text-lg text-primary">Parties en cours</h2>
        </header>

        {loading ? (
          <GamesListLoading />
        ) : (
          <>
            {launchedGames.map((aGame, index) => ( 
                <GamesListItem key={aGame.game._id} game={aGame} />
            ))}
          </>
        )}
      </section>

      <section className="w-full mb-4">
        <header className="border-b border-gray-200">
          <h2 className="py-4 text-lg text-primary">Parties terminées</h2>
        </header>

        {loading ? (
          <GamesListLoading />
        ) : (
          <>
            {endedGames.map((aGame) => (
              <GamesListItem key={aGame.id} game={aGame} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default GamesList;
