import React, { useEffect, useState } from "react";
import "./EditTraineesModel.css";
import URL from "../../../../enum/enum";
import axios from "axios";
function EditUserModal({ modalVisible, setModalVisible, item }) {
  const [notification, setNotification] = useState("");

  const [initialTableData, setInitialTableData] = useState([]);

  const [fullTableData, setFullTableData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setInitialTableData(data);

        const response2 = await fetch(`${URL}/getTrainerClorieDetails`);

        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setFullTableData(data2);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, [initialTableData]);

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

  const deleteUser = async () => {
    const response = await axios.post(`${URL}/DeleteTrainerAdmin`, {
      ID_Trainer: item,
    });
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== item)
    );
    setFullTableData((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== item)
    );
    setModalVisible(false);
    window.location.reload();
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
              <h2>{`${userData.First_Name} ${userData.Last_Name}`}</h2>
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
