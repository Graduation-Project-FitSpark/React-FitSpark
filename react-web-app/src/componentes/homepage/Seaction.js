import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Seaction.css";
import URL from "../../enum/enum";
import axios from "axios";
const Seaction = ({ seactionname, name, find }) => {
  const navigate = useNavigate();
  const [sakeItems, setSakeItems] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`${URL}/getAllSales`);
        setSakeItems(response.data.sales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSales();
  }, []);

  const renderItems = (filteredItems) => {
    let elements = [];
    for (let j = 0; j < filteredItems.length; j += 4) {
      const batch = filteredItems.slice(j, j + 4);

      elements.push(
        <div key={j} className="rowContainer">
          {batch.map((category) => (
            <div
              key={category.ID_Sale}
              className="iteamcontainer"
              onClick={() =>
                navigate("/Iteamshop", {
                  state: {
                    ID_Sale: category.ID_Sale,
                    Salee_Name: category.Salee_Name,
                    Price: category.Price,
                    Quantity: category.Quantity,
                    Description: category.Description,
                    Product_Name: category.Product_Name,
                    Size: category.Size,
                  },
                })
              }
            >
              <div className="tophadercard">
                <span className="price">
                  <span style={{ color: "#b2f200", fontWeight: "bold" }}>
                    $
                  </span>
                  {category.Price}
                </span>
                <span className="samltitle">{category.Product_Name}</span>
              </div>
              <div className="imgcontner">
                <img
                  src="https://p7.hiclipart.com/preview/548/366/440/dietary-supplement-whey-protein-isolate-optimum-nutrition-gold-standard-100-whey-protein-thumbnail.jpg"
                  alt="Product"
                  className="image"
                />
              </div>
              <div className="title-seaction-Container">
                <span className="title-seaction">{category.Salee_Name}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return elements;
  };

  if (find === 1) {
    const filteredItems = sakeItems.filter(
      (item) => item.Salee_Name === seactionname
    );
    return filteredItems.length > 0 ? (
      renderItems(filteredItems)
    ) : (
      <img
        src={require("../../img/outofstock.png")}
        alt="Out of Stock"
        className="imgoutofstock"
      />
    );
  } else {
    const filteredItems = sakeItems.filter((item) => item.Salee_Name === name);
    return filteredItems.length > 0 ? (
      renderItems(filteredItems)
    ) : (
      <img
        src={require("../../img/outofstock.png")}
        alt="Out of Stock"
        className="imgoutofstock"
      />
    );
  }
};

export default Seaction;
