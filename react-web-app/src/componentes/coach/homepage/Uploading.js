import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbarhomepage from "./Navbarcoach";
import "./Uploading.css";
import enumURL from "../../../enum/enum";
const CoachUpload = () => {
  const [trainList, setTrainList] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [username, setUsername] = useState("");
  const [fileN, setFileN] = useState("");
  useEffect(() => {
    const fetchTrainList = async () => {
      try {
        let un = localStorage.getItem("username");
        setUsername(un);
        const response = await axios.get(`${enumURL}/getTrains`);
        const trainNames = response.data.trains.map(
          (train) => train.Train_Name
        );
        setTrainList(trainNames);
      } catch (error) {
        console.error("Error fetching train list:", error);
      }
    };

    fetchTrainList();
  }, []);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setFileN(e.target.files[0].name);
  };

  const handleUpload = async () => {
    if (!selectedTrain || !videoFile) {
      alert("Please select a train and a video file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("trainName", selectedTrain);
    formData.append("video", videoFile, `${username}_${fileN}.mp4`);

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
    <div>
      <Navbarhomepage />
      <div className="coach-upload-container">
        <div className="coach-upload-box">
          <div className="coach-upload-title-container">
            <p className="coach-upload-title">Upload Train Videos</p>
            <p className="coach-upload-description">
              Upload video you want to share with your trainee
            </p>
          </div>

          <div className="coach-upload-dropzone">
            <div className="coach-upload-file-input">
              <div className="coach-upload-icon">📤</div>
              <div className="coach-upload-text">Drag and drop files here</div>
              <div className="coach-upload-text">- OR -</div>
              <button className="coach-upload-browse-button">
                Browse Files
              </button>
              <input
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
              />
            </div>
            <div className="coach-upload-right-container">
              <select
                className="coach-upload-dropdown"
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
              <button className="coach-upload-button" onClick={handleUpload}>
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachUpload;
