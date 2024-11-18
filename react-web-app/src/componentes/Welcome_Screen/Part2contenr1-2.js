import React from "react";
import "./Part2contenr1-2.css";

const AboutUsSection = () => {
  return (
    <div className="about-us-section">
      <div className="about-us-section-1">
        <hr />
        <h5 className="section-subtitle">About Us</h5>
      </div>
      <h2 className="section-title">
        We Help To Get The <br />
        Fitness Goals
      </h2>
      <p className="section-description">
        Forem ipsum dolor sit amet consectetur. Ornare risus etiam arcu tortor.
        Eicula justo at porttitor arcu quis. Viverra sed quis nisl sit neque.
      </p>
      <div className="section-buttons">
        <button className="btn-mission">Our Mission</button>
        <button className="btn-vision">Our Vision</button>
      </div>
    </div>
  );
};

export default AboutUsSection;
