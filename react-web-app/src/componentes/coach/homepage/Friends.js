import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../feature/TraingPlan";
import Navbarcoach from "../homepage/Navbarcoach";
import axios from "axios";
import URL from "../../../enum/enum";
function Friends() {
  const navigate = useNavigate();
  const [IDCoach, setIDCoach] = useState(0);
  const [trainerCoachData, setTrainerCoachData] = useState([]);
  const [infoTrainer, setInfoTrainer] = useState([]);

  useEffect(() => {
    const fetchCoachDetails = async () => {
      try {
        const username = localStorage.getItem("username");
        const ID = localStorage.getItem("ID");
        setIDCoach(ID);

        const response1 = await fetch(`${URL}/getTrainerWithDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
        const data1 = await response1.json();
        setInfoTrainer(data1);

        const response2 = await fetch(`${URL}/getTrainerCoach`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
        const data2 = await response2.json();
        setTrainerCoachData(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCoachDetails();
  }, []);

  return (
    <div className="trainerTableContainer">
      <Navbarcoach />
      <div className="traineertitle">
        <h2 className="title">Supervising Trainer</h2>
      </div>

      {trainerCoachData
        .filter(
          (item) =>
            item.ID_Coach === IDCoach &&
            (item.Accepted === "A" || item.Accepted === "A")
        )
        .map((item) => {
          const trainerInfo = infoTrainer.find(
            (trainer) => trainer.ID_Trainer === item.ID_Trainer
          );
          if (!trainerInfo) return null;

          return (
            <div
              key={item.ID_Trainer}
              className="boxInfoTrainer"
              onClick={() =>
                navigate("/ChatCoach", {
                  state: { trainerDetails: trainerInfo },
                })
              }
            >
              <img
                src={trainerInfo.img}
                alt={`${trainerInfo.name}'s profile`}
                className="trainerImage"
              />
              <div className="trainerinfodetels">
                <p>Name: {trainerInfo.name}</p>
                <p>Age: {trainerInfo.Age}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Friends;
