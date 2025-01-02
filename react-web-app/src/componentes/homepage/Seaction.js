import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Seaction.css";

const Seaction = ({ seactionname, name, find }) => {
  const navigate = useNavigate();
  const [sakeItems, setSakeItems] = useState([
    {
      ID_Sale: 1,
      Salee_Name: "Protein",
      Price: 22,
      Quantity: 10,
      Description: "A traditional Japanese rice wine with fruity flavors.",
      Product_Name: "Protein_mahmoud",
      Size: "large",
    },
    {
      ID_Sale: 2,
      Salee_Name: "Protein",
      Price: 22,
      Quantity: 5,
      Description: "A smooth and rich sake, perfect for pairing with seafood.",
      Product_Name: "Protein_mahmoud",
      Size: "large",
    },
    {
      ID_Sale: 3,
      Salee_Name: "Vitamins",
      Price: 18,
      Quantity: 8,
      Description: "A premium sake with floral aroma and a crisp finish.",
      Product_Name: "Protein_mahmoud",
      Size: "large",
    },
    {
      ID_Sale: 4,
      Salee_Name: "Protein",
      Price: 25,
      Quantity: 3,
      Description: "Aged sake with a complex flavor profile and a golden hue.",
      Product_Name: "Protein_mahmoud",
      Size: "large",
    },
  ]);

  useEffect(() => {
    const newsakeItems = [
      ...sakeItems,
      {
        ID_Sale: 5,
        Salee_Name: "Protein",
        Price: 100,
        Quantity: 5,
        Description: "mahmoud is better then ahmad , ahmad is hmar",
        Product_Name: "Protein_mahmoud",
        Size: "large",
      },
    ];

    setSakeItems(newsakeItems);
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
