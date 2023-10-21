import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const InitialRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/books-list" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default InitialRoute;
