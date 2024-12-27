import React, { useState } from "react";
import axios from "axios";
import URL from "../../enum/enum";
import { useNavigate } from "react-router-dom";
import chatCoach from "../../img/chatCoach.jpg";
import chatSpeialist from "../../img/chatSpec.jpg";
const Calendar = () => {
  const navigate = useNavigate();
  let trainerId = localStorage.getItem("ID");
  const handleCoachChat = async () => {
    try {
      console.log(trainerId);
      const coachResponse = await axios.post(`${URL}/checkCoachResponse`, {
        trainerId: trainerId,
      });

      if (coachResponse.data.Accepted === "P") {
        alert("You can't talk to your Coach right now until they accept!");
      } else {
        navigate("/ChatTrainerCoach");
      }
    } catch (err) {
      console.error("Error checking coach status:", err);
    }
  };

  const handleSpecialistChat = async () => {
    try {
      const specialistResponse = await axios.post(
        `${URL}/checkSpecialistResponse`,
        {
          trainerId: trainerId,
        }
      );

      if (specialistResponse.data.Accepted === "P") {
        alert(
          "You can't talk to your Nutrition Expert right now until they accept!"
        );
      } else {
        navigate("/ChatTrainerSpecialist");
      }
    } catch (err) {
      console.error("Error checking specialist status:", err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      alignItems: "center",
    },
    box: {
      width: "400px",
      height: "400px",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.6)",
      marginBottom: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "flex-end",
      marginRight: "5%",
      marginBottom: "15%",
    },
    boxImage: {
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "flex-end",
    },
    descriptionContainer: {
      width: "100%",
      padding: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      textAlign: "center",
    },
    description: {
      fontSize: "20px",
      color: "#fff",
      fontWeight: "bold",
      letterSpacing: "1px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box} onClick={handleCoachChat}>
        <div
          style={{
            ...styles.boxImage,
            backgroundImage: `url(${chatCoach})`,
          }}
        >
          <div style={styles.descriptionContainer}>
            <p style={styles.description}>Chat with your Coach!</p>
          </div>
        </div>
      </div>

      <div style={styles.box} onClick={handleSpecialistChat}>
        <div
          style={{
            ...styles.boxImage,
            backgroundImage: `url(${chatSpeialist})`,
          }}
        >
          <div style={styles.descriptionContainer}>
            <p style={styles.description}>Chat with your Nutrition Expert!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
