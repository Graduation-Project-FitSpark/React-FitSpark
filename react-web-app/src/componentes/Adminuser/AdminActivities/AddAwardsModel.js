import React, { useState } from "react";
import "./AddAwardsModel.css";

function AddAwardsModel({ modalVisible, setModalVisible }) {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUri(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!name || !number || !imageUri) {
      alert("Please fill all fields");
    } else {
      alert(`Name: ${name}, Number: ${number}`);
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
          {imageUri && <img src={imageUri} alt="Preview" className="image" />}
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
