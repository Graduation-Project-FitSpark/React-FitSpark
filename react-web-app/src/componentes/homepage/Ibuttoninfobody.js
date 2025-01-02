import React from "react";
import "./Ibuttoninfobody.css";
import img1 from "../../img/man-3.png";
import { Link } from "react-router-dom";

function IButtonInfoBody() {
  return (
    <div className="container1">
      <div className="container1-outer">
        <div className="info-section">
          <p className="title">Hi, I’m Sam!</p>
          <p className="subtitle">If you were able to play...Let's start!</p>

          <Link to="/body" className="find-out-more2">
            → FIND OUT MORE
          </Link>
        </div>
        <div className="image-container">
          <img src={img1} className="macimage" alt="Trainer" />
        </div>
      </div>
    </div>
  );
}

export default IButtonInfoBody;
