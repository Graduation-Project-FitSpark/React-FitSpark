import React from "react";
import Slidermotin from "./Slidermotin";
import Navbarhomepage from "./Navbarhomepage";
import Qiuzecompunent from "./Qiuzecompunent";
import Ibuttoninfobody from "./Ibuttoninfobody";
import Footer from "../Welcome_Screen/Footer";
import FAQ from "../Welcome_Screen/FAQcomponent-section";
import Notifications from "./Notifications";
import Body from "./Body";
function homepagetrinier() {
  return (
    <div>
      <Navbarhomepage></Navbarhomepage>
      <Notifications></Notifications>
      <Slidermotin></Slidermotin>
      <Qiuzecompunent></Qiuzecompunent>
      <Ibuttoninfobody></Ibuttoninfobody>
      <FAQ />

      <Footer></Footer>
    </div>
  );
}

export default homepagetrinier;
