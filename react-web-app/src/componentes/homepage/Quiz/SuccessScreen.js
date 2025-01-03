import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessScreen.css";
import checkIcon from "../../../img/point/check.png";
import URL from "../../../enum/enum";
import axios from "axios";

const SuccessScreen = () => {
  const navigate = useNavigate();
  const insertNotification = async () => {
    const username = localStorage.getItem("username");
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description:
          "Well Done! You finished the Start-Up Questionnaire, Check out your trains and meals schedule",
        Date: currentDate,
        Msg_To: username,
      };

      const response = await axios.post(
        `${URL}/insertNotification`,
        notificationData
      );

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error("Error inserting notification:", error);
      return "Failed to insert notification";
    }
  };
  useEffect(() => {
    insertNotification();
    const timer = setTimeout(() => {
      navigate("/Homepage", { state: { from: "SuccessScreen" } });
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
