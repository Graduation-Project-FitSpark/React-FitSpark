import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RequesttrainingSpecialist.css";
import Navbarspecialist from "../homepage/Navbarspecialist";
function RequestTraining() {
  const navigate = useNavigate();
  const [IDSpecialist, setIDSpecialist] = useState(10);
  const [countTrainers, setCountTrainers] = useState(0);

  const [trainerSpecialistData, setTrainerSpecialistData] = useState([
    {
      ID_Trainer: 1,
      ID_Specialist: 10,
      Accepted: "t",
      Description:
        "Trainer 1 is paired with Coach 2 and the request is accepted.",
    },
    {
      ID_Trainer: 3,
      ID_Specialist: 4,
      Accepted: "f",
      Description:
        "Trainer 3 is paired with Coach 4 and the request is declined.",
    },
    {
      ID_Trainer: 13,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 5 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 7,
      ID_Specialist: 8,
      Accepted: "f",
      Description:
        "Trainer 7 is paired with Coach 8 and the request is declined.",
    },
    {
      ID_Trainer: 9,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 9 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 10,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 10 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 12,
      ID_Specialist: 10,
      Accepted: "T",
      Description:
        "Trainer 12 is paired with Coach 10 and the request is pending.",
    },
    {
      ID_Trainer: 13,
      ID_Specialist: 10,
      Accepted: "T",
      Description:
        "Trainer 13 is paired with Coach 10 and the request is pending.",
    },
    {
      ID_Trainer: 15,
      ID_Specialist: 16,
      Accepted: "f",
      Description:
        "Trainer 15 is paired with Coach 16 and the request is declined.jjsldkcklsjcjlnsdjcbdcljsjlbjldc",
    },
    {
      ID_Trainer: 17,
      ID_Specialist: 18,
      Accepted: "t",
      Description:
        "Trainer 17 is paired with Coach 18 and the request is accepted.",
    },
    {
      ID_Trainer: 19,
      ID_Specialist: 20,
      Accepted: "f",
      Description:
        "Trainer 19 is paired with Coach 20 and the request is declined.",
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
    const count = trainerSpecialistData.filter(
      (item) =>
        item.ID_Specialist === IDSpecialist &&
        (item.Accepted === "t" || item.Accepted === "T")
    ).length;
    setCountTrainers(count);
  }, [trainerSpecialistData, IDSpecialist]);

  const acceptRequest = (id) => {
    setTrainerSpecialistData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "t" } : item
      )
    );
  };

  const rejectRequest = (id) => {
    setTrainerSpecialistData((prevData) =>
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
