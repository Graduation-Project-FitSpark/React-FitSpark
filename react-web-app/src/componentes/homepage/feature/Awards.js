import React, { useState, useEffect } from "react";
import "./Awards.css";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbarhomepage from "./../Navbarhomepage";
import URL from "../../../enum/enum";
import axios from "axios";
const Award = ({ navigation }) => {
  const navigate = useNavigate();

  const [Awardspoint, setAwardspoint] = useState(0);
  const [Awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        try {
          const response = await axios.get(`${URL}/getAwards`);
          const awards = response.data.awards.map((item) => ({
            point: item.point,
            name: item.name,
            photo: item.photoUrl,
          }));
          setAwards(awards);
        } catch (error) {
          console.error("Error fetching awards:", error);
        }
        const trainerId = localStorage.getItem("ID");
        const response = await axios.post(`${URL}/getPoints`, {
          trainerId: trainerId,
        });
        if (response.status === 200) {
          setAwardspoint(response.data.points);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, []);

  const pointAwards = () => {
    const elements = [];

    for (let i = 0; i < Awards.length; i += 5) {
      const batch = Awards.slice(i, i + 5);

      elements.push(
        <div key={i} className="award-batch-container">
          {batch.map((item, index) => {
            const progress =
              Awardspoint >= item.point ? 1 : Awardspoint / item.point;

            return (
              <div key={index} className="award-card-wrapper">
                <div className="award-card">
                  <img
                    className={
                      Awardspoint >= item.point
                        ? "award-img-active"
                        : "award-img-inactive"
                    }
                    src={item.photo}
                    alt={item.name}
                  />
                  <div className="award-name">{item.name}</div>
                  <div className="award-points">
                    {Awardspoint + (item.point - Awardspoint)} of {item.point}
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
    <div className="awards-container">
      <Navbarhomepage />
      <div className="conthedout">
        <div className="awards-header">
          <div className="header-title-container">
            <h1 className="header-title">Awards</h1>
          </div>

          <div className="points-info">Your Points: {Awardspoint}</div>
        </div>

        <div className="awards-scroll">{pointAwards()}</div>
      </div>
    </div>
  );
};

export default Award;
