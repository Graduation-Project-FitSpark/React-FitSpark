import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Requesttraining.css";
import Navbarcoach from "../homepage/Navbarcoach";
import URL from "../../../enum/enum";
import axios from "axios";
function RequestTraining() {
  const navigate = useNavigate();
  const [IDCoach, setIDCoach] = useState(0);
  const [countTrainers, setCountTrainers] = useState(0);
  const [trainerCoachData, setTrainerCoachData] = useState([]);
  const [infoTrainer, setInfoTrainer] = useState([]);
  useEffect(() => {
    const fetchCoachDetails = async () => {
      try {
        const ID = localStorage.getItem("ID");
        setIDCoach(ID);

        const response1 = await fetch(`${URL}/getTrainerWithDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
        const data1 = await response1.json();
        setInfoTrainer(data1);

        const response2 = await fetch(`${URL}/getTrainerCoachWithDescription`, {
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
  const handlePageLeave = async () => {
    try {
      const response = await fetch(`${URL}/processRequestsCoach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainerCoachData),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error processing requests:", error.message);
    }
  };

  useEffect(() => {
    const count = trainerCoachData.filter(
      (item) => item.ID_Coach === IDCoach && item.Accepted === "A"
    ).length;
    setCountTrainers(count);
  }, [trainerCoachData, IDCoach]);

  useEffect(() => {
    if (trainerCoachData.length > 0) {
      handlePageLeave();
    }
  }, [trainerCoachData]);

  const acceptRequest = async (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "A" } : item
      )
    );
  };

  const rejectRequest = async (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "R" } : item
      )
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="request-training">
      <Navbarcoach />
      <div className="requstcontenr">
        <div className="header">
          <h1>Request Trainer</h1>
        </div>

        <div className="info">
          <div className="count">
            <span>Number of trainees you train:</span>
            <strong>{countTrainers} Trainees</strong>
          </div>

          <div className="trainer-requests">
            {trainerCoachData
              .filter(
                (item) => item.ID_Coach === IDCoach && item.Accepted === "P"
              )
              .map((item) => {
                const trainerInfo = infoTrainer.find(
                  (trainer) => trainer.ID_Trainer === item.ID_Trainer
                );
                if (!trainerInfo) return null;

                return (
                  <div key={item.ID_Trainer} className="trainer-box">
                    <div className="trainer-details">
                      <img
                        src={trainerInfo.img}
                        alt={trainerInfo.name}
                        className="trainer-image"
                      />
                      <div>
                        <p>Name: {trainerInfo.name}</p>
                        <p>Age: {trainerInfo.Age}</p>
                      </div>
                    </div>
                    <p className="description">{item.Description}</p>
                    <div className="actions">
                      <button
                        className="accept-button"
                        onClick={() => acceptRequest(item.ID_Trainer)}
                      >
                        Accept
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => rejectRequest(item.ID_Trainer)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestTraining;
