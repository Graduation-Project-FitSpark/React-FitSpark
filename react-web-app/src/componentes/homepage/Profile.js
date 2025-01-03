import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../enum/enum";
import "./Profile.css";
import Navbarhomepage from "./Navbarhomepage";
const Profile = ({ route, navigation }) => {
  const [trainerDetails, setTrainerDetails] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  const insertNotification = async () => {
    const username = localStorage.getItem("username");
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description: "Remember you can Add new meals ",
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
      const response = await axios.post(`${URL}/getTrainerDetails`, {
        username,
      });
      if (response.status === 200) {
        const trainer = response.data.trainer;

        const editable = {
          Email: trainer.Email,
          Password: trainer.Password,
          First_Name: trainer.First_Name,
          Last_Name: trainer.Last_Name,
          Phone_Number: trainer.Phone_Number,
          Age: trainer.Age,
          Card_Number: trainer.Card_Number,
          Expression_Date: trainer.Expression_Date,
          CVC: trainer.CVC,
        };

        setTrainerDetails(trainer);
        setEditableFields(editable);

        const editingState = {};
        Object.keys(editable).forEach((key) => (editingState[key] = false));
        setIsEditing(editingState);
      }
    } catch (error) {
      console.error("Error fetching trainer details:", error);
      alert("Unable to fetch trainer details.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updateTrainerDetails = async () => {
    const updatedFields = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field] !== trainerDetails[field]) {
        acc[field] = editableFields[field];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      alert("No fields have been updated.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/updateTrainerDetails`, {
        trainerId: trainerDetails.ID_Trainer,
        ...updatedFields,
      });
      if (response.status === 200) {
        alert("Trainer details updated successfully.");
        fetchTrainerDetails();
      } else {
        alert("Failed to update trainer details.");
      }
    } catch (error) {
      console.error("Error updating trainer details:", error);
      alert("Unable to update trainer details.");
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
                  value={editableFields[field]?.toString() || ""}
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
        <button className="update-button" onClick={updateTrainerDetails}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
