import React from "react";
import { Link } from "react-router-dom";

import { useGamesList } from "../../utils/games/use-list";

import { GAMES_STATES } from "../../config/games";

import './testListAnimation.css';
import '../general.css';

//import imageTest from '../../../public/assets/images/element/boussoleNulleTransp.png';

const GamesListItem = ({ game }) => {

  let initAudio = () =>
    {
      const targetAudio = document.getElementsByClassName("audioBtn7")[0];
      targetAudio.play();
    };

  return (
    <div className="container">
    <button className="btn" onClick={initAudio}>
      Ceci est un bouton de test audio
    </button>

    {/*Faire un mixage audio avec ce bouton de test */}    
    <audio className="audioBtn7">
      <source src="/assets/audio/audio pirate.mp3" type="audio/mpeg" />
    </audio>
    <article className="flex w-full py-4 justify-between items-center border-b border-gray-200">
    <img src="/assets/images/element/boussoleNulleTransp.png" className="elementContainerSpecialDiv"></img>
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
    </div>
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
        Heureux de revoir moussaillon ! Votre équipage n'attend plus
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
            {launchedGames.map((aGame) => (
              <GamesListItem key={aGame.id} game={aGame} />
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

//switcher entre tests graphiques et remise à affichage de base
//<article className="flex w-full py-4 justify-between items-center border-b border-gray-200">
//<section className="w-full mb-8">
//<img src="/assets/images/element/boussoleNulleTransp.png" className="elementContainerSpecialDiv"></img>