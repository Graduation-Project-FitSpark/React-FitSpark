import React from "react";
import Slidermotin from "./Slidermotin";
import Navbarhomepage from "./Navbarhomepage";
import Qiuzecompunent from "./Qiuzecompunent";
import Gotosectiontrine from "./Gotosectiontrine";
import Ibuttoninfobody from "./Ibuttoninfobody";
import Footer from "../Welcome_Screen/Footer";
import FAQ from "../Welcome_Screen/FAQcomponent-section";
import Notifications from "./Notifications";
import Body from "./Body";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calender";
import URL from "../../enum/enum";
function Homepagetrinier() {
  const navigate = useNavigate();
  const [showSection, setShowSection] = useState(false);
  const location = useLocation();
  const insertNotification = async () => {
    const username = localStorage.getItem("username");
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description: "Check Out The Store you may like to order our new Items!",
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
    const fetchTrainerDetails = async () => {
      try {
        const username = localStorage.getItem("username");
        const trainerResponse = await axios.post(`${URL}/getTrainerDetails`, {
          username,
        });

        const trainerID = trainerResponse.data.trainer.ID_Trainer;
        localStorage.setItem("ID", trainerID);
        console.log(trainerID);

        if (trainerID) {
          const userResultResponse = await fetch(`${URL}/ifUserResultExsists`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ID_Trainer: trainerID }),
          });

          const userResultData = await userResultResponse.json();
          console.log(userResultData.exists);

          if (userResultData.exists === true) {
            setShowSection(true);
          } else {
            setShowSection(false);
          }
          console.log(showSection);
        }

        try {
          const coachResponse = await axios.post(`${URL}/checkCoachResponse`, {
            trainerId: trainerID,
          });

          const specialistResponse = await axios.post(
            `${URL}/checkSpecialistResponse`,
            {
              trainerId: trainerID,
            }
          );

          if (coachResponse.data.Accepted === "R") {
            const response = await axios.post(`${URL}/deleteCoach`, {
              trainerId: trainerID,
            });
            navigate("/SelectCoach");
          } else if (coachResponse.data.message === "Trainer not found") {
            navigate("/SelectCoach");
          }

          if (specialistResponse.data.Accepted === "R") {
            const response = await axios.post(`${URL}/deleteSpecialist`, {
              trainerId: trainerID,
            });
            navigate("/SelectSpecialist");
          } else if (specialistResponse.data.message === "Trainer not found") {
            navigate("/SelectSpecialist");
          }
        } catch (err) {
          console.error("Error checking status:", err);
        }
      } catch (error) {
        console.error("Error fetching trainer or user result details:", error);
      }
    };

    fetchTrainerDetails();
  }, [location]);
  return (
    <div>
      <Navbarhomepage></Navbarhomepage>
      <Notifications></Notifications>
      <Slidermotin></Slidermotin>
      {showSection ? <Gotosectiontrine /> : <Qiuzecompunent />}
      <Ibuttoninfobody></Ibuttoninfobody>
      <Calendar></Calendar>

      <FAQ />

      <Footer></Footer>
    </div>
  );
}

export default Homepagetrinier;
