import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StartExercise.css";

function StartExercise() {
  const navigate = useNavigate();
  const location = useLocation();
  const { videolink, cal } = location.state || {};

  const video = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const updateProgress = setInterval(() => {
      if (video.current) {
        setPosition(video.current.currentTime * 1000);
        setDuration(video.current.duration * 1000);
        if (time === 0 && video.current.duration) {
          setTime(Math.floor(video.current.duration));
        }
      }
    }, 1000);

    return () => clearInterval(updateProgress);
  }, [time]);

  useEffect(() => {
    if (time > 0) {
      const countdownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [time]);

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
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
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
          <p className="start-exercise-main-timer">{formatTime(time * 1000)}</p>
          <div className="start-exercise-timer-info">
            <div className="start-exercise-timer-values">
              <p className="start-exercise-time-text">{formatTime(duration)}</p>
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
