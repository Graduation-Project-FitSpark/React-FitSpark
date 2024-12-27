import React, { useState, useEffect } from "react";
import axios from "axios";
import enumURL from "../../../enum/enum";
import "./Uploading.css";

const Uploading = () => {
  const [trainList, setTrainList] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${enumURL}/getTrains`);
        const trainNames = response.data.trains.map(
          (train) => train.Train_Name
        );
        setTrainList(trainNames);
      } catch (error) {
        console.error("Error fetching train list:", error);
      }
    };

    fetchTrains();
  }, []);

  const handleFilePicker = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTrain) {
      alert("Please select a train.");
      return;
    }
    if (!videoFile) {
      alert("Please upload a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("trainName", selectedTrain);
    formData.append("video", videoFile);

    try {
      const response = await axios.post(`${enumURL}/uploadingVideo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Upload Train Videos</h1>
      <div className="card">
        <select
          className="dropdown"
          value={selectedTrain}
          onChange={(e) => setSelectedTrain(e.target.value)}
        >
          <option value="">Select a Train</option>
          {trainList.map((train, index) => (
            <option key={index} value={train}>
              {train}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="video/mp4"
          onChange={handleFilePicker}
          className="file-input"
        />
        <button className="button" onClick={handleSubmit}>
          Upload Video
        </button>
      </div>
    </div>
  );
};

export default Uploading;
