import React, { useEffect, useState } from "react";
import "./Firstexercises.css";
import Navbarhomepage from "../../Navbarhomepage";
import { useLocation } from "react-router-dom";
import complet from "../../../../img/complet-rem.png";
const ArmTrain = () => {
  const location = useLocation();
  const { disname } = location.state || {};
  const { count } = location.state || {};
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!disname) {
      console.error("Error: Missing disname parameter");
    }
  }, [disname]);

  const startTracking = async () => {
    if (!disname) {
      alert("Exercise name is missing.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/${disname}`);
      const data = await response.json();
      console.log(data.message);
      setIsTracking(true);
    } catch (error) {
      console.error("Error starting tracking:", error);
      alert("Failed to start tracking. Please try again.");
    }
  };

  const stopTracking = async () => {
    try {
      const response = await fetch("http://localhost:5001/stop_exercise");
      const data = await response.json();
      console.log(data.message);
      setLeftCount(data.total_count / 2);
      setRightCount(data.total_count / 2);
      setTotalCount(data.total_count);
      setIsTracking(false);
    } catch (error) {
      console.error("Error stopping tracking:", error);
      alert("Failed to stop tracking. Please try again.");
    }
  };

  useEffect(() => {
    if (totalCount >= count) {
      setShowModal(true);
    }
    console.log(count);
    console.log(totalCount);
    console.log(showModal);
  }, [totalCount, count]);

  useEffect(() => {
    return () => {
      if (isTracking) {
        stopTracking().catch((error) =>
          console.error("Error during cleanup:", error)
        );
      }
    };
  }, [isTracking]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbarhomepage />

      <div className="arm-train-container">
        <div className="video-container">
          <img
            src="http://localhost:5001/video_feed"
            alt="Video Stream"
            className={isTracking ? "video-stream" : "hidden"}
          />
          {!isTracking && (
            <p className="placeholder-text">Click "Start Tracking" to begin.</p>
          )}
        </div>
        <div className="button-container">
          <button
            onClick={startTracking}
            disabled={isTracking}
            className="tracking-button start-button"
          >
            Start Tracking
          </button>
          <button
            onClick={stopTracking}
            disabled={!isTracking}
            className="tracking-button stop-button"
          >
            Stop Tracking
          </button>
          <div className="count-display">
            <p>Count: {totalCount}</p>
          </div>
        </div>

        {showModal && (
          <div className="modal-count-airbic">
            <div className="modal-airbic">
              <img
                src={complet}
                alt="Modal Content"
                className="modal-image-airbic"
              />
              <p className="modal-text-airbic">
                Congratulations you have completed the exercise to the fullest
                😊
              </p>
              <button
                onClick={closeModal}
                className="close-count-button-airbic"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArmTrain;
