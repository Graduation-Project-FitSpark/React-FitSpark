import React from "react";

import Compinfo from "./Compinfo";
import Compimagefirstpb from "./Compimagefristpart-botton";
import Compbl from "./Compbottonleftfirstpage";

import "./partonepageone.css";

const Infoapp = () => {
  return (
    <div className="exp1-container">
      <div className="exp1-content">
        <div className="exp1-text">
          <Compinfo />
          <Compbl />
        </div>
        <div className="exp1-image">
          <Compimagefirstpb />
        </div>
      </div>
    </div>
  );
};

export default Infoapp;
