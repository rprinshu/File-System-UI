import React from "react";
import logo from "../Assets/ellucian.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <span className="logo">
          <img height="60px" src={logo} />
          Ellucian
        </span>
      </nav>
    </div>
  );
};

export default Navbar;
