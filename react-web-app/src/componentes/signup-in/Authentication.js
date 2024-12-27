import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import URL from "../../enum/enum.js";
import "./auth.css";
const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Email } = location.state;

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeSended, setVerificationCodeSended] = useState("");
  const [Type, setType] = useState("");

  useEffect(() => {
    sendVerificationCode();
  }, []);

  const sendVerificationCode = async () => {
    try {
      setType(localStorage.getItem("Type"));
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

  const handleVerify = async () => {
    console.log(verificationCode);
    console.log(verificationCodeSended);
    if (verificationCode === verificationCodeSended) {
      if (Type === "trainer") navigate("/Homepage");
      else if (Type === "coach") {
        fetch(`${URL}/getCoachDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: localStorage.getItem("username"),
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            localStorage.setItem("ID", data.ID_Coach);
            if (data.AcceptedDescription !== "P") navigate("/Coahhomepage");
            else
              Alert.alert(
                "Error",
                "Sorry Sir, Your Account is not being Accepted by the Admin Yet!"
              );
          })
          .catch((err) => console.error(err));
      } else if (Type === "specialist") {
        fetch(`${URL}/getSpecialistDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: localStorage.getItem("username"),
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            localStorage.setItem("ID", data.ID_Specialist);
            if (!data.AcceptedDescription !== "P")
              navigate("/Homepagespecialist");
            else
              Alert.alert(
                "Error",
                "Sorry Sir, Your Account is not being Accepted by the Admin Yet!"
              );
          })
          .catch((err) => console.error(err));
      } else if (Type === "admin") {
        navigate("/Adminmanbur");
      }
    } else {
      alert("Error: Verification code is invalid.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-form">
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
      </div>
      <div className="auth-right"></div>
    </div>
  );
};

export default Authentication;
