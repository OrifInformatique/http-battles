import React, { useEffect, useState, createContext } from "react";

import {
  API_AUTH_LOGIN_ROUTE,
  API_AUTH_REGISTER_ROUTE,
  API_BASE_URL,
} from "../config/api";

export const AuthContext = createContext();

const AUTH_TOKEN = localStorage.getItem("HTTP-BATTLES-AUTH-TOKEN")
  ? localStorage.getItem("HTTP-BATTLES-AUTH-TOKEN")
  : null;
const AUTH_EXPIRATION = localStorage.getItem("HTTP-BATTLES-AUTH-EXPIRATION")
  ? localStorage.getItem("HTTP-BATTLES-AUTH-EXPIRATION")
  : null;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: AUTH_TOKEN,
    expiration: AUTH_EXPIRATION,
  });

  const login = async (formData) => {
    const res = await fetch(`${API_BASE_URL}${API_AUTH_LOGIN_ROUTE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data && data.token) {
      const date = new Date();
      localStorage.setItem("HTTP-BATTLES-AUTH-TOKEN", data.token);
      localStorage.setItem("HTTP-BATTLES-AUTH-EXPIRATION", date);

      setAuth({
        token: data.token,
        expiration: date,
      });
    }
    return data;
  };

  const register = async (formData) => {
    const res = await fetch(`${API_BASE_URL}${API_AUTH_REGISTER_ROUTE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  };

  const logout = async () => {
    localStorage.removeItem("HTTP-BATTLES-AUTH-TOKEN");
    localStorage.removeItem("HTTP-BATTLES-AUTH-EXPIRATION");

    setAuth({
      token: null,
      expiration: null,
    });
  };

  const isAuth = () => {
    return auth.token !== null;
  };

  useEffect(() => {}, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authLogin: login,
        authLogout: logout,
        authRegister: register,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
