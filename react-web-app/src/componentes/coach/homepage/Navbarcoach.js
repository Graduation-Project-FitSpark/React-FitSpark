// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbarcoach.css";
import logo from "../../../img/logo.png";

const Navbarcoach = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/firstpage");
  };
  return (
    <div className="root-navbar">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/Coahhomepage">
            <img src={logo} />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/TraingPlan">Training Plan</Link>
          </li>
          <li>
            <Link to="/AnalyticsSection">Analysis Plan </Link>
          </li>
          <li>
            <Link to="/Uploading">Add exercise</Link>
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

export default Navbarcoach;
