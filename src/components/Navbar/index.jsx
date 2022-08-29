import React from "react";
import "../../assets/css/style.css";

export const Navbar = () => {
  return (
    <>
      <header className="bg-navbar-blue">
        <nav className="text-white container navbar-todo">
          <h1 className="text-uppercase fw-bold fs-2 m-0">to do list app</h1>
        </nav>
      </header>
    </>
  );
};
