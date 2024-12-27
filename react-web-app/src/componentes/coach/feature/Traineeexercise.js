import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format, addDays, subDays } from "date-fns";
import "./Traineeexercise.css";
import notraining from "../../../img/notraining.png";
import Navbarcoach from "../homepage/Navbarcoach";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import URL from "../../../enum/enum";
import { useNavigate } from "react-router-dom";
function TraineeExercise() {
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
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [itemStepsMin, setItemStepsMin] = useState("");
  const [filteredPlan, setFilteredPlan] = useState([]);

  const formattedDate = useMemo(() => {
    return today.toLocaleDateString("en-US", { weekday: "long" });
  }, [today]);
  const save = async () => {
    try {
      console.log(ID_Trainer);
      const response = await fetch(`${URL}/editTrainerTrains`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trainerId: ID_Trainer, trineday: trainedDays }),
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
  };
  const [todayPlan, settodayPlan] = useState([]);

  const [trainedDays, setTrainedDays] = useState([]);

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
    const fetchWorks = async () => {
      try {
        const response = await axios.post(`${URL}/getWorks`);
        const works = response.data;
        const trainerResponse = await fetch(`${URL}/getOriginalTrainerTrains`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trainerId: ID_Trainer }),
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
        setTrainedDays(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    const matchingTrains = trainedDays
      .filter((train) => train.Day_Of_Week === formattedDate)
      .map((train) => ({ id: train.ID_Trains }));

    const matchingPlan = todayPlan
      .filter((plan) => matchingTrains.some((train) => plan.id === train.id))
      .map((plan) => {
        const train = trainedDays.find(
          (train) =>
            train.ID_Trains === plan.id && train.Day_Of_Week === formattedDate
        );
        return { ...plan, Steps: train.Steps, day: train.Day_Of_Week };
      });

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

    const matchingTrains = trainedDays
      .filter((train) => train.Day_Of_Week === selectedDay.Day_Of_Week)
      .map((train) => ({ id: train.ID_Trains }));

    const matchingPlan = todayPlan
      .filter((plan) => matchingTrains.some((train) => plan.id === train.id))
      .map((plan) => {
        const train = trainedDays.find(
          (train) =>
            train.ID_Trains === plan.id &&
            train.Day_Of_Week === selectedDay.Day_Of_Week
        );
        return { ...plan, Steps: train.Steps, day: train.Day_Of_Week };
      });

    setFilteredPlan(matchingPlan);
  };

  const addExercise = () => {
    if (!selectedExercise || !itemStepsMin) {
      alert("Please select an exercise and enter steps!");
      return;
    }

    const exerciseExistsInPlan = filteredPlan.some(
      (exercise) => exercise.id === selectedExercise.id
    );

    if (exerciseExistsInPlan) {
      alert("This exercise already exists in the plan!");
      return;
    }

    const selectedDay =
      data.find((item) => item.isSelected)?.Day_Of_Week || null;

    if (!selectedDay) {
      alert("Please select a day first!");
      return;
    }

    const duplicateFound = trainedDays.some(
      (existing) =>
        existing.ID_Trains === selectedExercise.id &&
        existing.Day_Of_Week === selectedDay
    );

    if (duplicateFound) {
      alert("This exercise is already added for the selected day!");
      return;
    }

    const newExercise = {
      ...selectedExercise,
      Steps: parseInt(itemStepsMin, 10),
    };
    setFilteredPlan([...filteredPlan, newExercise]);

    const newEntry = {
      ID_Trains: selectedExercise.id,
      ID_Trainer: ID_Trainer,
      Day_Of_Week: selectedDay,
      Steps: parseInt(itemStepsMin, 10),
    };
    setTrainedDays([...trainedDays, newEntry]);

    alert("Exercise added successfully!");
    setSelectedExercise(null);
    setItemStepsMin("");
    setModalVisible(false);
  };
  const remove = (ex) => {
    const newar1 = trainedDays.filter(
      (train) => !(train.ID_Trains === ex.id && train.Day_Of_Week === ex.day)
    );
    setTrainedDays(newar1);
    const newar2 = filteredPlan.filter((plan) => plan.id !== ex.id);
    setFilteredPlan(newar2);
  };

  const increaseCount = (item) => {
    setTrainedDays((prevTrineday) =>
      prevTrineday.map((train) =>
        train.ID_Trains === item.id && train.Day_Of_Week === item.day
          ? { ...train, Steps: train.Steps + 1 }
          : train
      )
    );

    setFilteredPlan((prevFilteredPlan) =>
      prevFilteredPlan.map((plan) =>
        plan.id === item.id ? { ...plan, Steps: plan.Steps + 1 } : plan
      )
    );
  };
  const decreaseCount = (item) => {
    setTrainedDays((prevTrineday) =>
      prevTrineday.map((train) =>
        train.ID_Trains === item.id && train.Day_Of_Week === item.day
          ? { ...train, Steps: Math.max(0, train.Steps - 1) }
          : train
      )
    );

    setFilteredPlan((prevFilteredPlan) =>
      prevFilteredPlan.map((plan) =>
        plan.id === item.id
          ? { ...plan, Steps: Math.max(0, plan.Steps - 1) }
          : plan
      )
    );
  };
  return (
    <div>
      <Navbarcoach />
      <div className="container-5">
        <div className="header-5">
          <h1>Trainer Plan</h1>
        </div>

        <div className="trainer-info">
          <img src={img} alt="Trainer" className="trainer-img" />
          <div>
            <h2>{name}</h2>
            <p>Age: {Age}</p>
          </div>
        </div>
        <div className="scroll-container">
          {data.map((item, index) => (
            <div
              key={index}
              className={`day-container ${
                item.isSelected ? "selected-day" : ""
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
            </div>
          ))}
        </div>

        <div className="plan-container">
          <div className="save-add">
            <div className="add-exercise-container">
              <h2>Add Exercise</h2>
              <select
                value={selectedExercise?.id || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selected = todayPlan.find(
                    (exercise) => exercise.id === selectedId
                  );
                  setSelectedExercise(selected);
                }}
              >
                <option value={selectedExercise}>Select Exercise</option>
                {todayPlan.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Steps"
                value={itemStepsMin}
                onChange={(e) => setItemStepsMin(e.target.value)}
              />
              <button onClick={addExercise}>Add Exercise</button>
            </div>
            <button onClick={save} className="save">
              Save Changes
            </button>
          </div>

          <div className="title-add">
            <h2>Today's Plan</h2>

            {filteredPlan.length > 0 ? (
              filteredPlan.map((exercise) => (
                <div key={exercise.id} className="exercise-card">
                  <div className="INFO">
                    <img src={exercise.imageUrl} alt={exercise.name} />
                    <div>
                      <h3 className="titleex">{exercise.name}</h3>
                      <p className="descex">{exercise.description}</p>
                      <div className="Steps-style">
                        <button
                          className="boutton-inc-dec"
                          onClick={() => increaseCount(exercise)}
                        >
                          <AddIcon />
                        </button>
                        <span className="plus">{exercise.Steps}</span>
                        <button
                          className="boutton-inc-dec"
                          onClick={() => decreaseCount(exercise)}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(exercise)}
                      className="boutton-remov-exercise"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <img
                  src={notraining}
                  alt={"exercise.name"}
                  className="imgnottring"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraineeExercise;
