import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TraingPlanSpecialist.css";
import Navbarspecialist from "../homepage/Navbarspecialist";

function TraingPlanSpecialist() {
  const navigate = useNavigate();
  const [IDSpecialist, setIDSpecialist] = useState(10);
  const [trainerSpecialistData, setTrainerSpecialistData] = useState([
    {
      ID_Trainer: 13,
      ID_Specialist: 10,
      Accepted: "t",
      Description:
        "Trainer 1 is paired with Coach 2 and the request is accepted.",
    },
    {
      ID_Trainer: 9,
      ID_Specialist: 10,
      Accepted: "f",
      Description:
        "Trainer 3 is paired with Coach 4 and the request is declined.",
    },
    {
      ID_Trainer: 1,
      ID_Specialist: 10,
      Accepted: "t",
      Description:
        "Trainer 5 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 4,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 7 is paired with Coach 8 and the request is declined.",
    },
  ]);

  const [infoTrainer] = useState([
    {
      ID_Trainer: 13,
      name: "Mahmoud",
      Age: 23,
      img: "https://via.placeholder.com/150",
    },
    {
      ID_Trainer: 9,
      name: "Ali",
      Age: 25,
      img: "https://via.placeholder.com/150",
    },
    {
      ID_Trainer: 1,
      name: "Sara",
      Age: 22,
      img: "https://via.placeholder.com/150",
    },
    {
      ID_Trainer: 4,
      name: "John",
      Age: 28,
      img: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="trainerTableContainer">
      <Navbarspecialist />
      <div className="traineertitle">
        <h2 className="title">Supervising Trainer</h2>
      </div>

      {trainerSpecialistData
        .filter(
          (item) =>
            item.ID_Specialist === IDSpecialist &&
            (item.Accepted === "t" || item.Accepted === "T")
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
                navigate("/Traineefood", {
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

export default TraingPlanSpecialist;
