import React from "react";
import "./Gotosectiontrine.css";
import img from "../../img/man-4.jpg";
function Gotosectiontrine() {
  return (
    //هاد الملف متعلق بالتمرين واذا كان مش اول مرة بستخدم البرنامج  اذا كبس عليه ببلش
    <div>
      <div className="fitness-section">
        <div className="fitness-image">
          <img src={img} alt="Fitness" />
        </div>
        <div className="fitness-content">
          <h1>WE ARE SQUAT</h1>
          <h2>OUR FORMULA FOR SUCCESS FITNESS </h2>
          <p>
            As in any equation, precision defines outcomes. Our journey is
            modeled on the principle that balance, logic, and iterative
            refinement lead to success. Like a theorem proved over time, our
            values are grounded in clarity, discipline, and calculated progress.
            Challenges are variables, solutions are constants, and every result
            adds to our proof of concept.
          </p>
          <a href="#more" className="find-out-more">
            → START YOUR DAY NOW
          </a>
        </div>
      </div>
    </div>
  );
}

export default Gotosectiontrine;
