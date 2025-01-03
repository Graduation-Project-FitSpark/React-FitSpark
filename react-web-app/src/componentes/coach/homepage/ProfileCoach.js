import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../../enum/enum";
import "./ProfileCoach.css";
import Navbarhomepage from "./Navbarcoach";

const ProfileCoach = ({ route, navigation }) => {
  const [coachDetails, setCoachDetails] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    fetchTrainerDetails();
  }, []);

  const fetchTrainerDetails = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.post(`${URL}/getCoachDetails`, {
        username,
      });
      if (response.status === 200) {
        const coach = response.data;
        const editable = {
          Email: coach.Email,
          Password: coach.Password,
          First_Name: coach.First_Name,
          Last_Name: coach.Last_Name,
          Phone_Number: coach.Phone_Number,
          Age: coach.Age,
          Card_Number: coach.Card_Number,
          Expression_Date: coach.Expression_Date,
          CVC: coach.CVC,
        };

        setCoachDetails(coach);
        setEditableFields(editable);

        const editingState = {};
        Object.keys(editable).forEach((key) => (editingState[key] = false));
        setIsEditing(editingState);
      }
    } catch (error) {
      console.error("Error fetching coach details:", error);
      alert("Unable to fetch coach details.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updateCoachDetails = async () => {
    const updatedFields = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field] !== coachDetails[field]) {
        acc[field] = editableFields[field];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      alert("No fields have been updated.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/updateCoachDetails`, {
        coachId: coachDetails.ID_Coach,
        ...updatedFields,
      });
      if (response.status === 200) {
        alert("Coach details updated successfully.");
        fetchTrainerDetails();
      } else {
        alert("Failed to update coach details.");
      }
    } catch (error) {
      console.error("Error updating coach details:", error);
      alert("Unable to update coach details.");
    }
  };

  const fieldPairs = [
    ["Email", "Password"],
    ["First_Name", "Last_Name"],
    ["Phone_Number", "Age"],
    ["Card_Number", "Expression_Date"],
    ["CVC"],
  ];

  return (
    <div>
      <Navbarhomepage />
      <div className="profile-containerC">
        <h1 className="profile-title">Profile</h1>
        {fieldPairs.map((pair, index) => (
          <div key={index} className="field-rowF">
            {pair.map((field) => (
              <div key={field} className="field-container">
                <label className="label">{field.replace(/_/g, " ")}</label>
                <input
                  className={`input ${
                    isEditing[field] ? "editable" : "disabled"
                  }`}
                  value={editableFields[field] || ""}
                  readOnly={!isEditing[field]}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                />
                <button
                  className="toggle-buttonN"
                  onClick={() => toggleEditing(field)}
                >
                  {isEditing[field] ? "Save" : "Change"}
                </button>
              </div>
            ))}
          </div>
        ))}
        <button className="update-button" onClick={updateCoachDetails}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileCoach;
