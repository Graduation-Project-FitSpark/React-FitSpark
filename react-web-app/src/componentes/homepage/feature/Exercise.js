import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@mdi/react";
import "./Exercise.css";
import Navbarhomepage from "./../Navbarhomepage";
import {
  mdiChevronLeft,
  mdiClockOutline,
  mdiFire,
  mdiMusicNoteOutline,
  mdiHeartOutline,
} from "@mdi/js";

function Exercise() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name, description, goal, progress, imageUrl, videolink, cal } =
    location.state || {};

  return (
    <div className="exercise-page">
      <Navbarhomepage />
      <div className="exercise-content-container">
        <div className="exercise-video-section">
          <div>
            <div className="exercise-video-container">
              <img src={imageUrl} alt={name} className="exercise-image" />
              <div className="exercise-details-overlay">
                <div className="exercise-detail-item">
                  <div className="exercise-icon-container">
                    <Icon path={mdiClockOutline} size={1.5} color="#000" />
                  </div>
                  <div className="exercise-text-container">
                    <p className="exercise-label-text">Time</p>
                    <p className="exercise-value-text">{progress} min</p>
                  </div>
                </div>
                <div className="exercise-divider" />
                <div className="exercise-detail-item">
                  <div className="exercise-icon-container">
                    <Icon path={mdiFire} size={1.5} color="#000" />
                  </div>
                  <div className="exercise-text-container">
                    <p className="exercise-label-text">Burn</p>
                    <p className="exercise-value-text">{cal * goal} kcal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="exercise-card-background">
            <h2 className="exercise-heading">{name}</h2>
            <p className="exercise-description">{description}</p>
          </div>
        </div>
      </div>

      <div className="exercise-footer">
        <Icon path={mdiMusicNoteOutline} size={1.5} color="#ffffff" />
        <button
          className="exercise-start-button"
          onClick={() =>
            navigate("/Counttostart", { state: { videolink, cal } })
          }
        >
          <span className="exercise-start-text">Start</span>
        </button>
        <Icon path={mdiHeartOutline} size={1.5} color="#ffffff" />
      </div>
    </div>
  );
}

export default Exercise;
