import * as React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";

import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = React.useContext(AuthContext);

  // If there no token -> login and signup. Otherwise logout
  const menue = user ? (
    <div onClick={logout} className="logout-btn">
      Logout
    </div>
  ) : (
    <div className="container-login-signup flex">
      <div className="login-btn">
        <Link to="/login">Login</Link>
      </div>
      <div className="signup-btn">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );

  return (
    <div className="navbar">
      <div className="title">
        <Link to="/">Project Zer0 🚀</Link>
      </div>
      {menue}
    </div>
  );
};

export default NavBar;
