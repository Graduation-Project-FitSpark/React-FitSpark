import React, { useState } from "react";
import "./Userstable.css";

function Userstable() {
  const [selectedEntryType, setSelectedEntryType] = useState("");
  const [watchedVideosOrder, setWatchedVideosOrder] = useState("highest");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() + 1;

  const usertableData = [
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
      Points: 0,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
      Dateenter: "2025-12-06",
      Age: 13,
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
      Dateenter: "2025-11-06",
      Age: 12,
    },
  ];

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
            <span className="tableCell">{row.First_name}</span>
            <span className="tableCell">{row.Age}</span>
            <span className="tableCell">{row.Dateenter}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userstable;
