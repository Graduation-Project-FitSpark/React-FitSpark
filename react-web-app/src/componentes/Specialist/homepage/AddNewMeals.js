import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";
import "./AddNewMeals.css";
import URL from "../../../enum/enum";
import { Alert } from "bootstrap";
import Navbarhomepage from "./Navbarspecialist";
import {
  IoBarbell,
  IoPersonAdd,
  IoFastFood,
  IoPeople,
  IoBasket,
  IoCheckmarkDoneOutline,
  IoSearchSharp,
} from "react-icons/io5";
const apiKey = "d8c55e3ae4fa4d45ba3f548c64c7d71b";

const AddNewMeals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealResults, setMealResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const fetchMeals = async () => {
    if (searchTerm.trim() === "") return;
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}`
    );
    const data = await response.json();
    setMealResults(data.results);
  };

  const fetchIngredientsDetails = async (mealId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=false&apiKey=${apiKey}`
      );
      const data = await response.json();
      if (data.extendedIngredients) {
        const ingredientsList = data.extendedIngredients.map((ingredient) => ({
          ID: ingredient.id,
          name: ingredient.name,
          img: ingredient.image
            ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
            : "https://via.placeholder.com/100?text=No+Image",
        }));
        setIngredients(ingredientsList);
      }
    } catch (error) {
      console.error("Error fetching ingredient details:", error);
    }
  };

  const handleMealClick = async (meal) => {
    console.log("Meal clicked:", meal);
    setSelectedMeal(meal);
    await fetchIngredientsDetails(meal.id);
  };

  const handleAddMeal = () => {
    if (selectedMeal) {
      const foodDetails = {
        ID_Food: selectedMeal.id,
        Food_Name: selectedMeal.title,
        Details: "This is a delicious meal. Perfect for any occasion.",
        Img: selectedMeal.image,
        cal: Math.floor(Math.random() * (60 - 30 + 1)) + 130,
        min: Math.floor(Math.random() * (40 - 20 + 1)) + 20,
        ingredient_idsl: ingredients
          ? ingredients.map((ingredient) => ingredient.ID)
          : [],
      };

      fetch(`${URL}/insertNewMeal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodDetails }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Meal insert response:", data);
        })
        .catch((error) => {
          console.error("Error inserting meal:", error);
        });

      if (ingredients) {
        const ingredientsDetails = ingredients.map((ingredient) => ({
          ID: ingredient.ID,
          name: ingredient.name,
          img: ingredient.img || "No image available",
        }));

        fetch(`${URL}/insertNewIngredients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredientsDetails,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Ingredients insert response:", data);
          })
          .catch((error) => {
            console.error("Error inserting ingredients:", error);
          });
      }
    } else {
      console.log("Selected meal data is missing.");
    }
    alert("Added the meal to the System!");
  };

  const renderIngredients = () => (
    <div className="ingredients-list">
      {ingredients.map((ingredient) => (
        <div className="ingredient-item" key={ingredient.ID}>
          <img src={ingredient.img} alt={ingredient.name} />
          <p>{ingredient.name}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Navbarhomepage />
      <div className="containerdd">
        <h2 className="search-title">Search and add any meal</h2>
        <div className="search-container-outer">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for meals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchMeals()}
            />
          </div>

          <div className="search-button-add-meales">
            <IoSearchSharp size={25} color="#fff" />
          </div>
        </div>

        <div className="meal-grid">
          {mealResults.map((meal) => (
            <div
              key={meal.id}
              className="meal-card"
              onClick={() => handleMealClick(meal)}
            >
              <img src={meal.image} alt={meal.title} className="meal-image" />
              <h3>{meal.title}</h3>
            </div>
          ))}
        </div>

        <Modal
          open={!!selectedMeal}
          onClose={() => setSelectedMeal(null)}
          aria-labelledby="meal-details-modal"
        >
          <div className="modal-contentddd">
            <img
              src={selectedMeal?.image}
              alt={selectedMeal?.title}
              className="modal-image-add"
            />
            <h1>{selectedMeal?.title}</h1>
            <div className="modal-class-title">
              <h4>Ingredients:</h4>
            </div>

            {renderIngredients()}
            <div className="add-clance-class-button">
              <div
                className="add-meal-button-api"
                variant="contained"
                onClick={handleAddMeal}
              >
                Add Meal
              </div>
              <div
                variant="outlined"
                onClick={() => setSelectedMeal(null)}
                className="outlined-Close "
              >
                Close
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AddNewMeals;
