import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="NavBarComponent">
      <Link to="/">Home</Link>
      <Link to="login">Log In</Link>
      <Link to="signup">Sign Up</Link>
    </div>
  )
};

export default NavBar;