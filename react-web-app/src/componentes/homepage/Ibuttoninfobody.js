import React from "react";
import "./Ibuttoninfobody.css";
import img1 from "../../img/man-3.png";
import { Link } from "react-router-dom";

function IButtonInfoBody() {
  return (
    <div className="container1">
      <div className="container1-outer">
        <div className="info-section">
          <p className="title">Aerobic Exercise</p>
          <p className="subtitle">
            Aerobic exercises, like jogging, cycling, and swimming, boost heart
            health, improve stamina, and enhance blood circulation. They help
            manage weight, reduce stress, and lower the risk of chronic
            diseases. Regular practice promotes physical and mental well-being
            for a healthier lifestyle.
          </p>

          <Link to="/Aerobicexercises" className="find-out-more2">
            → FIND OUT MORE
          </Link>
        </div>
        <div className="image-container">
          <img
            src="https://media.gettyimages.com/id/1411618757/video/burning-calories-and-increasing-endurance-fit-young-man-exercising-on-a-exercising-bike-in-a.jpg?s=640x640&k=20&c=k4OUmt4JHTktsHYa9CPQjbLq8XFKLhVc1vdclG2SVws="
            className="macimage"
            alt="Trainer"
          />
        </div>
      </div>
    </div>
  );
}

export default IButtonInfoBody;
