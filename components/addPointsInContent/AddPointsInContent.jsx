import React from "react";

export const AddPointsInContent = () => {
  return (
    <div className="relative">
      <button className="navbar-link-desktop relative py-1 px-2 border rounded transition-all ease-in-out duration-300">
        Sumar Puntos
        <span className="absolute inset-x-0 bottom-0 h-1 bg-primary w-0 transition-all ease-in-out duration-300"></span>
      </button>
    </div>
  );
};
