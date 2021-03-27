import * as React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container flex">
        <div className="title">
          <h2>Project Zer0 🚀</h2>
        </div>
        <div className="container-login-signup flex">
          <div className="login-btn">
            <a href="/">Login</a>
          </div>
          <div className="signup-btn">
            <a href="/">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
