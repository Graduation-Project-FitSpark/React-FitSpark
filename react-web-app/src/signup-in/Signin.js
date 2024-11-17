import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../enum/enum.js";
import logo from "../img/logo.png";
import "./signin.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/searchForUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        alert("Error: " + errorText);
        return;
      }
      const data = await response.json();
      if (data.message) {
        const { Email } = data.user;
        navigate("/Authentication", {
          state: { username: username, Email: Email },
        });
      } else {
        alert("Warning: Username or password is incorrect");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error: Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo" className="auth-logo" />
      <form onSubmit={handleSignIn} className="signin-form">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        <p>
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </p>
      </form>
    </div>
  );
};

export default Signin;
