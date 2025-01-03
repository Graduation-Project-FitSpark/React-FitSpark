import React, { useState, useEffect, useCallback } from "react";
import "./EditCoachModel.css";
import axios from "axios";
import URL from "../../../../enum/enum";

function EditCoachModel({ modalVisible, setModalVisible, iteam }) {
  const [notification, setNotification] = useState("");
  const [countTrainer, setCountTrainer] = useState(0);

  const [initialTableData, setInitialTableData] = useState([]);
  const [trainerCoachData, setTrainerCoachData] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${URL}/getAllCoaches`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setInitialTableData(data.coaches);
        const response2 = await fetch(`${URL}/getTrainerCoachWithDescription`);

        if (!response2.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data2 = await response2.json();
        setTrainerCoachData(data2);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchTrainers();
  }, [initialTableData]);

  useEffect(() => {
    console.log(iteam);
    let count = 0;
    trainerCoachData.forEach((item) => {
      if (
        item.ID_Coach === iteam &&
        (item.Accepted === "a" || item.Accepted === "A")
      ) {
        count++;
      }
    });
    setCountTrainer(count);
  }, [trainerCoachData, iteam]);

  const userData = initialTableData.find((item) => item.ID_Coach === iteam);

  const deleteUser = async () => {
    const response = await axios.post(`${URL}/DeleteCoachAdmin`, {
      ID_Coach: iteam,
    });
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Coach !== iteam)
    );
    console.log("User deleted", iteam);
    setModalVisible(false);
    window.location.reload();
  };

  const sendNotification = async (username) => {
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description: notification,
        Date: currentDate,
        Msg_To: username,
      };

      const response = await axios.post(
        `${URL}/insertNotification`,
        notificationData
      );

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error("Error inserting notification:", error);
      return "Failed to insert notification";
    }
    alert(`Notification Sent: ${notification}`);
    setNotification("");
  };

  if (!modalVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {userData ? (
          <>
            <div className="modal-header">
              <img
                src={userData.Img || "https://via.placeholder.com/50"}
                alt="User Avatar"
                className="user-avatar"
              />
              <h2>{userData.First_Name + " " + userData.Last_Name}</h2>
            </div>
            <div className="modal-grid">
              <div className="modal-info">
                <p>Gender: {userData.Gender}</p>
              </div>
              <div className="modal-info">
                <p>Experience: {userData.YearsOfExperience} Years</p>
              </div>
            </div>
            <div className="modal-grid">
              <div className="modal-info">
                <p>Points: {userData.Points}</p>
              </div>
              <div className="modal-info">
                <p>Enrollment: {countTrainer}</p>
              </div>
            </div>
            <div className="modal-grid">
              <div className="modal-info">
                <p>Email: {userData.Email}</p>
              </div>
              <div className="modal-info">
                <p>Phone Number: {userData.Phone_Number}</p>
              </div>
            </div>
          </>
        ) : (
          <p>No data found for the selected trainer.</p>
        )}
        <div className="notification-section">
          <input
            type="text"
            placeholder="Send Notification"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
          />
          <button
            onClick={() => sendNotification(userData.Username)}
            className="send-button"
          >
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
      </div>
    </div>
  );
}

export default EditCoachModel;
