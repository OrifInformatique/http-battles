export const API_BASE_URL = "http://192.168.40.112:3000/api"; /*utiliser localhost ou sinon l'adresse IP exacte de la machine locale pour qu'Enzo puisse s'y connecter*/

// Auth Routes
export const API_AUTH_BASE_ROUTE = "/auth";

export const API_AUTH_LOGIN_ROUTE = `${API_AUTH_BASE_ROUTE}/login`;
export const API_AUTH_LOGOUT_ROUTE = `${API_AUTH_BASE_ROUTE}/logout`;
export const API_AUTH_REGISTER_ROUTE = `${API_AUTH_BASE_ROUTE}/signup`;

// Games Routes
export const API_GAMES_BASE_ROUTE = `/games`;

export const API_GAMES_LIST_ROUTE = `${API_GAMES_BASE_ROUTE}`;
export const API_GAMES_NEW_ROUTE = `${API_GAMES_BASE_ROUTE}`;
export const API_GAMES_CHALLENGER_ROUTE = `/challenger`;
export const API_GAMES_JOIN_ROUTE = `/join`;