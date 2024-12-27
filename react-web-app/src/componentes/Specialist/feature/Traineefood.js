import React, { useState, useEffect, useCallback, useMemo } from "react";
import { format, addDays, subDays } from "date-fns";
import { useLocation } from "react-router-dom";
import notraining from "../../../img/junkfoodday.png";
import "./Traineefood.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Navbarspecialist from "../homepage/Navbarspecialist";
import axios from "axios";
import URL from "../../../enum/enum";
import { useNavigate } from "react-router-dom";
function TraineeFood() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trainerDetails } = location.state || {};
  const {
    ID_Trainer,
    name = "Unknown",
    Age = "N/A",
    img = "",
  } = trainerDetails || {};

  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [itemTime, setItemTime] = useState("");
  const [selectedtime, setselectedtime] = useState("");
  const formattedDate = useMemo(() => {
    return today.toLocaleDateString("en-US", { weekday: "long" });
  }, [today]);

  const save = async () => {
    {
      try {
        const response = await fetch(`${URL}/editTrainerFoods`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trainerId: ID_Trainer,
            trainerCoachData: trainerSpecialistData,
          }),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const result = await response.json();
        console.log("Server response:", result);
        navigate(-1);
      } catch (error) {
        console.error("Error updating trainer trains:", error);
      }
    }
  };
  const [filteredPlan, setFilteredPlan] = useState([]);
  const [foodData, setfoodData] = useState([]);
  const [trainerSpecialistData, settrainerSpecialistData] = useState([]);
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

  useEffect(() => {
    const fetchSpecialistDetails = async () => {
      try {
        const response1 = await fetch(`${URL}/getFoods`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
        const data1 = await response1.json();
        setfoodData(data1.foods);

        const response2 = await fetch(`${URL}/getTrainerWeekFoods`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ID_Trainer: ID_Trainer }),
        });

        if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
        const data2 = await response2.json();
        settrainerSpecialistData(data2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSpecialistDetails();
  }, []);

  useEffect(() => {
    console.log(selectedtime);
    const matchingTrains = trainerSpecialistData
      .filter(
        (train) =>
          train.Day_Of_Week === formattedDate && train.ID_Trainer === ID_Trainer
      )
      .map((train) => ({ id: train.ID_Food }));

    const matchingPlan = foodData
      .filter((plan) =>
        matchingTrains.some((train) => plan.ID_Food === train.id)
      )
      .map((plan) => {
        const train = trainerSpecialistData.find(
          (train) =>
            train.ID_Food === plan.ID_Food &&
            train.Day_Of_Week === formattedDate &&
            train.ID_Trainer === ID_Trainer
        );
        return { ...plan, Times: train.Times, day: train.Day_Of_Week };
      });

    setFilteredPlan(matchingPlan);

    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === formattedDate
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
    const timeselect = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return "Breakfast";
      } else if (currentHour >= 12 && currentHour < 18) {
        return "Lunch";
      } else {
        return "Dinner";
      }
    };
    setselectedtime(timeselect());
  }, [formattedDate, foodData, trainerSpecialistData]);

  const selectDay = (selectedDay) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === selectedDay.Day_Of_Week
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );

    const matchingTrains = trainerSpecialistData
      .filter(
        (train) =>
          train.Day_Of_Week === selectedDay.Day_Of_Week &&
          train.ID_Trainer === ID_Trainer
      )
      .map((train) => ({ id: train.ID_Food }));

    const matchingPlan = foodData
      .filter((plan) =>
        matchingTrains.some((train) => plan.ID_Food === train.id)
      )
      .map((plan) => {
        const train = trainerSpecialistData.find(
          (train) =>
            train.ID_Food === plan.ID_Food &&
            train.Day_Of_Week === selectedDay.Day_Of_Week &&
            train.ID_Trainer === ID_Trainer
        );
        return { ...plan, Times: train.Times, day: train.Day_Of_Week };
      });

    setFilteredPlan(matchingPlan);
  };

  const addMeal = () => {
    if (!selectedExercise || !itemTime) {
      alert("Please select a meal and time!");
      return;
    }

    const newEntry = {
      ID_Trainer,
      ID_Food: selectedExercise,
      Day_Of_Week: data.find((d) => d.isSelected)?.Day_Of_Week || "",
      Times: itemTime,
    };
    settrainerSpecialistData([...trainerSpecialistData, newEntry]);
    setFilteredPlan((prevFilteredPlan) => [
      ...prevFilteredPlan,
      {
        ...foodData.find((food) => food.ID_Food === newEntry.ID_Food),
        Times: newEntry.Times,
        day: newEntry.Day_Of_Week,
      },
    ]);

    setModalVisible(false);
    console.log(filteredPlan);
  };

  const remove = (ex) => {
    const newar1 = trainerSpecialistData.filter(
      (train) =>
        !(
          train.ID_Food === ex.ID_Food &&
          train.ID_Trainer === ID_Trainer &&
          train.Day_Of_Week === ex.day
        )
    );
    settrainerSpecialistData(newar1);
    const newar2 = filteredPlan.filter((plan) => plan.ID_Food !== ex.ID_Food);
    setFilteredPlan(newar2);
  };

  return (
    <div className="trainee-food-container">
      <Navbarspecialist />
      <div className="cont-food-outer">
        <div className="trainee-food-info-header">
          <div className="trainee-food-trainer-info">
            <img src={img} alt={name} className="trainee-food-trainer-img" />
            <div className="deltels-info">
              <h2>{name}</h2>
              <p>Age: {Age}</p>
            </div>
          </div>
          <div className="trainee-food-header">
            <h1>Trainer Plan</h1>
          </div>
        </div>

        <div className="trainee-food-days">
          {data.map((item, index) => (
            <button
              key={item.Day_Of_Week}
              className={`trainee-food-day ${
                item.isSelected ? "trainee-food-selected" : ""
              }`}
              onClick={() => selectDay(item)}
            >
              <div
                className={`day-text ${
                  item.isSelected ? "selected-day-text" : ""
                }`}
              >
                {item.day}
              </div>
              <div
                className={`date-text ${
                  item.isSelected ? "selected-day-text" : ""
                }`}
              >
                {item.date}
              </div>
            </button>
          ))}
        </div>
        <div className="trainee-food-plan">
          <div className="add-food">
            <div className="trainee-food-add-meals">
              <h3>Add New Meal</h3>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
              >
                <option value="">Select Meal</option>
                {foodData.map((food) => (
                  <option key={food.ID_Food} value={food.ID_Food}>
                    {food.Food_Name}
                  </option>
                ))}
              </select>
              <select
                value={itemTime}
                onChange={(e) => setItemTime(e.target.value)}
              >
                <option value="">Select Time</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <button onClick={addMeal}>Add</button>
            </div>
            <button onClick={save} className="save">
              Save Changes
            </button>
          </div>
          <div className="paln-food-day">
            <h2>Today's Meals:</h2>
            {filteredPlan.length > 0 ? (
              ["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                <div key={mealType}>
                  <p className="trainee-food-header">{mealType}</p>
                  {filteredPlan
                    .filter((planItem) => planItem.Times === mealType)
                    .map((planItem) => (
                      <div
                        key={planItem.ID_Food}
                        className="trainee-food-exercise-card"
                      >
                        <img
                          src={planItem.Img}
                          alt={planItem.Food_Name}
                          className="trainee-food-image"
                        />
                        <div className="trainee-food-details">
                          <h3 className="trainee-food-name">
                            {planItem.Food_Name}
                          </h3>
                          <div className="trainee-food-contdis">
                            <div className="trainee-food-detailcamin">
                              <WhatshotIcon />
                              <span className="trainee-food-dis">
                                {planItem.cal}
                              </span>
                            </div>
                            <div className="trainee-food-detailcamin">
                              <AccessTimeIcon />
                              <span className="trainee-food-dis">
                                {planItem.min}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => remove(planItem)}
                          className="boutton-remov"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <div className="trainee-food-container2">
                <div
                  className="trainee-food-image2"
                  style={{
                    backgroundImage: `url(${notraining})`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraineeFood;
