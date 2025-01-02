import React, { useState, useEffect } from "react";
import "./SalesStatistics.css";
import {
  IoBarbell,
  IoPersonAdd,
  IoFastFood,
  IoPeople,
  IoBasket,
  IoCashOutline,
  IoHeart,
  IoCart,
} from "react-icons/io5";
import {
  FaMoneyBillTransfer,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
} from "react-icons/fa6";
import Navbaradmin from "../homescreen/Navbaradmin";
import URL from "../../../enum/enum";
import axios from "axios";
function SalesStatistics() {
  const [mostPurchased, setMostPurchased] = useState(null);
  const [monthlySales, setMonthlySales] = useState(0);
  const [monthlyDollar, setMonthlyDollar] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [salesChange, setsalesChange] = useState("");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const [selsdata, setSelsData] = useState([]);
  const [sakeItems, setSakeItems] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${URL}/getAllSalesTrainers`);
        const data = await response.json();
        setSelsData(data.sales);
        const response2 = await fetch(`${URL}/getAllSales`);
        const data2 = await response.json();
        setSakeItems(data2.sales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  const handlePress = (id) => {
    console.log(`Pressed row with ID_Trainer: ${id}`);
  };

  useEffect(() => {
    let count = [];

    sakeItems.forEach((item) => {
      count.push({ Product_Name: item.Product_Name, count_value: 0 });
    });

    selsdata.forEach((value) => {
      const element = count.find(
        (el) => el.Product_Name === value.Product_Name
      );
      if (element) {
        element.count_value += value.Quantity_User;
      }
    });

    const maxValue = Math.max(...count.map((item) => item.count_value));
    const maxProduct = count.find((item) => item.count_value === maxValue);

    setMostPurchased(maxProduct ? maxProduct.Product_Name : null);
  }, [sakeItems, selsdata]);

  useEffect(() => {
    let countMonthly = 0;
    let countMonthlyDollar = 0;

    selsdata.forEach((item) => {
      const itemDate = new Date(item.Dateenter);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();

      if (itemMonth === currentMonth && itemYear === currentYear) {
        countMonthly += item.Quantity_User;
        countMonthlyDollar += item.Price * item.Quantity_User;
      }
    });

    setMonthlyDollar(countMonthlyDollar);
    setMonthlySales(countMonthly);
  }, [selsdata, currentMonth, currentYear]);

  useEffect(() => {
    if (selectedCurrency === "USD") {
      setConvertedValue(monthlyDollar);
      return;
    }

    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[selectedCurrency];
        if (rate) {
          const converted = (monthlyDollar * rate).toFixed(2);
          setConvertedValue(converted);
        }
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }, [selectedCurrency, monthlyDollar]);
  useEffect(() => {
    const countsales = selsdata.filter((user) => {
      const [year, month] = user.Dateenter.split("-");
      return currentMonth === parseInt(month) && currentYear === parseInt(year);
    }).length;

    const countTrainesspass = selsdata.filter((user) => {
      const [year, month] = user.Dateenter.split("-");
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month);

      if (
        currentMonth === 1 &&
        currentYear === parsedYear + 1 &&
        parsedMonth === 12
      ) {
        return true;
      }

      return currentMonth - 1 === parsedMonth && currentYear === parsedYear;
    }).length;

    if (countsales > countTrainesspass) {
      setsalesChange("up vs last month ");
    } else if (countsales < countTrainesspass) {
      setsalesChange("down vs last month ");
    } else {
      setsalesChange("no change vs last month ");
    }
  }, [selsdata, currentMonth, currentYear]);
  return (
    <div>
      <Navbaradmin />
      <div className="slaes">
        <div>
          <p className="slaes-title">Sales Info</p>
        </div>
        <div className="cards-slaes">
          <div className="card-slaes">
            <div className="title-card-slaes">
              <h3>Monthly Sales</h3>
              <div
                className="title-icon-card"
                style={{ backgroundColor: "#94e075" }}
              >
                <IoCart size={20} color="#fff" />
              </div>
            </div>

            <h1 className="p-card">{monthlySales}</h1>
            <div className="footer-slaes">
              {salesChange === "up vs last month " && (
                <div className="footer-item-slaes">
                  <FaArrowUp size={16} color="#4CAF50" />
                  <span
                    className="footer-text-slaes"
                    style={{ color: "#4CAF50" }}
                  >
                    {salesChange}
                  </span>
                </div>
              )}
              {salesChange === "down vs last month " && (
                <div className="footer-item-slaes">
                  <FaArrowDown size={16} color="#FF5722" />
                  <span
                    className="footer-text-slaes"
                    style={{ color: "#FF5722" }}
                  >
                    {salesChange}
                  </span>
                </div>
              )}
              {salesChange === "no change vs last month " && (
                <div className="footer-item">
                  <FaMinus size={16} color="#757575" />
                  <span className="footer-text" style={{ color: "#757575" }}>
                    {salesChange}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="card-slaes">
            <div className="title-card-slaes">
              <h3>Monthly Profit</h3>
              <div
                className="title-icon-card"
                style={{ backgroundColor: "#E0DB87" }}
              >
                <FaMoneyBillTransfer size={20} color="#fff" />
              </div>
            </div>
            <p>
              {convertedValue} {selectedCurrency}
            </p>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="ILS">ILS</option>
              <option value="SAR">SAR</option>
            </select>
          </div>
          <div className="card-slaes">
            <div className="title-card-slaes">
              <h3>Most Purchased</h3>
              <div
                className="title-icon-card"
                style={{ backgroundColor: "#E19083" }}
              >
                <IoHeart size={20} color="#fff" />
              </div>
            </div>
            <p>{mostPurchased}</p>
          </div>
        </div>

        <table className="data-slaes">
          <thead>
            <tr>
              <th>ID Sale</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Username</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {selsdata.map((row, index) => (
              <tr
                key={row.ID_Trainer}
                className={index % 2 === 0 ? "even-row-slaes" : "odd-row-slaes"}
                onClick={() => handlePress(row.ID_Trainer)}
              >
                <td>{row.ID_Sale}</td>
                <td>{row.Product_Name}</td>
                <td>{row.Price}</td>
                <td>{row.Quantity_User}</td>
                <td>{row.Username}</td>
                <td>{row.Dateenter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesStatistics;
