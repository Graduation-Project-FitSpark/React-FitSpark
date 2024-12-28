import React, { useState, useEffect } from "react";
import "./EditTrainees.css"; // CSS module or regular CSS file
import EditUserModal from "./EditTraineesModel";
import Navbaradmin from "../../homescreen/Navbaradmin";
import axios from "axios";
import URL from "../../../../enum/enum";
function EditTrainees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item.ID_Trainer);
    setModalVisible(true);
  };

  const [userTableData, setUserTableData] = useState([]);
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setUserTableData(data);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchTrainers();
  }, []);

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
                <div className="table-cell">{row.Dateenter.split("T")[0]}</div>
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
