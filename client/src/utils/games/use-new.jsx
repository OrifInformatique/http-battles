import { useContext, useEffect, useState } from "react";
import {
  API_BASE_URL,
  API_GAMES_BASE_ROUTE,
  API_GAMES_NEW_ROUTE,
  API_GAMES_CHALLENGER_ROUTE
} from "../../config/api";
import { AuthContext } from "../../contexts/auth";

let waitTimer;

export const useNewGame = () => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState(null);
  const [challengerLoading, setChallengerLoading] = useState(false);

  const { auth } = useContext(AuthContext);

  const getGameChallenger = async () => {

    setChallengerLoading(true)

    const res = await fetch(
      `${API_BASE_URL}${API_GAMES_BASE_ROUTE}/${game.id}${API_GAMES_CHALLENGER_ROUTE}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${auth.token}` },
      }
    );

    const data = await res.json();
    setGame(data);
  };

  const postNewGame = async () => {
    setLoading(true);
    setGame(null);

    const res = await fetch(`${API_BASE_URL}${API_GAMES_NEW_ROUTE}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    const data = await res.json();

    setGame(data);
    setChallengerLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    if (!game && !loading) {
      postNewGame();
    }
  }, []);

  useEffect(() => {
    if(challengerLoading){
      waitTimer = setTimeout(() => getGameChallenger(), 5000);
    }
    return () => {
      clearTimeout(waitTimer);
    };
  }, [challengerLoading]);

  return [game, loading || !game, challengerLoading];
};
