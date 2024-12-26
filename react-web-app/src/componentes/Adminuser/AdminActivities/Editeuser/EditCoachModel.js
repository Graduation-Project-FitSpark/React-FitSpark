import React, { useState, useEffect, useCallback } from "react";
import "./EditCoachModel.css";

function EditCoachModel({ modalVisible, setModalVisible, iteam }) {
  const [notification, setNotification] = useState("");
  const [countTrainer, setCountTrainer] = useState(0);

  const initialTableData = [
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
    },
  ];

  const trainerCoachData = [
    {
      ID_Trainer: 1,
      ID_Coach: 1,
      Accepted: "t",
      Description:
        "Trainer 1 is paired with Coach 2 and the request is accepted.",
    },
  ];

  useEffect(() => {
    console.log(iteam);
    let count = 0;
    trainerCoachData.forEach((item) => {
      if (
        item.ID_Coach === iteam &&
        (item.Accepted === "t" || item.Accepted === "T")
      ) {
        count++;
      }
    });
    setCountTrainer(count);
  }, [trainerCoachData, iteam]);

  const userData = initialTableData.find((item) => item.ID_Coach === iteam);

  const deleteUser = () => {
    console.log("User deleted", iteam);
    setModalVisible(false);
  };

  const sendNotification = () => {
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
      </div>
    </div>
  );
}

export default EditCoachModel;
