import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./StartExercise.css";
import URL from "../../../enum/enum";
function StartExercise() {
  const navigate = useNavigate();
  const location = useLocation();
  const { videolink = "", cal = 0 } = location.state || {};

  const video = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0); // Remaining time
  const [pointsIncremented, setPointsIncremented] = useState(false); // Track points increment status

  useEffect(() => {
    const updateProgress = setInterval(() => {
      if (video.current) {
        const currentPosition = video.current.currentTime * 1000; // Convert to milliseconds
        const videoDuration = video.current.duration * 1000; // Convert to milliseconds

        setPosition(currentPosition);
        setDuration(videoDuration);

        if (videoDuration > 0) {
          const remainingTime = Math.floor(
            (videoDuration - currentPosition) / 1000
          );
          setTime(remainingTime);
        }

        if (
          currentPosition >= videoDuration &&
          videoDuration > 0 &&
          !pointsIncremented
        ) {
          setPointsIncremented(true);
          handleVideoWatched(); // Call the function when the video ends
        }
      }
    }, 1000);

    return () => clearInterval(updateProgress); // Cleanup the interval when component unmounts
  }, [pointsIncremented]);

  // Function to handle video watched and update points
  const handleVideoWatched = async () => {
    try {
      const trainerId = localStorage.getItem("ID");

      await axios.post(`${URL}/updatePoints`, {
        trainerId: trainerId,
        pointsToAdd: 2,
      });

      await axios.post(`${URL}/updateWatched`, {
        trainerId: trainerId,
      });
    } catch (error) {
      console.error("Error updating points or watched videos:", error);
    }
  };

  const togglePlayPause = () => {
    if (video.current) {
      if (isPlaying) {
        video.current.pause();
      } else {
        video.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (video.current) {
      video.current.currentTime = Math.max(video.current.currentTime - 10, 0);
    }
  };

  const handleFastForward = () => {
    if (video.current) {
      video.current.currentTime = Math.min(
        video.current.currentTime + 10,
        video.current.duration
      );
    }
  };

  const onSliderValueChange = (value) => {
    if (video.current) {
      video.current.currentTime = value / 1000;
      setPosition(value);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const percentageCompleted = duration
    ? ((position / duration) * 100).toFixed(0)
    : 0;

  return (
    <div className="start-exercise-container">
      <div className="start-exercise-header">
        <div className="start-exercise-calories">
          <span>KCAL BURNED</span>
          <div className="start-exercise-calories-value">
            <span className="start-exercise-calories-text">{cal}</span>
            <i className="start-exercise-icon-fire">🔥</i>
          </div>
        </div>
        <button
          className="start-exercise-close-button"
          onClick={() => navigate(-2)}
        >
          ✖
        </button>
      </div>

      <div className="start-exercise-video-section">
        <video
          ref={video}
          src={videolink}
          className="start-exercise-video"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      <div className="start-exercise-controls">
        <div className="start-exercise-timer-section">
          <p className="start-exercise-main-timer">{formatTime(time)}</p>{" "}
          {/* Display remaining time */}
          <div className="start-exercise-timer-info">
            <div className="start-exercise-timer-values">
              <p className="start-exercise-time-text">
                {formatTime(duration / 1000)}
              </p>{" "}
              {/* Total duration */}
              <p className="start-exercise-percentage-text">
                {percentageCompleted}%
              </p>
            </div>
            <div className="start-exercise-labels">
              <p className="start-exercise-label-text">TOTAL TIME</p>
              <p className="start-exercise-label-text">COMPLETED</p>
            </div>
          </div>
        </div>
        <input
          type="range"
          className="start-exercise-slider"
          min="0"
          max={duration}
          value={position}
          onChange={(e) => onSliderValueChange(e.target.value)}
        />
        <div className="start-exercise-buttons">
          <button
            onClick={handleRewind}
            className="start-exercise-control-button"
          >
            Prev
          </button>
          <button
            onClick={togglePlayPause}
            className="start-exercise-play-pause-button"
          >
            {isPlaying ? "| |" : "▶"}
          </button>
          <button
            onClick={handleFastForward}
            className="start-exercise-control-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartExercise;
