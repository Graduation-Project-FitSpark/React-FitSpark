import React, { useState } from "react";
import "./AddAwardsModel.css";
import enumURL from "../../../enum/enum";
import axios from "axios";
import { Alert } from "bootstrap";
function AddAwardsModel({ modalVisible, setModalVisible }) {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadedImageUrl(objectUrl);

    const base64Image = await blobToBase64(file);
    setImageUri(base64Image);
    console.log(base64Image);
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const handleSubmit = async () => {
    if (!name || !number || !imageUri) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        point: number,
        name: name,
        img: imageUri,
      };

      const response = await axios.post(
        `${enumURL}/insertPointAward`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Award inserted successfully!");
      handleCancel();
    } catch (error) {
      console.error(
        "Error inserting award:",
        error.response?.data || error.message
      );
      alert("Failed to insert award. Please try again.");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setName("");
    setNumber("");
    setImageUri(null);
  };

  if (!modalVisible) return null;

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="image-upload">
          <label className="button">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="input-container">
          <label className="label">Name:</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-container">
          <label className="label">Number:</label>
          <input
            type="number"
            className="input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number"
          />
        </div>
        {uploadedImageUrl && (
          <img
            src={uploadedImageUrl}
            alt="Selected Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
        <div className="buttons-container">
          <button className="button cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="button submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAwardsModel;
