import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../../enum/enum";
import "./SelectSpecialist.css";
import { useNavigate } from "react-router-dom";
const SelectSpecialist = ({ navigation }) => {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState(null);
  const [Description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch(`${URL}/getAllSpecialists`);
        const result = await response.json();
        setSpecialists(result.specialists);
      } catch (error) {
        console.error("Error With Specialists:", error);
      }
    };

    fetchSpecialists();
  }, []);

  const handleSelectSpecialist = (id) => {
    setSelectedSpecialistId(id);
  };

  const handleNext = async () => {
    if (selectedSpecialistId) {
      const selectedSpecialist = specialists.find(
        (specialist) => specialist.ID_Specialist === selectedSpecialistId
      );
      try {
        const ID_Trainer = localStorage.getItem("ID");
        const ID_Specialist = selectedSpecialistId;
        const Accepted = "P";
        const response = await axios.post(`${URL}/insertSpecialistTrainer`, {
          ID_Trainer,
          ID_Specialist,
          Accepted,
          Description,
        });

        console.log(
          "Sending Request to Specialist Successfully!",
          response.data
        );
      } catch (error) {
        console.error("Error inserting data:", error.response.data);
      }
      navigate("/Homepage");
    }
  };

  const renderSpecialistItem = (item) => (
    <div
      className={`specialist-container ${
        item.ID_Specialist === selectedSpecialistId ? "selected-specialist" : ""
      }`}
      onClick={() => handleSelectSpecialist(item.ID_Specialist)}
      key={item.ID_Specialist}
    >
      <img
        src={item.Img ? item.Img : require("../../../img/logo.png")}
        alt="Specialist"
        className="specialist-image"
      />
      <div className="specialist-info">
        <div
          className={`specialist-name ${
            item.ID_Specialist === selectedSpecialistId ? "selected-text" : ""
          }`}
        >
          {item.First_Name} {item.Last_Name}
        </div>
        <div
          className={`specialist-age ${
            item.ID_Specialist === selectedSpecialistId ? "selected-text" : ""
          }`}
        >
          Age: {item.Age}
        </div>
        <div
          className={`specialist-experience ${
            item.ID_Specialist === selectedSpecialistId ? "selected-text" : ""
          }`}
        >
          Years of Experience: {item.YearsOfExperience}
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <div className="card-container">
        <img
          src={require("../../../img/logo.png")}
          alt="Logo"
          className="logo"
        />
        <div className="header-text">
          Please select your Specialist who will be your supervisor
        </div>
        <div className="specialist-list">
          {specialists.map((specialist) => renderSpecialistItem(specialist))}
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
        <div className="next-button" onClick={handleNext}>
          <div className="next-button-text">Submit</div>
        </div>
      </div>
    </div>
  );
};

export default SelectSpecialist;
