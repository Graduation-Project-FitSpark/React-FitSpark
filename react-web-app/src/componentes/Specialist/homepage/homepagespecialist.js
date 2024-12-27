import React from "react";
import Point from "./Pointtransfer";
import TitleName from "./TitleName";
import Navbarspecialist from "./Navbarspecialist";
import Requests from "./Requests";
import Messenger from "./Messenger";
import Notificationscoah from "./Notificationscoah";
import Footer from "../../Welcome_Screen/Footer";
import FAQ from "../../Welcome_Screen/FAQcomponent-section";
import "./homepagespecialist.css";
function homepage() {
  //
  return (
    <div>
      <Navbarspecialist />
      <Notificationscoah />
      <div className="title-point-name-requts">
        <TitleName />
        <Point />
        <Requests />
        <Messenger />
        <FAQ />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default homepage;
