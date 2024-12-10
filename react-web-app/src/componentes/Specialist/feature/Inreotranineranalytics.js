import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inreotranineranalytics.css";
import Navbarspecialist from "../homepage/Navbarspecialist";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
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
  const acceptedTrainersCount = trainerSpecialistData.filter(
    (item) =>
      item.ID_Specialist === IDSpecialist &&
      (item.Accepted === "t" || item.Accepted === "T")
  ).length;
  return (
    <div className="trainerTableContainer-Analytics-requsrt">
      <Navbarspecialist />
      <div className="traineertitle-outer-Analytics-requsrt">
        <div className="traineertitle-Analytics-requsrt">
          <h2 className="title-Analytics-requsrt">
            Supervising Trainer Analysis
          </h2>
          <div className="trainerCount-Analytics-requsrt">
            <p>Total Trainers </p>
            <div className="trainerCount-fysical-Analytics-requsrt">
              <p>{acceptedTrainersCount}</p>
              <FitnessCenterIcon className="icon-Analytics-requsrt" />
            </div>
          </div>
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
                className="boxInfoTrainer-Analytics-requsrt"
                onClick={() =>
                  navigate("/AnalyticsSectionSpecialist", {
                    state: { trainerDetails: trainerInfo },
                  })
                }
              >
                <img
                  src={trainerInfo.img}
                  alt={`${trainerInfo.name}'s profile`}
                  className="trainerImage-Analytics-requsrt"
                />
                <div className="trainerinfodetels-Analytics-requsrt">
                  <p>Name: {trainerInfo.name}</p>
                  <p>Age: {trainerInfo.Age}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TraingPlanSpecialist;
