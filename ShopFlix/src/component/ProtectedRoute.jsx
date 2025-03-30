import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("jwtToken");
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("jwtToken");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
