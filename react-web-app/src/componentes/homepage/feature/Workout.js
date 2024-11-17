import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { LinearProgress, IconButton } from "@mui/material";
import "./Workout.css"; // Assuming the CSS file is named Workout.css
import Navbarhomepage from "./../Navbarhomepage";
import { useNavigate } from "react-router-dom";
function Workout() {
  const navigate = useNavigate();
  const cal = 5;
  const maxcal = 5;
  const steps = 99;
  const maxsteps = 2000;
  const meters = 23;
  const maxmeters = 40;

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

  const [todayPlan, settodayPlan] = useState([
    {
      id: 1,
      name: "Push Up",
      description:
        "The lower abdomen and hips are the most difficult areas of the body to reduce.",
      goal: "100 Push up a day",
      progress: 45,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSv8DHqz8RFaA8jEqtRODUG6o9WQktS0RX_Q&s",
      videolink:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      cal: 95,
    },
    {
      id: 2,
      name: "Sit Up",
      description: "Reduce weight, especially in the lower abdomen and hips.",
      goal: "20 Sit up a day",
      progress: 75,
      imageUrl: "https://via.placeholder.com/150",
      videolink:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      cal: 45,
    },
  ]);

  const [trineday] = useState([
    { ID_Trains: [1, 3], Day_Of_Week: "Monday" },
    { ID_Trains: [2], Day_Of_Week: "Tuesday" },
  ]);

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
  }, [formattedDate, todayPlan]);

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
