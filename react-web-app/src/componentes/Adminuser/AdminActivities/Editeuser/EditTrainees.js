import React, { useState } from "react";
import "./EditTrainees.css"; // CSS module or regular CSS file
import EditUserModal from "./EditTraineesModel";
import Navbaradmin from "../../homescreen/Navbaradmin";
function EditTrainees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item.ID_Trainer);
    setModalVisible(true);
  };

  const userTableData = [
    {
      ID_Trainer: 1,
      First_name: "mahmoud",
      Last_name: "Arafat",
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "[37.74798825940199, -122.420727407486164]",
      Activity_Level: "Fat",
      Card_Number: "594949494",
      Expression_Date: "2000-06-07 00:00:00",
      CVC: 594,
      Points: 23,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
      Dateenter: "2024-12-06",
      Age: 12,
    },
    {
      ID_Trainer: 13,
      First_name: "jone",
      Last_name: "kcdcd",
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "Nablus",
      Activity_Level: "Fat",
      Card_Number: "065061563",
      Expression_Date: "2000-08-02 00:00:00",
      CVC: 321,
      Points: 500,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 5,
      Token: null,
      Username: "user_7733",
      Height: 120,
      Weight: 50,
      Dateenter: "2024-04-06",
      Age: 12,
    },
    {
      ID_Trainer: 9,
      First_name: "sasa",
      Last_name: "ffdfd",
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "[37.68169336082543, -122.44336623698473]",
      Activity_Level: "Fat",
      Card_Number: "594949494",
      Expression_Date: "2005-06-01 00:00:00",
      CVC: 493,
      Points: 100,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 2,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 90,
      Dateenter: "2024-05-06",
      Age: 12,
    },
  ];

  const filteredData = userTableData.filter((row) =>
    row.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbaradmin />
      <div className="edit-trainees">
        <div className="edit-trainees-iner">
          <div className="header">
            <h1 className="header-text">User Info</h1>
          </div>
          <div className="filter-section">
            <input
              className="search-input"
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>

          <div className="table">
            <div className="table-header">
              <div className="table-cell">ID</div>
              <div className="table-cell">Name</div>
              <div className="table-cell">Age</div>
              <div className="table-cell">Entered</div>
            </div>
            {filteredData.map((row, index) => (
              <div
                key={row.ID_Trainer}
                className={`table-row ${
                  index % 2 === 0 ? "even-row" : "odd-row"
                }`}
                onClick={() => handlePress(row)}
              >
                <div className="table-cell">{row.ID_Trainer}</div>
                <div className="table-cell">{row.Username}</div>
                <div className="table-cell">{row.Age}</div>
                <div className="table-cell">{row.Dateenter}</div>
              </div>
            ))}
          </div>
        </div>

        {modalVisible && (
          <EditUserModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            item={selectedItem}
          />
        )}
      </div>
    </div>
  );
}

export default EditTrainees;
