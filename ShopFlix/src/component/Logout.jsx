
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Remove token
    localStorage.removeItem("userId"); // Remove user_id if stored
    sessionStorage.clear(); // Clear session storage
    document.cookie.split(";").forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/login");
  };  

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
  );
};

export default Logout;
