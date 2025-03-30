import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getRandomColor = () => {
  const colors = [
    ["from-red-500", "to-yellow-500"],
    ["from-green-500", "to-blue-500"],
    ["from-purple-500", "to-pink-500"],
    ["from-indigo-500", "to-cyan-500"],
    ["from-yellow-500", "to-orange-500"],
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ToggleCircle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [toggled, setToggled] = useState(location.pathname === "/movies");
  const [moving, setMoving] = useState(false);
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    setToggled(location.pathname === "/movies");
  }, [location.pathname]);

  const handleClick = () => {
    if (moving) return;

    setMoving(true);
    setColor(getRandomColor()); // Change color on each click

    setTimeout(() => {
      navigate(toggled ? "/shop" : "/movies");

      setTimeout(() => setMoving(false), 600);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        onClick={handleClick}
        style={{
          transform: `translateX(${moving ? -120 : 0}px) scale(${moving ? 1.1 : 1}) rotate(${moving ? -180 : 0}deg)`,
          transition: "transform 0.5s ease-in-out, background 0.5s ease-in-out",
        }}
        className={`w-16 h-16 rounded-full bg-gradient-to-r ${color[0]} ${color[1]} shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300`}
      >
        <span className="text-white font-bold text-lg">
          {toggled ? "Shop" : "Movie"}
        </span>
      </div>
    </div>
  );
};

export default ToggleCircle;
