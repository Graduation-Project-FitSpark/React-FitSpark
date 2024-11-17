import React from "react";
import "./Ibuttoninfobody.css";
import img1 from "../../img/Untitled 7-front.png";
import { Link } from "react-router-dom";

function IButtonInfoBody() {
  return (
    <div className="container1">
      <div className="container1-outer">
        <div className="info-section">
          <p className="title">Hi, I’m Emily</p>
          <p className="subtitle">
            Certified Fitness Trainer and Personal Coach
          </p>
          <p className="description">
            I'm a paragraph. Click here to add your own text and edit me. It’s
            easy. Just click “Edit Text” or double-click me to add your own
            content and make changes to the font. I’m a great place for you to
            tell a story and let your users know a little more about you.
          </p>
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
