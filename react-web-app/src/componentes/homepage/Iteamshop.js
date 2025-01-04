import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../../MyProvider";
import "./Iteamshop.css";
import Navbarhomepage from "./Navbarhomepage";
import URL from "../../enum/enum";
import axios from "axios";
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
function Iteamshop() {
  const location = useLocation();
  const {
    ID_Sale,
    Salee_Name,
    Price,
    Quantity,
    Description,
    Product_Name,
    Size,
    Img,
  } = location.state;

  const [selectedValue, setSelectedValue] = useState("Small");
  const [QuantityValue, setQuantityValue] = useState(1);
  const { sharedValue, setSharedValue } = useContext(MyContext);
  const navigate = useNavigate();

  const addToBag = () => {
    const newItem = [
      ...(Array.isArray(sharedValue) ? sharedValue : []),
      {
        ID_Sale,
        Salee_Name,
        Price,
        Quantity: QuantityValue,
        Size,
        Description,
        Product_Name,
        Img,
      },
    ];

    setSharedValue(newItem);
    alert("Item added to the bag!");
  };

  const addQuantityValue = () => {
    if (QuantityValue + 1 > Quantity) {
      alert(`Available in stock only ${Quantity}`);
    } else {
      setQuantityValue(QuantityValue + 1);
    }
  };

  return (
    <div className="Iteamshop">
      <Navbarhomepage />
      <div className="header-Iteamshop-outer">
        <div className="header-Iteamshop">
          <h1 className="title-Iteamshop">{Salee_Name}</h1>
          <IoCart
            size={50}
            color="#000"
            onClick={() => navigate("/Cart")}
            className="card-icon-Iteamshop"
          />
        </div>
        <div className="Iteamshop-info-all">
          <div className="info-section-Iteamshop">
            <div className="item-img">
              <img src={Img} alt="Product" className="image" />
            </div>
          </div>
          <div className="info-section-part2">
            <div className="details-section">
              <div className="info-section-Product_Name">
                <h2 className="item-name">{Product_Name}</h2>
              </div>
              <div className="iteam-info-dela">
                <p className="descriptionShop">Description:{Description}</p>

                <p className="price">
                  Retail Price: <strong>${Price}</strong>
                </p>
                <p className="price">
                  Est. Resell Price: <strong>${Price - 10}</strong>
                </p>
              </div>

              <div className="selection-section">
                <div className="size-selection">
                  <p>Size: {Size}</p>
                </div>

                <div className="quantity-section-Iteamshop">
                  <button
                    className="quantity-button-Iteamshop"
                    onClick={addQuantityValue}
                  >
                    +
                  </button>
                  <span className="quantity-value-Iteamshop">
                    {QuantityValue}
                  </span>
                  <button
                    className="quantity-button-Iteamshop"
                    onClick={() =>
                      QuantityValue > 1 && setQuantityValue(QuantityValue - 1)
                    }
                  >
                    -
                  </button>
                </div>
                <p className="stock-info">Only {Quantity} left in stock!</p>
              </div>

              <button className="add-to-bag-button" onClick={addToBag}>
                Add To Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iteamshop;
