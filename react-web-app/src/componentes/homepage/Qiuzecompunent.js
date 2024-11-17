import React from "react";
import "./Qiuzecompunent.css"; // Optional: Add this for custom styles
import img from "../../img/man-2.jpg";
function Qiuzecompunent() {
  return (
    <div>
      <div className="fitness-section">
        <div className="fitness-image">
          <img src={img} alt="Fitness" />
        </div>
        <div className="fitness-content">
          <h1>WE ARE SQUAT</h1>
          <h2>HERE IS WHO WE ARE</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <a href="#more" className="find-out-more">
            → FIND OUT MORE
          </a>
        </div>
      </div>
    </div>
  );
}

export default Qiuzecompunent;
