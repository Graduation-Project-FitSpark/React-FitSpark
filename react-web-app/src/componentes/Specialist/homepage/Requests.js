import React from "react";
import "./Requests.css";
import { useNavigate } from "react-router-dom";
import qizeimg from "../../../img/slider-1s.jpg";

import { IoChevronForwardOutline } from "react-icons/io5";

function Requests() {
  const navigate = useNavigate();

  return (
    <div className="container-requests">
      <div className="container-requests-inner">
        <div
          className="image-background"
          style={{ backgroundImage: `url(${qizeimg})` }}
        >
          <div className="text-container-outer">
            <div className="text-container-requst">
              <p className="title-text-requst">Training Requests</p>
              <p className="desi-text-requst">
                We are delighted to welcome you as part of our esteemed program.
                Your application has been reviewed, and we are confident that
                you will excel as an intern with us. This opportunity is
                designed to provide practical experience and professional
                growth, helping you develop the skills and knowledge required to
                succeed in your field. We look forward to supporting you
                throughout this journey and are excited to witness your
                contributions and progress. By clicking on the arrow, you can be
                directed to the intern applications that would like to intern
                with you.
              </p>
            </div>
            <div className="container-button-text">
              <div className="fake-container"></div>
              <div className="button-container">
                <button
                  className="button-textRequests"
                  onClick={() => navigate("/RequesttrainingSpecialist")}
                >
                  <IoChevronForwardOutline size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
