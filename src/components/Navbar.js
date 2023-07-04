"use client";
import React, { useState } from "react";
import Dropdown from "./Dropdown";


const Navbar = () => {
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Your Logo
        </a>
      </div>
      <div className="navbar-start">
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;
