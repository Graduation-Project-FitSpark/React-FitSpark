import React from "react";
import Navbaradmin from "./Navbaradmin";
import TitleName from "./TitleName";
import Userstatistics from "./Userstatistics";
import Userstable from "./Userstable";

import "./Homescreen.css";

import Footer from "../../Welcome_Screen/Footer";
function Homescreen() {
  return (
    <div>
      <Navbaradmin />
      <div className="title-point-name-requts">
        <TitleName></TitleName>
        <Userstatistics></Userstatistics>
        <Userstable></Userstable>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Homescreen;
