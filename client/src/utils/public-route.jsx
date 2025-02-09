import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export const PublicRoute = ({ children }) => {
  const { auth, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate("/lobby");
    }
  }, [auth]);

  return children;
};
