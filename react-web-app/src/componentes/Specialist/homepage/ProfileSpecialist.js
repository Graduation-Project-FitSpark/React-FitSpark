import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../../enum/enum";
import "./ProfileSpecialist.css";
import { Alert } from "bootstrap";

const ProfileSpecialist = ({ route, navigation }) => {
  const [specialistDetails, setspecialistDetails] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const insertNotification = async () => {
    const username = localStorage.getItem("username");
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description:
          Math.random() > 0.5
            ? "Remember you can Add new Meals to the system"
            : "Don't forget to update the system with the latest meals",
        Date: currentDate,
        Msg_To: username,
      };

      const response = await axios.post(
        `${URL}/insertNotification`,
        notificationData
      );

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error("Error inserting notification:", error);
      return "Failed to insert notification";
    }
  };
  useEffect(() => {
    insertNotification();
    fetchTrainerDetails();
  }, []);

  const fetchTrainerDetails = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.post(`${URL}/getSpecialistDetails`, {
        username,
      });
      if (response.status === 200) {
        const specialist = response.data;
        const editable = {
          Email: specialist.Email,
          Password: specialist.Password,
          First_Name: specialist.First_Name,
          Last_Name: specialist.Last_Name,
          Phone_Number: specialist.Phone_Number,
          Age: specialist.Age,
          Card_Number: specialist.Card_Number,
          Expression_Date: specialist.Expression_Date,
          CVC: specialist.CVC,
        };

        setspecialistDetails(specialist);
        setEditableFields(editable);

        const editingState = {};
        Object.keys(editable).forEach((key) => (editingState[key] = false));
        setIsEditing(editingState);
      }
    } catch (error) {
      console.error("Error fetching specialist details:", error);
      alert("Error", "Unable to fetch specialist details.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updatespecialistDetails = async () => {
    const updatedFields = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field] !== specialistDetails[field]) {
        acc[field] = editableFields[field];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      alert("No Changes", "No fields have been updated.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/updateSpecialistDetails`, {
        specialistId: specialistDetails.ID_Specialist,
        ...updatedFields,
      });
      if (response.status === 200) {
        alert("Success", "specialist details updated successfully.");
        fetchTrainerDetails();
      } else {
        alert("Error", "Failed to update specialist details.");
      }
    } catch (error) {
      console.error("Error updating specialist details:", error);
      alert("Error", "Unable to update specialist details.");
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      {Object.keys(editableFields).map((field) => (
        <div key={field} className="field-container">
          <label className="label">{field.replace(/_/g, " ")}</label>
          <input
            className={`input ${isEditing[field] ? "editable" : "disabled"}`}
            value={editableFields[field] || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            disabled={!isEditing[field]}
          />
          <button
            className="toggle-button"
            onClick={() => toggleEditing(field)}
          >
            {isEditing[field] ? "Save" : "Edit"}
          </button>
        </div>
      ))}
      <button className="update-button" onClick={updatespecialistDetails}>
        Update Profile
      </button>
    </div>
  );
};

export default ProfileSpecialist;
