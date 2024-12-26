import React, { useState } from "react";
import "./EditCoach.css";
import Navbaradmin from "../../homescreen/Navbaradmin";
import EditSpecialistModel from "./EditSpecialistModel";
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

  const usertableData = [
    {
      ID_Specialist: 1,
      Username: "Ali",
      Email: "masdm",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Phone_Number: "flkj;d",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 100,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
    },
    {
      ID_Specialist: "7ce0612a-892a-4429-89cc-0d6d7aa1f72a",
      Username: "AhmadA",
      Email: "asjkdsI",
      First_Name: "sdlkfJ",
      Last_Name: "sdlkfJ",
      Phone_Number: "06594958",
      Age: 12,
      Gender: "Female",
      Location: "Genen",
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
    },
    {
      ID_Specialist: "924facco-b571-4611-9e70-c7a7ff2af929",
      Username: "Umy",
      Email: "GfKfk",
      First_Name: "Fjfj",
      Last_Name: "FjfJ",
      Phone_Number: "06594958",
      Age: 12,
      Gender: "Female",
      Location: "Genen",
      Points: 10,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2020-04-06",
      AcceptedDescription: "P",
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
    setSortOrder("highest");
  };

  return (
    <div>
      <Navbaradmin />
      <div className="edit-coach">
        <div className="edit-coach-iner">
          <div className="header">
            <h1>Specialist Info</h1>
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
                    <span>{row.Dateenter}</span>
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
