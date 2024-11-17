import React, { useState, useEffect } from "react";
import "./Awards.css"; // Use a CSS file for styles
import { LinearProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img20 from "../../../img/point/20.png";
import img40 from "../../../img/point/40.png";
import img60 from "../../../img/point/60.png";
import img80 from "../../../img/point/80.png";
import img100 from "../../../img/point/100.png";
import img120 from "../../../img/point/120.png";
import img150 from "../../../img/point/150.png";
import img170 from "../../../img/point/170.png";
import img200 from "../../../img/point/200.png";
import img250 from "../../../img/point/250.png";
const Award = ({ navigation }) => {
  const navigate = useNavigate();

  const [Awardspoint, setAwardspoint] = useState(200);
  const [Awards, setAwards] = useState([
    {
      point: 20,
      photo: img20,
      name: "Fitness Titan",
    },
    {
      point: 40,
      photo: img40,
      name: "Strength Champion",
    },
    { point: 60, photo: img60, name: "Power Icon" },
    { point: 80, photo: img80, name: "Endurance Legend" },
    { point: 100, photo: img100, name: "Prime Athlete" },
    { point: 120, photo: img120, name: "Vitality Hero" },
    { point: 150, photo: img150, name: "Peak Performer" },
    { point: 170, photo: img170, name: "Muscle Maverick" },
    { point: 200, photo: img200, name: "Flex Master" },
  ]);

  useEffect(() => {
    const newAwards = {
      point: 250,
      photo: img250,
      name: "Core Conqueror",
    };

    setAwards((prevNotifications) => {
      const exists = prevNotifications.some(
        (notification) => notification.point === newAwards.point
      );
      if (!exists) {
        return [...prevNotifications, newAwards];
      }
      return prevNotifications;
    });
  }, []);

  const pointAwards = () => {
    const elements = [];

    for (let i = 0; i < Awards.length; i += 5) {
      const batch = Awards.slice(i, i + 5);

      elements.push(
        <div key={i} className="batchContainer">
          {batch.map((item, index) => {
            const progress =
              Awardspoint >= item.point ? 1 : Awardspoint / item.point;

            return (
              <div key={index} className="outer">
                <div className="outerItem">
                  <img
                    className={
                      Awardspoint >= item.point ? "pointImg" : "notPointImg"
                    }
                    src={item.photo}
                    alt={item.name}
                  />
                  <div className="namePoint">{item.name}</div>
                  <div className="pointOf">
                    {Awardspoint + (item.point - Awardspoint)}of {item.point}
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={progress * 100}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return elements;
  };

  return (
    <div className="container">
      <div className="header-1">
        <div className="inertHeader">
          <h1 className="textHeader">Awards</h1>
        </div>

        <div className="textPoint">Your Points: {Awardspoint}</div>
      </div>

      <div className="scrollContainer">{pointAwards()}</div>
    </div>
  );
};

export default Award;
