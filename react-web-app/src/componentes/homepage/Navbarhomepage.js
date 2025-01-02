// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbarhomepage.css";
import logo from "../../img/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/firstpage");
  };
  return (
    <div className="root-navbar">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/Homepage">
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
            <Link to="/Foodplan">Meals</Link>
          </li>
          <li>
            <Link to="/Profile">Settings</Link>
            <Link to="/Shop">Shop</Link>
          </li>
          <li>
            <Link to="/Aerobicexercises">Aerobic exercises</Link>
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
