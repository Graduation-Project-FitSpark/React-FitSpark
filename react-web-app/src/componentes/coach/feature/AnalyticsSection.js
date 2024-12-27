import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./AnalyticsSection.css";
import Navbarcoach from "../homepage/Navbarcoach";
import URL from "../../../enum/enum";
import axios from "axios";
const AnalyticsSection = () => {
  const [IDCoach, setIDCoach] = useState(0);

  const [trainerCoachData, setTrainerCoachData] = useState([]);

  const [initialTableData, setInitialTableData] = useState([]);

  const [fullTableDatacal, setFullTableData] = useState([]);

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
    const fetchCoachDetails = async () => {
      try {
        const username = localStorage.getItem("username");
        const ID = localStorage.getItem("ID");
        setIDCoach(ID);

        const response1 = await fetch(`${URL}/getTrainerSpecificDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
        const data1 = await response1.json();
        setInitialTableData(data1);
        const response2 = await fetch(`${URL}/getTrainerCoach`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
        const data2 = await response2.json();
        setTrainerCoachData(data2);
        const response3 = await fetch(`${URL}/getTrainerClorieDetails`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response3.ok) throw new Error(`Failed: ${response3.status}`);
        const data3 = await response3.json();
        setFullTableData(data3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCoachDetails();
  }, []);
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
