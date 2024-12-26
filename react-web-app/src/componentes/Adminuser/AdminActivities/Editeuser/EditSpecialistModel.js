import React, { useState, useCallback } from "react";
import "./EditSpecialistModel.css";

function EditSpecialistModel({ modalVisible, setModalVisible, item }) {
  const [notification, setNotification] = useState("");
  const [countTrainer, setCountTrainer] = useState(0);

  const initialTableData = [
    {
      ID_Specialist: 1,
      Username: "Ali",
      Email: "JJJ",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Phone_Number: "flkj;d",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 100,
      Img: null,
      YearsOfExperience: 7,
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
  ];

  const trainerSpecialistData = [
    {
      ID_Trainer: 1,
      ID_Specialist: 1,
      Accepted: "t",
      Description:
        "Trainer 1 is paired with Specialist 1 and the request is accepted.",
    },
  ];

  React.useEffect(() => {
    let count = 0;
    trainerSpecialistData.forEach((data) => {
      if (
        data.ID_Specialist === item &&
        (data.Accepted === "t" || data.Accepted === "T")
      ) {
        count++;
      }
    });
    setCountTrainer(count);
  }, [trainerSpecialistData, item]);

  const userData = initialTableData.find((data) => data.ID_Specialist === item);

  const deleteUser = () => {
    const filteredData = initialTableData.filter(
      (data) => data.ID_Specialist !== item
    );
    console.log("Updated data: ", filteredData);
    setModalVisible(false);
  };

  const sendNotification = () => {
    alert(`Notification sent: ${notification}`);
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
                alt="Specialist Avatar"
                className="user-avatar"
              />
              <h2>{`${userData.First_Name} ${userData.Last_Name}`}</h2>
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
          </>
        ) : (
          <p>No data found for the selected specialist.</p>
        )}
      </div>
    </div>
  );
}

export default EditSpecialistModel;
