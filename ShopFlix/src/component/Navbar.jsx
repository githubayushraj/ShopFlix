import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("jwtToken"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear token
    navigate("/login"); // Redirect to login page
  };

  return (
    isAuthenticated && (
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Section - Logo & Links */}
          <ul className="flex space-x-6 text-white">
            <li><Link to="/" className="hover:text-gray-300 text-lg font-medium">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gray-300 text-lg font-medium">Shop</Link></li>
            <li><Link to="/movies" className="hover:text-gray-300 text-lg font-medium">Movies</Link></li>
          </ul>

          {/* Right Section - Logout Button */}
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-medium"
          >
            Logout
          </button>
        </div>
      </nav>
    )
  );
};

export default Navbar;
