import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import URL from "../../../enum/enum";
import "./SelectCoach.css";

const SelectCoach = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState(null);
  const [Description, setDescription] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch(`${URL}/getAllCoaches`);
        const result = await response.json();
        setCoaches(result.coaches);
      } catch (error) {
        console.error("Error With Coaches:", error);
      }
    };

    fetchCoaches();
  }, []);

  const handleSelectCoach = (id) => {
    setSelectedCoachId(id);
  };

  const handleNext = async () => {
    if (selectedCoachId) {
      const selectedCoach = coaches.find(
        (coach) => coach.ID_Coach === selectedCoachId
      );
      const ID_Trainer = await localStorage.getItem("ID");
      const ID_Coach = selectedCoachId;
      const Accepted = "P";

      try {
        const response = await axios.post(`${URL}/insertCoachTrainer`, {
          ID_Trainer,
          ID_Coach,
          Accepted,
          Description,
        });

        if (response.status === 200) {
          alert("Sending Request to Coach Successfully!");
        } else {
          alert("Error: " + response.data.message);
        }
      } catch (error) {
        console.error("Error inserting data:", error);
        alert("Failed to insert data");
      }

      const previousRoute = location.state?.from || null;
      console.log(previousRoute);
      if (previousRoute === "SuccessScreen") {
        navigate("/SelectSpecialist", { state: { from: "SelectCoach" } });
      } else {
        navigate("/Homepage", { state: { from: "SelectCoach" } });
      }
    }
  };

  return (
    <div className="center-container">
      <div className="card-container">
        <img
          src={require("../../../img/logo.png")}
          alt="Logo"
          className="logo"
        />
        <h2 className="header-text">
          Please select your Coach who will be your supervisor
        </h2>
        <div className="coaches-list">
          {coaches.map((coach) => (
            <div
              key={coach.ID_Coach}
              className={`coach-container ${
                coach.ID_Coach === selectedCoachId ? "selected-coach" : ""
              }`}
              onClick={() => handleSelectCoach(coach.ID_Coach)}
            >
              <img
                src={coach.Img ? coach.Img : require("../../../img/man-1.png")}
                alt="Coach"
                className="coach-image"
              />
              <div className="coach-info">
                <h3
                  className={`coach-name ${
                    coach.ID_Coach === selectedCoachId ? "selected-text" : ""
                  }`}
                >
                  {coach.First_Name} {coach.Last_Name}
                </h3>
                <p
                  className={`coach-age ${
                    coach.ID_Coach === selectedCoachId ? "selected-text" : ""
                  }`}
                >
                  Age: {coach.Age}
                </p>
                <p
                  className={`coach-experience ${
                    coach.ID_Coach === selectedCoachId ? "selected-text" : ""
                  }`}
                >
                  Years of Experience: {coach.YearsOfExperience}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="containerForLabel">
          <input
            type="text"
            className="input"
            placeholder="Enter description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="next-button" onClick={handleNext}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelectCoach;
