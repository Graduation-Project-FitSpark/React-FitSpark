import AboutUsSection from "./Part2contenr1-2";

import "./Pageone.css";
import img from "../img/about-3.png";
const Part2contenr1 = () => {
  return (
    <div className="part2-container">
      <div>
        <AboutUsSection />
      </div>
      <div className="part2-container-1">
        <img src={img} alt="Fitness Model" className="about-image" />
      </div>
    </div>
  );
};

export default Part2contenr1;
