import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import URL from "../enum/enum.js";

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Email } = location.state;

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeSended, setVerificationCodeSended] = useState("");

  useEffect(() => {
    sendVerificationCode();
  }, []);

  const sendVerificationCode = async () => {
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCodeSended(code);
      console.log("Sending verification code to:", Email);
      await axios.post(`${URL}/auth/sendingVC`, {
        Email: Email,
        code: code,
      });
      alert("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("Error: Failed to send verification code.");
    }
  };

  const handleVerify = () => {
    if (verificationCode === verificationCodeSended) {
      alert("Success! Verification code is valid.");
    } else {
      alert("Error: Verification code is invalid.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verification</h2>
      <p>
        A verification code has been sent to your email:{" "}
        <strong>{Email}</strong>.
      </p>

      <input
        type="text"
        placeholder="Enter verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="auth-input"
      />

      <button onClick={handleVerify} className="auth-button">
        Verify
      </button>
    </div>
  );
};

export default Authentication;
