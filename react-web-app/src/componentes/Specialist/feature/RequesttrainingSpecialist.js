import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RequesttrainingSpecialist.css";
import Navbarspecialist from "../homepage/Navbarspecialist";
import URL from "../../../enum/enum";
import axios from "axios";
function RequestTraining() {
  const navigate = useNavigate();
  const [IDSpecialist, setIDSpecialist] = useState(10);
  const [countTrainers, setCountTrainers] = useState(0);
  const [trainerSpecialistData, setTrainerSpecialistData] = useState([]);
  const [infoTrainer, setInfoTrainer] = useState([]);

  const handlePageLeave = async () => {
    try {
      let filteredData = trainerSpecialistData.filter(
        (item) => item.ID_Specialist === IDSpecialist
      );
      const response = await fetch(`${URL}/processRequestsSpecialist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
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
    const fetchCoachDetails = async () => {
      try {
        const ID = localStorage.getItem("ID");
        setIDSpecialist(ID);

        const response1 = await fetch(`${URL}/getTrainerWithDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
        const data1 = await response1.json();
        setInfoTrainer(data1);

        const response2 = await fetch(
          `${URL}/getTrainerSpecialistWithDescription`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
        const data2 = await response2.json();
        setTrainerSpecialistData(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCoachDetails();
  }, []);

  useEffect(() => {
    if (trainerSpecialistData.length > 0) {
      handlePageLeave();
    }
  }, [trainerSpecialistData]);

  useEffect(() => {
    const count = trainerSpecialistData.filter(
      (item) =>
        item.ID_Specialist === IDSpecialist &&
        (item.Accepted === "A" || item.Accepted === "A")
    ).length;
    setCountTrainers(count);
  }, [trainerSpecialistData, IDSpecialist]);

  const acceptRequest = (id) => {
    setTrainerSpecialistData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "A" } : item
      )
    );
  };

  const rejectRequest = (id) => {
    setTrainerSpecialistData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "R" } : item
      )
    );
  };

  return (
    <div className="request-training">
      <Navbarspecialist />
      <div className="requstcontenr">
        <div className="header">
          <h1>Request Trainees</h1>
        </div>

        <div className="info">
          <div className="count">
            <span>Health system trainees:</span>
            <strong>{countTrainers} Trainees</strong>
          </div>

          <div className="trainer-requests">
            {trainerSpecialistData
              .filter(
                (item) =>
                  item.ID_Specialist === IDSpecialist &&
                  (item.Accepted == "p" || item.Accepted == "P")
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
