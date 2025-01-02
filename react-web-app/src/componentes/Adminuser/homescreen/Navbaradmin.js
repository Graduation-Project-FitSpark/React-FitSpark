// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbaradmin.css";
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
          <Link to="/AdminHomeScreen">
            <img src={logo} />
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/SelectShop">Store</Link>
          </li>
          <li>
            <Link to="/Chosseuser">User Tables </Link>
          </li>
          <li>
            <Link to="/AddAwards">Add Awards</Link>
          </li>
          <li>
            <Link to="/Requestcoachspecialist">Applicants</Link>
          </li>
          <li>
            <Link to="/CoachVideos">Coachs Videos</Link>
          </li>
          <li>
            <Link to="/Foodplan">FAQ</Link>
          </li>
          <li>
            //
            <Link to="/ProfileAdmin">Settings</Link>
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
