import React, { useState } from "react";
import "./EditCoach.css";
import EditCoachModel from "./EditCoachModel";
import Navbaradmin from "../../homescreen/Navbaradmin";
function EditCoach() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("highest");

  const handlePress = (item) => {
    setSelectedItem(item);
    console.log(selectedItem);
    setModalVisible(true);
  };

  const usertableData = [
    {
      ID_Coach: 1,
      Username: "Ali",
      Email: "masdm",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Phone_Number: "flkj;d",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 200,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2024-02-06",
      AcceptedDescription: "A",
    },
  ];

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
    setSortOrder("");
  };

  return (
    <div>
      <Navbaradmin />
      <div className="edit-coach">
        <div className="edit-coach-iner ">
          <div className="header">
            <h2>Coach Info</h2>
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
              <option value="highest">Highest rating</option>
              <option value="lowest">Lowest rating</option>
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
                    key={row.ID_Coach}
                    className={`table-row ${
                      index % 2 === 0 ? "even-row" : "odd-row"
                    }`}
                    onClick={() => {
                      handlePress(row.ID_Coach);
                    }}
                  >
                    <span>{row.ID_Coach}</span>
                    <span>{row.Username}</span>
                    <span>{row.Age}</span>
                    <span>{row.Dateenter}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {modalVisible && (
          <EditCoachModel
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            iteam={selectedItem}
          />
        )}
      </div>
    </div>
  );
}

export default EditCoach;
