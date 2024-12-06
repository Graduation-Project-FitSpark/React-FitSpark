import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { LinearProgress, IconButton } from "@mui/material";
import "./Workout.css";
import Navbarhomepage from "./../Navbarhomepage";
import { useNavigate } from "react-router-dom";
import URL from "../../../enum/enum";
import axios from "axios";

function Workout() {
  const navigate = useNavigate();
  const [cal, setCal] = useState(0);
  const [steps, setSteps] = useState(0);
  const [meters, setMeters] = useState(0);
  const maxcal = 5;
  const maxsteps = 2000;
  const maxmeters = 1000;
  const howmuchvideoshow = 23;
  const MAXhowmuchvideoshow = 23;

  const today = new Date();
  const date = new Date();

  const percentagecal = (cal / maxcal) * 100;
  const percentagevideo = (howmuchvideoshow / MAXhowmuchvideoshow) * 100;
  const percentagesteps = (steps / maxsteps) * 100;
  const percentagemeters = (meters / maxmeters) * 100;

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [todayPlan, settodayPlan] = useState([]);
  const [trineday, settrineday] = useState([]);

  const [data, setData] = useState([
    {
      day: "S",
      date: format(subDays(today, today.getDay()), "dd"),
      isSelected: today.getDay() === 0,
      Day_Of_Week: "Sunday",
    },
    {
      day: "M",
      date: format(addDays(subDays(today, today.getDay()), 1), "dd"),
      isSelected: today.getDay() === 1,
      Day_Of_Week: "Monday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 2), "dd"),
      isSelected: today.getDay() === 2,
      Day_Of_Week: "Tuesday",
    },
    {
      day: "W",
      date: format(addDays(subDays(today, today.getDay()), 3), "dd"),
      isSelected: today.getDay() === 3,
      Day_Of_Week: "Wednesday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 4), "dd"),
      isSelected: today.getDay() === 4,
      Day_Of_Week: "Thursday",
    },
    {
      day: "F",
      date: format(addDays(subDays(today, today.getDay()), 5), "dd"),
      isSelected: today.getDay() === 5,
      Day_Of_Week: "Friday",
    },
    {
      day: "S",
      date: format(addDays(subDays(today, today.getDay()), 6), "dd"),
      isSelected: today.getDay() === 6,
      Day_Of_Week: "Saturday",
    },
  ]);

  const [filteredPlan, setFilteredPlan] = useState([]);

  useEffect(() => {
    const fetchTodayCalories = async () => {
      try {
        const ID = localStorage.getItem("ID");

        const response = await axios.post(`${URL}/getTodayCalories`, {
          trainerId: ID,
        });
        const { Calories, Steps, Distance } = response.data;

        setCal(Calories);
        setSteps(Steps);
        setMeters(Distance);
        console.log("Calories:", Calories);
        console.log("Steps:", Steps);
        console.log("Distance (Meters):", Distance);
      } catch (error) {
        console.error("Error fetching today's calories:", error);
      }
    };

    const fetchWorks = async () => {
      try {
        const ID = localStorage.getItem("ID");
        const response = await axios.post(`${URL}/getWorks`);
        const works = response.data;
        const trainerResponse = await fetch(`${URL}/getTrainerWorks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trainerId: ID }),
        });
        const result = await trainerResponse.json();
        const worksWithGoal = works.map((work) => {
          const trainerWork = result.find((day) =>
            day.ID_Trains.includes(work.id)
          );
          const goal = trainerWork
            ? trainerWork.Steps[trainerWork.ID_Trains.indexOf(work.id)]
            : 0;
          return {
            id: work.id,
            name: work.name,
            description: work.description,
            goal: goal,
            progress: Math.floor(Math.random() * 100),
            imageUrl: work.imageUrl,
            videolink: work.videolink,
            cal: work.cal,
          };
        });

        settodayPlan(worksWithGoal);
        settrineday(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchWorks();
    fetchTodayCalories();
  }, []);

  useEffect(() => {
    const matchingTrains = trineday
      .filter((train) => train.Day_Of_Week === formattedDate)
      .flatMap((train) => train.ID_Trains);

    const matchingPlan = todayPlan.filter((plan) =>
      matchingTrains.includes(plan.id)
    );

    setFilteredPlan(matchingPlan);
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === formattedDate
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
  }, [formattedDate, trineday, todayPlan]);

  const selectDay = (selectedDay) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === selectedDay.Day_Of_Week
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );

    const matchingTrains = trineday
      .filter((train) => train.Day_Of_Week === selectedDay.Day_Of_Week)
      .flatMap((train) => train.ID_Trains);

    const matchingPlan = todayPlan.filter((plan) =>
      matchingTrains.includes(plan.id)
    );

    setFilteredPlan(matchingPlan);
  };

  return (
    <div className="containerTreinarPlan">
      <Navbarhomepage />
      <div className="containerTreinarPlan-iner">
        <header className="header1">
          <h1>Treinar Plan</h1>
        </header>
        <section className="stats">
          <div className="stats-box-cal-outer">
            <div className="stats-box-cal">
              <div
                className="stats-box-cal-iner"
                style={{ backgroundColor: "#D8E6EC" }}
              >
                <h2>Calories</h2>
                <p>{cal} Cal</p>
                <div className="progress-container-trner ">
                  <div
                    className="progress-circle-1 progress-circle-2"
                    style={{
                      background: `conic-gradient(
                        #bbf246 ${percentagecal * 3.6}deg,
                        #fff ${percentagecal * 3.6}deg
                      )`,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="stats-box-cal-iner"
                style={{ backgroundColor: "#F9B9B9" }}
              >
                <h2>Calories</h2>
                <p>{cal} Cal</p>
                <div className="progress-container-trner ">
                  <div
                    className="progress-circle-1 progress-circle-3"
                    style={{
                      background: `conic-gradient(
                        #bbf246 ${percentagecal * 3.6}deg,
                        #fff ${percentagecal * 3.6}deg
                      )`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className="stats-box-trine"
              style={{ backgroundColor: "#EAECFF" }}
            >
              <h2>Treinar</h2>
              <p>
                {howmuchvideoshow}/{MAXhowmuchvideoshow}
              </p>
              <div className="progress-container-trner ">
                <div
                  className="progress-circle-1 progress-circle-4"
                  style={{
                    background: `conic-gradient(
                        #bbf246 ${percentagevideo * 3.6}deg,
                        #fff ${percentagevideo * 3.6}deg
                      )`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="stats-box-cal-outer">
            <div
              className="stats-box-Steps-Meters"
              style={{ backgroundColor: "#fff3e0" }}
            >
              <h2>Steps</h2>
              <p>
                {steps}/{maxsteps}
              </p>
              <div className="progress-container-trner ">
                <div
                  className="progress-circle-1 progress-circle-5"
                  style={{
                    background: `conic-gradient(
                        #bbf246 ${percentagesteps * 3.6}deg,
                        #fff ${percentagesteps * 3.6}deg
                      )`,
                  }}
                ></div>
              </div>
            </div>
            <div
              className="stats-box-Steps-Meters"
              style={{ backgroundColor: "#F0E7FC" }}
            >
              <h2>Meters</h2>
              <p>{meters} m</p>
              <div className="progress-container-trner ">
                <div
                  className="progress-circle-1 progress-circle-6"
                  style={{
                    background: `conic-gradient(
                        #bbf246 ${percentagemeters * 3.6}deg,
                        #fff ${percentagemeters * 3.6}deg
                      )`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        <div className="days">
          {data.map((item, index) => (
            <button
              key={index}
              className={`day ${item.isSelected ? "selected" : ""}`}
              onClick={() => selectDay(item)}
            >
              <span>{item.day}</span>
              <span>{item.date}</span>
            </button>
          ))}
        </div>
        <section className="plan">
          <h2>Today's Plan</h2>
          {filteredPlan.length > 0 ? (
            filteredPlan.map((planItem) => (
              <div
                className="exercise-card"
                key={planItem.id}
                onClick={() => navigate("/Exercise", { state: planItem })}
              >
                <img src={planItem.imageUrl} alt={planItem.name} />
                <div className="details">
                  <h3>{planItem.name}</h3>
                  <p>{planItem.goal}</p>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${planItem.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No training planned for today.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Workout;
