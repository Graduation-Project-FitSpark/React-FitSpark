import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Requesttraining.css";
import Navbarcoach from "../homepage/Navbarcoach";
function RequestTraining() {
  const navigate = useNavigate();
  const [IDCoach, setIDCoach] = useState(10);
  const [countTrainers, setCountTrainers] = useState(0);

  const [trainerCoachData, setTrainerCoachData] = useState([
    {
      ID_Trainer: 9,
      ID_Coach: 10,
      Accepted: "p",
      Description:
        "Trainer 1 is paired with Coach 2 and the request is accepted.",
    },
    {
      ID_Trainer: 13,
      ID_Coach: 10,
      Accepted: "p",
      Description:
        "Trainer 13 is paired with Coach 10 and the request is pending.",
    },
  ]);

  const [infoTrainer, setInfoTrainer] = useState([
    {
      ID_Trainer: 13,
      name: "Mahmoud",
      Age: 23,
      img: "https://via.placeholder.com/80",
    },
    {
      ID_Trainer: 9,
      name: "Ali",
      Age: 25,
      img: "https://via.placeholder.com/80",
    },
  ]);

  useEffect(() => {
    const count = trainerCoachData.filter(
      (item) => item.ID_Coach === IDCoach && item.Accepted === "t"
    ).length;
    setCountTrainers(count);
  }, [trainerCoachData, IDCoach]);

  const acceptRequest = (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "t" } : item
      )
    );
  };

  const rejectRequest = (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "f" } : item
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
                (item) => item.ID_Coach === IDCoach && item.Accepted === "p"
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
