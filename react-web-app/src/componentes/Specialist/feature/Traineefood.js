import React, { useState, useEffect, useCallback, useMemo } from "react";
import { format, addDays, subDays } from "date-fns";
import { useLocation } from "react-router-dom";
import notraining from "../../../img/junkfoodday.png";
import "./Traineefood.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Navbarspecialist from "../homepage/Navbarspecialist";
function TraineeFood() {
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

  const save = () => {
    console.log(trainerSpecialistData);
    //عشان انا خليت الداتا الي في trineday وبتبدلها مكان trinedayهون بتاخذ
    //الي بالكود هون  trineday الي بداتا بيس وحط مكانها trineday نفسها بس ظاف عليها فا الداتا القديمة ما تعدلت فا امسح الي في trineday الي في الداتا بيس
  };
  const [filteredPlan, setFilteredPlan] = useState([]);
  const [foodData, setfoodData] = useState([
    {
      ID_Food: 1,
      Food_Name: "Grilled Chicken",
      Details: "A simple grilled chicken breast with herbs.",
      Img: "http://example.com/image1.jpg",
      cal: 165,
      min: 15,
      ingredient_ids: [1, 34, 35],
    },
    {
      ID_Food: 10,
      Food_Name: "Tofu Stir-Fry",
      Details: "Tofu stir-fried with bell peppers and onions.",
      Img: "https://media.istockphoto.com/id/1291750007/vector/takeaway-food-symbol-take-away-paper-food-bag-icon-daily-meal-in-paper-bag-vector.jpg?s=612x612&w=0&k=20&c=LZtxpCqVZfB1-qNAXFBWCHoJvwzbozGwwRur605NLK8=",
      cal: 250,
      min: 10,
      ingredient_ids: [2, 34, 12, 36],
    },
    {
      ID_Food: 11,
      Food_Name: "Baked Sweet Potato",
      Details: "A baked sweet potato topped with cinnamon.",
      Img: "http://example.com/image11.jpg",
      cal: 103,
      min: 50,
      ingredient_ids: [3, 34],
    },
    {
      ID_Food: 12,
      Food_Name: "Almond Butter Toast",
      Details: "A slice of whole-grain toast with almond butter.",
      Img: "http://example.com/image12.jpg",
      cal: 200,
      min: 3,
      ingredient_ids: [4, 5],
    },
    {
      ID_Food: 13,
      Food_Name: "Brown Rice",
      Details: "Steamed brown rice served with vegetables.",
      Img: "http://example.com/image13.jpg",
      cal: 215,
      min: 20,
      ingredient_ids: [6, 34],
    },
    {
      ID_Food: 14,
      Food_Name: "Spinach Salad",
      Details: "Fresh spinach leaves topped with cherry tomatoes.",
      Img: "http://example.com/image14.jpg",
      cal: 50,
      min: 5,
      ingredient_ids: [7, 34, 36],
    },
    {
      ID_Food: 15,
      Food_Name: "Baked Chicken Thighs",
      Details: "Oven-baked chicken thighs seasoned with herbs.",
      Img: "http://example.com/image15.jpg",
      cal: 230,
      min: 30,
      ingredient_ids: [8, 34],
    },
    {
      ID_Food: 16,
      Food_Name: "Turkey Wrap",
      Details: "Whole grain wrap filled with turkey and lettuce.",
      Img: "http://example.com/image16.jpg",
      cal: 200,
      min: 20,
      ingredient_ids: [9, 20, 7, 36],
    },
    {
      ID_Food: 17,
      Food_Name: "Cottage Cheese",
      Details: "Low-fat cottage cheese served with fruit.",
      Img: "http://example.com/image17.jpg",
      cal: 120,
      min: 3,
      ingredient_ids: [10],
    },
    {
      ID_Food: 18,
      Food_Name: "Lentil Soup",
      Details: "Hearty lentil soup cooked with vegetables.",
      Img: "http://example.com/image18.jpg",
      cal: 180,
      min: 25,
      ingredient_ids: [11, 36, 35, 34],
    },
    {
      ID_Food: 19,
      Food_Name: "Grilled Asparagus",
      Details: "Grilled asparagus drizzled with olive oil.",
      Img: "http://example.com/image19.jpg",
      cal: 50,
      min: 5,
      ingredient_ids: [12, 34],
    },
    {
      ID_Food: 20,
      Food_Name: "Oatmeal",
      Details: "Healthy oatmeal cooked with almond milk.",
      Img: "http://example.com/image20.jpg",
      cal: 200,
      min: 7,
      ingredient_ids: [13, 38],
    },
    {
      ID_Food: 21,
      Food_Name: "Chia Pudding",
      Details: "A simple chia seed pudding with vanilla.",
      Img: "http://example.com/image21.jpg",
      cal: 200,
      min: 5,
      ingredient_ids: [14, 38],
    },
    {
      ID_Food: 22,
      Food_Name: "Pancakes with Maple Syrup",
      Details: "Fluffy pancakes served with maple syrup.",
      Img: "http://example.com/image22.jpg",
      cal: 300,
      min: 15,
      ingredient_ids: [13, 38, 15],
    },
    {
      ID_Food: 23,
      Food_Name: "Scrambled Eggs with Spinach",
      Details: "Light and fluffy scrambled eggs with spinach.",
      Img: "http://example.com/image23.jpg",
      cal: 150,
      min: 7,
      ingredient_ids: [16, 7, 34],
    },
    {
      ID_Food: 24,
      Food_Name: "Smoothie Bowl",
      Details: "A refreshing blend of fruits in a bowl.",
      Img: "http://example.com/image24.jpg",
      cal: 300,
      min: 10,
      ingredient_ids: [17, 18, 21, 39],
    },
    {
      ID_Food: 25,
      Food_Name: "Whole Grain Waffles",
      Details: "Crisp whole grain waffles with syrup.",
      Img: "http://example.com/image25.jpg",
      cal: 300,
      min: 15,
      ingredient_ids: [19],
    },
    {
      ID_Food: 26,
      Food_Name: "Egg and Avocado Breakfast Burrito",
      Details: "A soft tortilla filled with egg and avocado.",
      Img: "http://example.com/image26.jpg",
      cal: 300,
      min: 15,
      ingredient_ids: [16, 20, 31],
    },
    {
      ID_Food: 27,
      Food_Name: "Overnight Oats",
      Details: "Rolled oats soaked overnight with almond milk.",
      Img: "http://example.com/image27.jpg",
      cal: 250,
      min: 15,
      ingredient_ids: [13, 38, 39],
    },
    {
      ID_Food: 28,
      Food_Name: "Greek Yogurt Parfait",
      Details: "Layers of creamy Greek yogurt with granola.",
      Img: "http://example.com/image28.jpg",
      cal: 150,
      min: 10,
      ingredient_ids: [21, 18, 39],
    },
    {
      ID_Food: 29,
      Food_Name: "Grilled Vegetable Panini",
      Details: "A pressed sandwich filled with grilled vegetables.",
      Img: "http://example.com/image29.jpg",
      cal: 350,
      min: 10,
      ingredient_ids: [37, 34, 26],
    },
    {
      ID_Food: 30,
      Food_Name: "Chicken Caesar Wrap",
      Details:
        "Grilled chicken, romaine lettuce, and Caesar dressing in a wrap.",
      Img: "http://example.com/image30.jpg",
      cal: 400,
      min: 10,
      ingredient_ids: [20, 1, 7, 34],
    },
    {
      ID_Food: 31,
      Food_Name: "Greek Yogurt",
      Details: "A bowl of plain Greek yogurt with honey.",
      Img: "http://example.com/image31.jpg",
      cal: 100,
      min: 3,
      ingredient_ids: [21],
    },
  ]);

  const [trainerSpecialistData, settrainerSpecialistData] = useState([
    { ID_Trainer: 1, ID_Food: 10, Day_Of_Week: "Saturday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 12, Day_Of_Week: "Sunday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 14, Day_Of_Week: "Saturday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 17, Day_Of_Week: "Wednesday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 18, Day_Of_Week: "Saturday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 19, Day_Of_Week: "Tuesday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 20, Day_Of_Week: "Monday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 20, Day_Of_Week: "Sunday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 22, Day_Of_Week: "Monday", Times: "Lunch" },
    {
      ID_Trainer: 1,
      ID_Food: 26,
      Day_Of_Week: "Wednesday",
      Times: "Breakfast",
    },
    { ID_Trainer: 1, ID_Food: 29, Day_Of_Week: "Friday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 31, Day_Of_Week: "Sunday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 31, Day_Of_Week: "Wednesday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 29, Day_Of_Week: "Monday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 33, Day_Of_Week: "Friday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 35, Day_Of_Week: "Friday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 39, Day_Of_Week: "Tuesday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 40, Day_Of_Week: "Tuesday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 6, Day_Of_Week: "Thursday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 7, Day_Of_Week: "Thursday", Times: "Breakfast" },
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
  }, [formattedDate, foodData, ID_Trainer]);

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
      ID_Food: parseInt(selectedExercise, 10),
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
              key={index}
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
