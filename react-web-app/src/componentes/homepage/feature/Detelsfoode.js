import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Detelsfoode.css";

export default function RecipeCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name, details, img, min, cal } = location.state || {};

  const [ingredients, setIngredients] = useState([
    {
      id: "1",
      name: "Bun",
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    },
    {
      id: "2",
      name: "Lettuce",
      image: "https://cdn-icons-png.flaticon.com/512/1515/1515746.png",
    },
    {
      id: "3",
      name: "Tomato",
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046750.png",
    },
    {
      id: "4",
      name: "Cheese",
      image: "https://cdn-icons-png.flaticon.com/512/1998/1998670.png",
    },
    {
      id: "5",
      name: "Beef Patty",
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075978.png",
    },
    {
      id: "6",
      name: "Onion",
      image: "https://cdn-icons-png.flaticon.com/512/4156/4156144.png",
    },
    {
      id: "7",
      name: "Pickles",
      image: "https://cdn-icons-png.flaticon.com/512/3061/3061345.png",
    },
    {
      id: "8",
      name: "Ketchup",
      image: "https://cdn-icons-png.flaticon.com/512/3050/3050227.png",
    },
    {
      id: "9",
      name: "Mustard",
      image: "https://cdn-icons-png.flaticon.com/512/3050/3050254.png",
    },
  ]);

  return (
    <div className="drive-container">
      <div className="drive-header">
        <button onClick={() => navigate(-1)} className="drive-back-button">
          &#8592; Back
        </button>
        <div className="drive-image-wrapper">
          <img
            src={
              img ||
              "https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png"
            }
            alt="Recipe"
            className="drive-main-image"
          />
        </div>
      </div>

      <div className="drive-info">
        <h1 className="drive-title">{name || "Recipe Name"}</h1>
        <h3 className="drive-subtitle">by Harrison</h3>
        <p className="drive-description">
          {details || "Recipe details go here."}
        </p>
        <div className="drive-stats">
          <div className="drive-stat-item">
            <span>&#128336;</span>
            <p className="drive-stat-text">{min || "0"} Min</p>
          </div>
          <div className="drive-stat-item">
            <span>&#128293;</span>
            <p className="drive-stat-text">{cal || "0"} Cal</p>
          </div>
          <div className="drive-stat-item">
            <span>&#128221;</span>
            <p className="drive-stat-text">{ingredients.length} Ing</p>
          </div>
        </div>
        <div className="drive-ingredients">
          <div className="drive-ingredients-scroll">
            {ingredients.map((item) => (
              <div key={item.id} className="drive-ingredient">
                <img
                  src={item.image}
                  alt={item.name}
                  className="drive-ingredient-image"
                />
                <p className="drive-ingredient-name">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
