import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Shop.css";
import Navbarhomepage from "./Navbarhomepage";
import {
  IoBarbell,
  IoPersonAdd,
  IoFastFood,
  IoPeople,
  IoBasket,
  IoCheckmarkDoneOutline,
  IoSearch,
  IoCart,
} from "react-icons/io5";
import Seaction from "./Seaction.js";
function Shop() {
  const [text, onChangeText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Protein");
  const [selectedanme, setSelectedname] = useState(15);
  const [shouldFind, setShouldFind] = useState(1);
  const [sherchtext, setsherchtext] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    "Protein",
    "Pre workout",
    "Vitamins",
    "Equipment",
    "Protein bar",
  ]);

  const _handleSubmitEditing = (text) => {
    setSelectedname(text.charAt(0).toUpperCase() + text.slice(1));
    setShouldFind(0);
  };

  return (
    <div className="workshop">
      <Navbarhomepage />

      <div className="workshop-inner-container">
        <p className="workshop-title ">Store</p>
        <div className="workshop-search-bar-outer">
          <div className="workshop-search-bar">
            <input
              className="workshop-search-input"
              value={text}
              onChange={(e) => {
                onChangeText(e.target.value);
                setsherchtext(e.target.value);
              }}
              placeholder="Find shoes"
              onKeyPress={(e) => {
                if (e.key === "Enter") _handleSubmitEditing(sherchtext);
              }}
            />
            <div
              className="workshop-search-icon-container"
              onClick={() => _handleSubmitEditing(sherchtext)}
            >
              <IoSearch className="workshop-icon ion-search-outline" />
            </div>
          </div>
        </div>

        <div className="workshop-header-section">
          <h1 className="workshop-categories-title">Categories</h1>
          <IoCart
            size={50}
            color="#000"
            onClick={() => navigate("/Cart")}
            className="card-icon"
          />
        </div>
        <div className="workshop-categories-container">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`workshop-category-button ${
                selectedCategory === category
                  ? "workshop-category-selected"
                  : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setShouldFind(1);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <Seaction
          seactionname={selectedCategory}
          name={selectedanme}
          find={shouldFind}
        />
      </div>
    </div>
  );
}

export default Shop;
