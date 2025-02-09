import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export const ProtectedRoute = ({ children }) => {
  const { auth, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate("/");
    }
  }, [auth]);

  return children;
};
