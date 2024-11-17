// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbarhomepage.css"; // Optional: Add this for custom styles
import logo from "../../img/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    // Redirect to another page (e.g., Supplement-signup)
    navigate("/firstpage");
  };
  return (
    <div className="root-navbar">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/Awards">Awards</Link>
          </li>
          <li>
            <Link to="/Workout">Workout</Link>
          </li>
          <li>
            <Link to="/services">Meals</Link>
          </li>
          <li>
            <Link to="/contact">Settings</Link>
          </li>
        </ul>
        <div className="navbar-login">
          <button className="login-button" onClick={handleSignup}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
