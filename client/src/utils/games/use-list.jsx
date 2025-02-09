import { useContext, useEffect, useState } from "react";
import { API_BASE_URL, API_GAMES_LIST_ROUTE } from "../../config/api";
import { AuthContext } from "../../contexts/auth";

export const useGamesList = () => {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState(null);

  const { auth } = useContext(AuthContext);

  const getGamesList = async () => {
    setLoading(true);
    setGames(null);

    const res = await fetch(`${API_BASE_URL}${API_GAMES_LIST_ROUTE}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    const data = await res.json();

    setGames(data);
    setLoading(false);
  };

  const refresh = () => {
    getGamesList();
  };

  useEffect(() => {
    if (!games && !loading) {
      getGamesList();
    }
  }, []);

  return [games, loading || !games, refresh];
};
