import React, { useState } from "react";
import "./Aerobicexercises.css";
import Navbarhomepage from "./../Navbarhomepage";
import { useNavigate } from "react-router-dom";

function AerobicExercises() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const exercises = [
    {
      name: "Full Supination Dumbbell",
      disname: "start_one_arm_row",
      calories: 120,
      time: "15 min",
      count: 30,
      image:
        "https://fitliferegime.com/wp-content/uploads/2021/06/Best-Dumbbell-Exercise-for-Biceps.jpg",
    },
    {
      name: "Dumbbell Lateral Raises",
      disname: "start_DumbbellLateralRaises",
      calories: 100,
      time: "15 min",
      count: 30,
      image:
        "https://fitliferegime.com/wp-content/uploads/2023/04/dumbbell-lateral-riase.jpg",
    },
    {
      name: "High Knees",
      disname: "start_Highknees",
      calories: 200,
      time: "5 min",
      count: 10,
      image:
        "https://t3.ftcdn.net/jpg/09/03/72/98/360_F_903729838_Gjmnd7DAOZEkjREdY39k56OLKq8wBvyf.jpg",
    },
  ];

  const filteredData = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <Navbarhomepage />

      <div className="contner-outer">
        <h2
          className="info-div-h1"
          style={{
            color: "black",
          }}
        >
          Aerobic Exercises
        </h2>
        <div className="serch-contenert-div">
          <div className="serch-contenert">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button-div">Search</button>
          </div>
        </div>

        <div className="choose-continer">
          {sortedData.map((exercise, index) => (
            <div
              key={index}
              className="choose-exercises"
              style={{
                backgroundImage: `url(${exercise.image})`,
              }}
              onClick={() =>
                navigate("/Firstexercises", {
                  state: { disname: exercise.disname, count: exercise.count },
                })
              }
            >
              <div className="info-div">
                <p className="info-div-h5">{exercise.name}</p>
              </div>
              <div className="info-div">
                <p className="info-div-p">Cal: {exercise.calories} kcal</p>
                <p className="info-div-p">Time: {exercise.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AerobicExercises;
