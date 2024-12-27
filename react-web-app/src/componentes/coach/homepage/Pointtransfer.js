import React, { useState, useEffect } from "react";
import "./Pointtransfer.css";
import axios from "axios";
import URL from "../../../enum/enum";

function PointTransformer() {
  const [transfer, setTransfer] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [coachpoints, setcoachPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await fetch(`${URL}/getCoachDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        const data = await response.json();
        const points = data.Points;
        setcoachPoints(points);
      } catch (err) {
        console.error(err);
      }
      fetch("https://api.exchangerate-api.com/v4/latest/ILS")
        .then((response) => response.json())
        .then((data) => {
          const rate = data.rates[selectedCurrency];
          if (rate) {
            const convertedValue = (coachpoints * 5 * rate).toFixed(2);
            setTransfer(convertedValue);
          }
        })
        .catch((error) =>
          console.error("Error fetching exchange rate:", error)
        );
    };

    fetchData();
  }, [selectedCurrency, coachpoints]);

  return (
    <div className="point-transfer-container">
      <div className="point-transfer-container-inner">
        <h1 className="header-text">Your Points</h1>
        <div className="point-value">
          <p className="points-text">{coachpoints} Points</p>
        </div>

        <hr className="line" />
        <div className="point-cash">
          <span className="text-cash">Cash Value:</span>
          <div className="cash">
            <span className="currency-text">
              {transfer} {selectedCurrency}
            </span>
            <select
              value={selectedCurrency}
              className="currency-picker"
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="ILS">ILS</option>
              <option value="SAR">SAR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointTransformer;
