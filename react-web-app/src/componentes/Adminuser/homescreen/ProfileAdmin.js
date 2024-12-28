import React, { useEffect, useState } from "react";
import "./ProfileAdmin.css";
import axios from "axios";
import URL from "../../../enum/enum";

const ProfileAdmin = () => {
  const [adminDetails, setAdminDetails] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(`${URL}/getAdminDetails`);
      if (response.status === 200) {
        const admin = response.data;
        const editable = {
          Email: admin.Email,
          Password: admin.Password,
          First_Name: admin.First_Name,
          Last_Name: admin.Last_Name,
          Phone_Number: admin.Phone_Number,
          Age: admin.Age,
        };

        setAdminDetails(admin);
        setEditableFields(editable);

        const editingState = {};
        Object.keys(editable).forEach((key) => (editingState[key] = false));
        setIsEditing(editingState);
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
      alert("Unable to fetch admin details.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updateAdminDetails = async () => {
    const updatedFields = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field] !== adminDetails[field]) {
        acc[field] = editableFields[field];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      alert("No fields have been updated.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/updateAdminDetails`, {
        ...updatedFields,
      });
      if (response.status === 200) {
        alert("Admin details updated successfully.");
        fetchAdminDetails();
      } else {
        alert("Failed to update admin details.");
      }
    } catch (error) {
      console.error("Error updating admin details:", error);
      alert("Unable to update admin details.");
    }
  };

  return (
    <div className="profile-admin-container">
      <h1 className="profile-title">Admin Profile</h1>
      <div className="profile-fields">
        {Object.keys(editableFields).map((field) => (
          <div key={field} className="field-container">
            <label className="field-label">{field.replace(/_/g, " ")}</label>
            <input
              type="text"
              className={`field-input ${
                isEditing[field] ? "editable" : "disabled"
              }`}
              value={editableFields[field]?.toString() || ""}
              disabled={!isEditing[field]}
              onChange={(e) => handleFieldChange(field, e.target.value)}
            />
            <button
              className="edit-button"
              onClick={() => toggleEditing(field)}
            >
              {isEditing[field] ? "Save" : "Edit"}
            </button>
          </div>
        ))}
        <button className="update-button" onClick={updateAdminDetails}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileAdmin;
