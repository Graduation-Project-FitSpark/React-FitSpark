import React, { useState, useEffect } from "react";
import "./EditCoach.css";
import Navbaradmin from "../../homescreen/Navbaradmin";
import EditSpecialistModel from "./EditSpecialistModel";
import URL from "../../../../enum/enum";
import axios from "axios";
function EditSpecialist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("highest");
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = (item) => {
    setSelectedItem(item);
    console.log(selectedItem);
    setModalVisible(true);
  };

  const [usertableData, setUserTableData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response3 = await fetch(`${URL}/getAllSepcialistsAdmin`);

        if (!response3.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        const data3 = await response3.json();
        setUserTableData(data3);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);
  const filteredData = usertableData.filter((row) =>
    row.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "highest") {
      return b.Points - a.Points;
    } else {
      return a.Points - b.Points;
    }
  });

  const resetFilters = () => {
    setSortOrder("highest");
  };

  return (
    <div>
      <Navbaradmin />
      <div className="edit-coach">
        <div className="edit-coach-iner">
          <div className="header">
            <h1>Nutration Expert Info</h1>
          </div>
          <div className="serch">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
          <div className="filters">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <button className="reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>

          <div className="table">
            <div className="table-header">
              <span>ID</span>
              <span>Name</span>
              <span>Age</span>
              <span>Entered</span>
            </div>
            {sortedData.map((row, index) => {
              if (row.AcceptedDescription === "A") {
                return (
                  <div
                    key={row.ID_Specialist}
                    className={`table-row ${
                      index % 2 === 0 ? "even-row" : "odd-row"
                    }`}
                    onClick={() => handlePress(row.ID_Specialist)}
                  >
                    <span>{row.ID_Specialist}</span>
                    <span>{row.Username}</span>
                    <span>{row.Age}</span>
                    <span>{row.Dateenter.split("T")[0]}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {modalVisible && (
          <EditSpecialistModel
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            item={selectedItem}
          />
        )}
      </div>
    </div>
  );
}

export default EditSpecialist;
