import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import "./AnalyticsSectionSpecialist.css";
import { useLocation } from "react-router-dom";
import Navbarspecialist from "../homepage/Navbarspecialist";
import { useNavigate } from "react-router-dom";
import URL from "../../../enum/enum";
import axios from "axios";
const AnalyticsSectionSpecialist = () => {
  const location = useLocation();
  const { trainerDetails } = location.state || {};
  const {
    ID_Trainer,
    name = "Unknown",
    Age = "N/A",
    img = "",
  } = trainerDetails || {};

  const [initialTableData, setInitialTableData] = useState([]);

  const [fullTableData, setfullTableData] = useState([
    {
      ID_Trainer: 1,
      Calories: 100,
      Day: "Monday",
    },
  ]);

  const [filterChartData, setFilterChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const fetchSpecialistDetails = async () => {
      try {
        const username = localStorage.getItem("username");
        const ID = localStorage.getItem("ID");

        const response1 = await fetch(`${URL}/getTrainerSpecificDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
        const data1 = await response1.json();
        setInitialTableData(data1);
        const response3 = await fetch(`${URL}/getTrainerClorieDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response3.ok) throw new Error(`Failed: ${response3.status}`);
        const data3 = await response3.json();
        setfullTableData(data3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSpecialistDetails();
  }, []);

  const calculateChartData = useCallback(() => {
    const groupedData = fullTableData.reduce((acc, item) => {
      if (item.ID_Trainer === ID_Trainer) {
        if (!acc[item.Day]) {
          acc[item.Day] = 0;
        }
        acc[item.Day] += item.Calories;
      }
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Calories",
          data: Object.values(groupedData),
          backgroundColor: "#bbf246",
          hoverBackgroundColor: "#333333",
        },
      ],
    };

    setFilterChartData(chartData);
  }, [fullTableData, ID_Trainer]);

  useEffect(() => {
    calculateChartData();
  }, [calculateChartData]);

  const trainerInfo = initialTableData.find(
    (data) => data.ID_Trainer === ID_Trainer
  );

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const calculateBMR = (weight, height, gender, age) => {
    if (["Male", "male"].includes(gender)) {
      return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
    } else {
      return (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);
    }
  };

  return (
    <div className="analytics-container-food">
      <Navbarspecialist />
      <div className="analytics-container-food-iner">
        <div className="titlie-analytics">
          <p>Trainee Body Analysis</p>
        </div>
        <div className="user-info-outer">
          <div className="user-info">
            <img src={img} alt={name} className="user-image" />
            <div className="user-details">
              <p>Name: {name}</p>
              <p>Age: {Age}</p>
            </div>
          </div>
        </div>

        {trainerInfo && (
          <div className="info-grid">
            <div className="info-grid-iner">
              <div className="hw-a-style">
                <div className="Height-Weight-style">
                  {" "}
                  <div className="info-card-h-w">
                    <p>Height</p>
                    <p>{trainerInfo.Height} cm</p>
                  </div>
                  <div className="info-card-h-w">
                    <p>Weight</p>
                    <p>{trainerInfo.Weight} kg</p>
                  </div>
                </div>
                <div className="info-card-Activity">
                  <p>Activity Level</p>
                  <p>{trainerInfo.Activity_Level}</p>
                </div>
              </div>
              <div className="bmr-bmi-style">
                <div className="info-card">
                  <p>BMI</p>
                  <p>{calculateBMI(trainerInfo.Weight, trainerInfo.Height)}</p>
                </div>
                <div className="info-card">
                  <p>BMR</p>
                  <p>
                    {calculateBMR(
                      trainerInfo.Weight,
                      trainerInfo.Height,
                      trainerInfo.Gender,
                      Age
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="chart-section">
          {filterChartData.labels.length ? (
            <>
              <h2>Calories by Trainer / Weekly</h2>
              <Bar
                data={filterChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </>
          ) : (
            <p>No chart data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSectionSpecialist;
