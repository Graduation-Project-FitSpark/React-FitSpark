import React, { useState, useEffect } from "react";
import "./Userstable.css";
import URL from "../../../enum/enum";
import axios from "axios";
function Userstable() {
  const [selectedEntryType, setSelectedEntryType] = useState("");
  const [watchedVideosOrder, setWatchedVideosOrder] = useState("highest");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() + 1;

  const [usertableData, setUsertableData] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setUsertableData(data);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchTrainers();
  }, []);

  const filteredData = usertableData
    .filter((row) => {
      if (selectedEntryType === "new") {
        return (
          new Date(row.Dateenter) >=
          new Date(currentYear + "-" + currentMonth + "-01")
        );
      } else if (selectedEntryType === "last") {
        return (
          new Date(row.Dateenter) <
          new Date(currentYear + "-" + currentMonth + "-01")
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (watchedVideosOrder === "highest") {
        return b.WatchedVideos - a.WatchedVideos;
      } else {
        return a.WatchedVideos - b.WatchedVideos;
      }
    });

  const resetFilters = () => {
    setSelectedEntryType("");
    setWatchedVideosOrder("highest");
  };

  return (
    <div className="Userstable">
      <div className="filterUserstable">
        <div className="filter">
          <div className="filterRow">
            <div className="pickerUserstable">
              <label className="filterLabel">Entry Type:</label>
              <select
                value={selectedEntryType}
                onChange={(e) => setSelectedEntryType(e.target.value)}
                className="picker"
              >
                <option value="">All</option>
                <option value="new">New</option>
                <option value="last">Last</option>
              </select>
            </div>

            <div className="pickerUserstable">
              <label className="filterLabel">Watched Videos:</label>
              <select
                value={watchedVideosOrder}
                onChange={(e) => setWatchedVideosOrder(e.target.value)}
                className="picker"
              >
                <option value="highest">Most Watched</option>
                <option value="lowest">Least Watched</option>
              </select>
            </div>
          </div>

          <button className="resetButton" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="table">
        <div className="tableHeader">
          <span className="tableHeaderText">ID</span>
          <span className="tableHeaderText">Name</span>
          <span className="tableHeaderText">Age</span>
          <span className="tableHeaderText">Entered</span>
        </div>
        {filteredData.map((row, index) => (
          <div
            key={row.ID_Trainer}
            className={`tableRow ${index % 2 === 0 ? "evenRow" : "oddRow"}`}
          >
            <span className="tableCell">{row.ID_Trainer}</span>
            <span className="tableCell">{row.Username}</span>
            <span className="tableCell">{row.Age}</span>
            <span className="tableCell">{row.Dateenter.split("T")[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userstable;
