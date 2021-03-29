import * as React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="title">
        <Link to="/">Project Zer0 🚀</Link>
      </div>
      <div className="container-login-signup flex">
        <div className="login-btn">
          <Link to="/login">Login</Link>
        </div>
        <div className="signup-btn">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
