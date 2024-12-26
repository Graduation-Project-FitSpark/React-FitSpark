import React, { useEffect, useState } from "react";
import "./EditTraineesModel.css";

function EditUserModal({ modalVisible, setModalVisible, item }) {
  const [notification, setNotification] = useState("");

  const [initialTableData, setInitialTableData] = useState([
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
      WatchedVideos: 5,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
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
      WatchedVideos: 0,
      Token: null,
      Username: "user_7733",
      Height: 120,
      Weight: 50,
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
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 90,
    },
  ]);

  const [fullTableData, setFullTableData] = useState([
    {
      ID_Trainer: 1,
      ID_Calorie: "0e813dde-9419-4012-b3cb-01f41b9bdcc4",
      Calories: 100,
      Steps: 10000,
      Day: "Monday",
      Date: "2024-10-28",
      Distance: null,
    },
    {
      ID_Trainer: 1,
      ID_Calorie: "dc3cb01-83eb-48a8-9a29-de2c8284ceed",
      Calories: 200,
      Steps: 1000,
      Day: "Thursday",
      Date: "2024-11-14",
      Distance: 400,
    },
    {
      ID_Trainer: 13,
      ID_Calorie: "752e3515-55ff-419f-947c-48c06fe037e5",
      Calories: 100,
      Steps: 0,
      Day: "Friday",
      Date: "2024-11-22",
      Distance: 0,
    },
    {
      ID_Trainer: 1,
      ID_Calorie: "752e3515-55ff-419f-947c-48c06fe037e5",
      Calories: 300,
      Steps: 0,
      Day: "Friday",
      Date: "2024-11-22",
      Distance: 0,
    },
  ]);
  useEffect(() => {
    console.log(setModalVisible);
  });
  const userData = initialTableData.find((data) => data.ID_Trainer === item);
  const userCaloriesData = fullTableData.filter(
    (data) => data.ID_Trainer === item
  );

  const totalCalories = userCaloriesData.reduce(
    (sum, entry) => sum + entry.Calories,
    0
  );
  const totalSteps = userCaloriesData.reduce(
    (sum, entry) => sum + entry.Steps,
    0
  );

  const deleteUser = () => {
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== item)
    );
    setFullTableData((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== item)
    );
    setModalVisible(false);
  };

  const sendNotification = () => {
    alert(`Notification Sent: ${notification}`);
    setNotification("");
  };

  return modalVisible ? (
    <div className="modal-overlay">
      <div className="modal-content-t">
        {userData ? (
          <>
            <div className="modal-header">
              <img
                src={userData.Image || "https://via.placeholder.com/50"}
                alt="User Avatar"
                className="user-avatar"
              />
              <h2>{`${userData.First_name} ${userData.Last_name}`}</h2>
            </div>

            <div className="user-details">
              <div className="info-conenr">
                <p className="info-conenr-iner">Gender: {userData.Gender}</p>
                <p className="info-conenr-iner">
                  Class Type: {userData.Class_Type}
                </p>
              </div>
              <div className="info-conenr">
                <p className="info-conenr-iner">Points: {userData.Points}</p>
                <p className="info-conenr-iner">
                  Watched Videos: {userData.WatchedVideos}
                </p>
              </div>
              <div className="info-conenr">
                <p className="info-conenr-iner">
                  Total Calories: {totalCalories}
                </p>
                <p className="info-conenr-iner">Total Steps: {totalSteps}</p>
              </div>
            </div>

            <div className="notification-section">
              <input
                type="text"
                placeholder="Send Notification"
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                className="notification-input"
              />
              <button onClick={sendNotification} className="send-button">
                Send
              </button>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setModalVisible(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={deleteUser} className="delete-button">
                Delete User
              </button>
            </div>
          </>
        ) : (
          <p>No data found for the selected user.</p>
        )}
      </div>
    </div>
  ) : null;
}

export default EditUserModal;
