import React from "react";
import "./Qiuzecompunent.css";
import img from "../../img/man-2.jpg";
function Qiuzecompunent() {
  return (
    // اذا كان اول مرة بنستخدم هاد الملف متعلق بالكويز اذا كبس عليه ببلش الكويز
    <div>
      <div className="fitness-section">
        <div className="fitness-image">
          <img src={img} alt="Fitness" />
        </div>
        <div className="fitness-content">
          <h1>WE LOVE MATH</h1>
          <h2>CHALLENGE YOUR SKILLS FITNESS</h2>
          <p>
            Math is the foundation of endless possibilities! Test your knowledge
            with our fun and challenging quizzes, designed to make you think
            critically and sharpen your problem-solving skills. Dive into the
            world of equations, shapes, numbers, and logic – where every problem
            has a solution waiting to be discovered.
          </p>
          <a href="#more" className="find-out-more">
            → START THE QUIZ
          </a>
        </div>
      </div>
    </div>
  );
}

export default Qiuzecompunent;
