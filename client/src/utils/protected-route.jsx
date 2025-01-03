import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "./use-auth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};