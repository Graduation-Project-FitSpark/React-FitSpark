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
    <div className="outer">
      <Navbarhomepage />
      <div className="container">
        <div className="rootcontnervideo">
          <div>
            <div className="videocontner">
              <img src={imageUrl} alt={name} className="image1" />
              <div className="Detail">
                <div className="Detailiner">
                  <div className="iconback">
                    <Icon path={mdiClockOutline} size={1.5} color="#000" />
                  </div>
                  <div className="textContainer">
                    <p className="labelText">Time</p>
                    <p className="valueText">{progress} min</p>
                  </div>
                </div>
                <div className="line" />
                <div className="Detailiner">
                  <div className="iconback">
                    <Icon path={mdiFire} size={1.5} color="#000" />
                  </div>
                  <div className="textContainer">
                    <p className="labelText">Burn</p>
                    <p className="valueText">{cal} kcal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cardBackground">
            <h2 className="headingText">{name}</h2>
            <p className="bodyText">{description}</p>
          </div>
        </div>
      </div>

      <div className="footer-1">
        <Icon path={mdiMusicNoteOutline} size={1.5} color="#ffffff" />
        <button
          className="startButton"
          onClick={() =>
            navigate("/Counttostart", { state: { videolink, cal } })
          }
        >
          <span className="startText">Start</span>
        </button>
        <Icon path={mdiHeartOutline} size={1.5} color="#ffffff" />
      </div>
    </div>
  );
}

export default Exercise;
