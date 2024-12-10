import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./AnalyticsSection.css";
import Navbarcoach from "../homepage/Navbarcoach";
const AnalyticsSection = () => {
  const [IDCoach, setIDCoach] = useState(10);

  const [trainerCoachData, setTrainerCoachData] = useState([
    { ID_Trainer: 1, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 3, ID_Coach: 10, Accepted: false },
    { ID_Trainer: 5, ID_Coach: 6, Accepted: true },
    { ID_Trainer: 7, ID_Coach: 8, Accepted: false },
    { ID_Trainer: 9, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 10, ID_Coach: 11, Accepted: false },
    { ID_Trainer: 12, ID_Coach: 10, Accepted: false },
    { ID_Trainer: 13, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 15, ID_Coach: 16, Accepted: false },
    { ID_Trainer: 17, ID_Coach: 18, Accepted: true },
    { ID_Trainer: 19, ID_Coach: 20, Accepted: false },
  ]);

  const [initialTableData, setInitialTableData] = useState([
    {
      ID_Trainer: 1,
      Points: 0,
      Username: "user_7737",
      Age: 30,
      Gender: "Male",
    },
    {
      ID_Trainer: 3,
      Points: 500,
      Username: "user_7733",
      Age: 25,
      Gender: "Female",
    },
    {
      ID_Trainer: 9,
      Points: 100,
      Username: "user_7737",
      Age: 35,
      Gender: "Male",
    },
  ]);

  const [fullTableDatacal, setFullTableData] = useState([
    { ID_Trainer: 1, Calories: 100, Day: "Monday" },
    { ID_Trainer: 1, Calories: 100, Day: "Thursday" },
    { ID_Trainer: 3, Calories: 100, Day: "Friday" },
    { ID_Trainer: 3, Calories: 200, Day: "Friday" },
  ]);

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

  const [filterCharCal, setFilterCharCal] = useState({
    labels: [],
    datasets: [
      {
        label: "Calories",
        data: [],
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  });

  const [ageData, setAgeData] = useState({
    labels: [],
    datasets: [],
  });

  const [genderData, setGenderData] = useState({
    labels: [],
    datasets: [],
  });

  const byPoint = (trainerCoachData, IDCoach, initialTableData) => {
    const trainers = trainerCoachData.filter(
      (train) => train.ID_Coach === IDCoach
    );

    const data = trainers.map((train) => {
      const user = initialTableData.find(
        (user) => user.ID_Trainer === train.ID_Trainer
      );
      return {
        Username: user?.Username || "Unknown",
        Points: user?.Points || 0,
      };
    });

    return {
      labels: data.map((item) => item.Username),
      datasets: [
        {
          label: "Points",
          data: data.map((item) => item.Points),
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };

  const byCal = (
    trainerCoachData,
    IDCoach,
    initialTableData,
    fullTableDatacal
  ) => {
    const trainers = trainerCoachData.filter(
      (train) => train.ID_Coach === IDCoach
    );

    const data = trainers.map((train) => {
      const calorieEntries = fullTableDatacal.filter(
        (entry) => entry.ID_Trainer === train.ID_Trainer
      );
      const totalCalories = calorieEntries.reduce(
        (sum, entry) => sum + entry.Calories,
        0
      );

      const user = initialTableData.find(
        (user) => user.ID_Trainer === train.ID_Trainer
      );
      return {
        Username: user?.Username || "Unknown",
        Calories: totalCalories,
      };
    });

    return {
      labels: data.map((item) => item.Username),
      datasets: [
        {
          label: "Calories",
          data: data.map((item) => item.Calories),
          backgroundColor: "rgba(153,102,255,0.4)",
          borderColor: "rgba(153,102,255,1)",
        },
      ],
    };
  };

  const byAge = (initialTableData) => {
    return {
      labels: initialTableData.map((trainer) => trainer.Username),
      datasets: [
        {
          label: "Age",
          data: initialTableData.map((trainer) => trainer.Age),
          backgroundColor: "rgba(255,206,86,0.4)",
          borderColor: "rgba(255,206,86,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const byGender = (initialTableData) => {
    const maleCount = initialTableData.filter(
      (trainer) => trainer.Gender === "Male"
    ).length;
    const femaleCount = initialTableData.filter(
      (trainer) => trainer.Gender === "Female"
    ).length;

    return {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [maleCount, femaleCount],
          backgroundColor: ["#bbf246", "#33333333"],
        },
      ],
    };
  };

  useEffect(() => {
    setFilterChar(byPoint(trainerCoachData, IDCoach, initialTableData));
    setFilterCharCal(
      byCal(trainerCoachData, IDCoach, initialTableData, fullTableDatacal)
    );
    setAgeData(byAge(initialTableData));
    setGenderData(byGender(initialTableData));
  }, [trainerCoachData, IDCoach, initialTableData, fullTableDatacal]);

  return (
    <div>
      <Navbarcoach />
      <div className="outeranalytics-container">
        <h1>Analysis Plan</h1>
        <div className="analytics-container">
          <div className="analytics-section">
            <h4>Age by Trainer</h4>
            <div className="analytics-chart">
              <Bar data={ageData} options={{ responsive: true }} />
            </div>
          </div>
          <div className="analytics-section">
            <h4>Gender Distribution</h4>
            <div className="analytics-pie-chart">
              <Pie data={genderData} options={{ responsive: true }} />
            </div>
          </div>
          <div className="analytics-section">
            <h4>Points by Trainer</h4>
            <div className="analytics-chart">
              <Bar data={filterChar} options={{ responsive: true }} />
            </div>
          </div>
          <div className="analytics-section">
            <h4>Calories by Trainer</h4>
            <div className="analytics-chart">
              <Bar data={filterCharCal} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
