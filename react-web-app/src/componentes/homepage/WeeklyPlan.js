import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Navbarhomepage from "./Navbarhomepage";
import URL from "../../enum/enum";
import axios from "axios";
const WeeklyPlan = () => {
  const [idtrinee, setIdTrainee] = useState("");
  const [bmi, setBmi] = useState(0);
  const [bmr, setbmr] = useState(0);
  const [genderData, setGenderData] = useState({
    labels: [],
    datasets: [],
  });

  const [initialTableData, setInitialTableData] = useState([]);

  const [fullTableDatacal, setfullTableDatacal] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const id = localStorage.getItem("ID");
        setIdTrainee(id);
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setInitialTableData(data);

        const response2 = await fetch(`${URL}/getTrainerClorieDetails`);

        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setfullTableDatacal(data2);
        console.log(initialTableData);
        console.log(fullTableDatacal);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };
    fetchUsers();
  }, []);
  const [filterChar, setFilterChar] = useState({
    labels: [],
    datasets: [
      {
        label: "Points",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  const byPoint = () => {
    const groupedData = fullTableDatacal.reduce((acc, item) => {
      if (item.ID_Trainer === idtrinee) {
        if (!acc[item.Day]) {
          acc[item.Day] = 0;
        }
        acc[item.Day] += item.Calories;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Calories",
          data: Object.values(groupedData),
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    const find = initialTableData.find((item) => item.ID_Trainer === idtrinee);
    if (find) {
      setBmi((find.Weight / (find.Height / 100) ** 2).toFixed(2));
    }

    const findbmr = initialTableData.find(
      (item) => item.ID_Trainer === idtrinee
    );
    if (findbmr) {
      const bmr =
        10 * findbmr.Weight +
        6.25 * findbmr.Height -
        5 * findbmr.Age +
        (findbmr.Gender === "Male" ? 5 : -161);

      setbmr(bmr.toFixed(2));
    }

    const findfatwater = initialTableData.find(
      (item) => item.ID_Trainer === idtrinee
    );

    if (findfatwater) {
      const water =
        findfatwater.Weight * (findfatwater.Gender === "Male" ? 0.6 : 0.5);
      const fat =
        1.2 * bmi +
        0.23 * findfatwater.Age -
        10.8 * (findfatwater.Gender === "Male" ? 1 : 0) -
        5.4;
      setGenderData({
        labels: ["Fat", "Water"],
        datasets: [
          {
            data: [fat, water],
            backgroundColor: ["#DAE174", "#8CDEBD"],
          },
        ],
      });
    }

    setFilterChar(byPoint());
  }, [idtrinee, bmi, fullTableDatacal, initialTableData]);

  return (
    <div>
      <Navbarhomepage />
      <div className="outeranalytics-container">
        <h1>Weekley Plan</h1>
        <div className="analytics-container">
          <div className="analytics-section">
            <h4>BMI</h4>
            <p>Your BMI is: {bmi}</p>
            <Box sx={{ width: "70%" }}>
              <LinearProgress
                variant="determinate"
                value={(bmi * 100) / 40}
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6EDB87",
                  },
                }}
              />
            </Box>

            <div>
              {bmi < 18.5 ? (
                <p>Category: Underweight</p>
              ) : bmi >= 18.5 && bmi <= 24.9 ? (
                <p>Category: Normal weight</p>
              ) : bmi >= 25 && bmi <= 29.9 ? (
                <p>Category: Overweight</p>
              ) : bmi >= 30 && bmi <= 34.9 ? (
                <p>Category: Obesity (Class I)</p>
              ) : bmi >= 35 && bmi <= 39.9 ? (
                <p>Category: Obesity (Class II)</p>
              ) : (
                <p>Category: Extreme Obesity (Class III)</p>
              )}
            </div>
          </div>

          <div className="analytics-section">
            <h4>BMR</h4>
            <p>Your BMR is: {bmr}</p>
            <Box sx={{ width: "70%" }}>
              <LinearProgress
                variant="determinate"
                value={(bmr * 100) / 3857}
                sx={{
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6EDB87",
                  },
                }}
              />
            </Box>

            <div>
              {bmr < 1200 ? (
                <p>Activity Level: Sedentary (little to no exercise)</p>
              ) : bmr >= 1200 && bmr <= 1400 ? (
                <p>
                  Activity Level: Lightly active (light exercise/sports 1–3
                  days/week)
                </p>
              ) : bmr > 1400 && bmr <= 1600 ? (
                <p>
                  Activity Level: Moderately active (moderate exercise/sports
                  3–5 days/week)
                </p>
              ) : bmr > 1600 && bmr <= 1800 ? (
                <p>
                  Activity Level: Very active (hard exercise/sports 6–7
                  days/week)
                </p>
              ) : (
                <p>
                  Activity Level: Extra active (very hard exercise/physical job)
                </p>
              )}
            </div>
          </div>
          <div className="analytics-section">
            <h4>Calories br Weekley</h4>
            <div className="analytics-chart">
              <Bar data={filterChar} options={{ responsive: true }} />
            </div>
          </div>
          <div className="analytics-section">
            <h4>Fat/Water</h4>
            <Pie data={genderData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlan;
