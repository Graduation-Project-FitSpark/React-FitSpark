import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import "./Foodplan.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faClock } from "@fortawesome/free-solid-svg-icons";
import Navbarhomepage from "./../Navbarhomepage";
import { useNavigate } from "react-router-dom";
const colors = ["#EDF7DB", "#DAF0F6", "#F4D8D4", "#F6EDD7"];
let trainerId = 1;

function Foodplan() {
  const navigate = useNavigate();
  const [food, setFood] = useState("");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [foodData, setFoodData] = useState([
    {
      id: 1,
      name: "Baked Sweet Potato",
      details: "A baked sweet potato seasoned with cinnamon.",
      img: "https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png",
      min: 20,
      cal: 500,
    },
    {
      id: 2,
      name: "Almond Butter Toast",
      details: "Almond butter spread on whole-grain toast.",
      img: "https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png",
      min: 15,
      cal: 350,
    },
    {
      id: 2,
      name: "Almond Butter Toast",
      details: "Almond butter spread on whole-grain toast.",
      img: "https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png",
      min: 15,
      cal: 350,
    },

    // Add more food items as needed...
  ]);

  const [mealPlan, setMealPlan] = useState([
    { idTrainer: 1, idFood: 1, dayOfWeek: "Monday", time: "Breakfast" },
    { idTrainer: 1, idFood: 2, dayOfWeek: "Monday", time: "Dinner" },
    // Add more meals as needed...
  ]);

  const [daysOfWeek, setDaysOfWeek] = useState([
    {
      day: "S",
      date: format(subDays(today, today.getDay()), "dd"),
      isSelected: today.getDay() === 0,
      dayOfWeek: "Sunday",
    },
    {
      day: "M",
      date: format(addDays(subDays(today, today.getDay()), 1), "dd"),
      isSelected: today.getDay() === 1,
      dayOfWeek: "Monday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 2), "dd"),
      isSelected: today.getDay() === 2,
      dayOfWeek: "Tuesday",
    },
    {
      day: "W",
      date: format(addDays(subDays(today, today.getDay()), 3), "dd"),
      isSelected: today.getDay() === 3,
      dayOfWeek: "Wednesday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 4), "dd"),
      isSelected: today.getDay() === 4,
      dayOfWeek: "Thursday",
    },
    {
      day: "F",
      date: format(addDays(subDays(today, today.getDay()), 5), "dd"),
      isSelected: today.getDay() === 5,
      dayOfWeek: "Friday",
    },
    {
      day: "S",
      date: format(addDays(subDays(today, today.getDay()), 6), "dd"),
      isSelected: today.getDay() === 6,
      dayOfWeek: "Saturday",
    },
  ]);

  useEffect(() => {
    if (selectedDate) {
      setDaysOfWeek((prevDays) =>
        prevDays.map((day) =>
          day.dayOfWeek === selectedDate
            ? { ...day, isSelected: true }
            : { ...day, isSelected: false }
        )
      );
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 3 && currentHour < 12) {
      setFood("Breakfast");
    } else if (currentHour >= 12 && currentHour < 18) {
      setFood("Lunch");
    } else {
      setFood("Dinner");
    }
  }, [selectedDate]);

  const selectDay = (selectedDay) => {
    setSelectedDate(selectedDay.dayOfWeek);
  };

  return (
    <div className="container-maels">
      <Navbarhomepage />
      <div className="container-maels-iner">
        <header className="header">
          <h1 className="title">Find The Best Food For You</h1>
        </header>
        <div className="scroll-container">
          {daysOfWeek.map((item) => (
            <button
              key={`${item.day}-${item.dayOfWeek}`}
              className={`day-container ${
                item.isSelected ? "selected-day" : ""
              }`}
              onClick={() => selectDay(item)}
            >
              <span className="day-text">{item.day}</span>
              <span
                className={`date-text ${
                  item.isSelected ? "text-selected-day" : ""
                }`}
              >
                {item.date}
              </span>
            </button>
          ))}
        </div>
        <div className="main-picker">
          <label htmlFor="meal-picker" className="meal-picker-title">
            Main Meal:
          </label>
          <select
            id="meal-picker"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="meal-picker"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div className="main-meal-container">
          {mealPlan
            .filter(
              (item) =>
                trainerId === item.idTrainer &&
                food === item.time &&
                daysOfWeek.find(
                  (day) => day.isSelected && day.dayOfWeek === item.dayOfWeek
                )
            )
            .map((item) => {
              const foodItem = foodData.find((food) => food.id === item.idFood);
              return (
                foodItem && (
                  <div
                    key={foodItem.id}
                    className="main-meal"
                    onClick={() =>
                      navigate("/Detelsfoode", { state: foodItem })
                    }
                  >
                    <img
                      src={foodItem.img}
                      alt={foodItem.name}
                      className="imagemainmaels"
                    />
                    <h2>{foodItem.name}</h2>

                    <div className="mincal">
                      <div>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{foodItem.min} min</span>
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faFire} />
                        <span>{foodItem.cal} Cal</span>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </div>

        <h2 className="section-title">Appetizers:</h2>
        <div className="appetizer-list">
          {foodData.map((item, index) => (
            <div
              key={item.id}
              className="food-item"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>

              <div>
                <div className="mincal">
                  <div>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{item.min} min</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faFire} />
                    <span>{item.cal} Cal</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Foodplan;
