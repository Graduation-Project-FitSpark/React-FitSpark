import React from "react";
import "./Requests.css";
import { useNavigate } from "react-router-dom";
import qizeimg from "../../../img/slider-1s.jpg";

import { IoChevronForwardOutline } from "react-icons/io5";

function Requests() {
  const navigate = useNavigate();
  return (
    <div
      className="container-requests"
      onClick={() => navigate("/RequesttrainingSpecialist")}
    >
      <div className="container-requests-inner">
        <div
          className="image-background"
          style={{ backgroundImage: `url(${qizeimg})` }}
        >
          <div className="text-container-outer">
            <div className="text-container-requst">
              <p className="title-text-requst">Training Requests</p>
            </div>
            <div className="container-button-text">
              <div className="fake-container"></div>
              <div className="button-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
