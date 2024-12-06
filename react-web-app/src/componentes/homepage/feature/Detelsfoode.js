import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Detelsfoode.css";
import Navbarhomepage from "./../Navbarhomepage";
import URL from "../../../enum/enum";
import axios from "axios";
import { useEffect } from "react";
export default function RecipeCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, name, details, img, min, cal } = location.state || {};

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${URL}/getIngradients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ foodName: name }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setIngredients(data);
        } else {
          console.log("Failed to fetch ingredients");
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <div className="recipe-card-container">
      <Navbarhomepage />
      <div className="recipe-card-container-iner">
        <div className="recipe-card-header">
          <div className="recipe-card-image-wrapper">
            <img
              src={
                img ||
                "https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png"
              }
              alt="Recipe"
              className="recipe-card-main-image"
            />
          </div>
        </div>

        <div className="recipe-card-info">
          <div className="info-con-title">
            <div className="info-con-title-1"></div>
            <div className="info-con-title-2">
              <h1 className="recipe-card-title">{name || "Recipe Name"}</h1>
              <h3 className="recipe-card-subtitle">by Harrison</h3>
              <p className="recipe-card-description">
                {details || "Recipe details go here."}
              </p>
            </div>
          </div>

          <div className="recipe-card-stats">
            <div className="recipe-card-stat-item">
              <span>&#128336;</span>
              <p className="recipe-card-stat-text">{min || "0"} Min</p>
            </div>
            <div className="recipe-card-stat-item">
              <span>&#128293;</span>
              <p className="recipe-card-stat-text">{cal || "0"} Cal</p>
            </div>
            <div className="recipe-card-stat-item">
              <span>&#128221;</span>
              <p className="recipe-card-stat-text">{ingredients.length} Ing</p>
            </div>
          </div>
          <div className="recipe-card-ingredients">
            <div className="recipe-card-ingredients-scroll">
              {ingredients.map((item) => (
                <div key={item.id} className="recipe-card-ingredient">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="recipe-card-ingredient-image"
                  />
                  <p className="recipe-card-ingredient-name">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
