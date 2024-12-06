import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessScreen.css";
import checkIcon from "../../../img/point/check.png";
const SuccessScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/SelectCoach", { state: { from: "SuccessScreen" } });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="animated-icon">
        <img src={checkIcon} alt="Check Icon" />
      </div>
      <p className="success-text">
        Your Calendar system has been generated successfully for each Foods and
        Trains!
      </p>
    </div>
  );
};

export default SuccessScreen;
