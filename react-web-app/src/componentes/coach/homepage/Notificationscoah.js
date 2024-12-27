import React, { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import "./Notificationscoah.css";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import URL from "../../../enum/enum";

function Notificationspagecoach() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const username = localStorage.getItem("username");
      try {
        const response = await axios.post(`${URL}/getNotifications`, {
          Msg_To: username,
        });

        const data = response.data.notifications.map((item) => ({
          id: item.Date,
          name: item.Description,
        }));

        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div className="container2">
      <button
        className="notification-button"
        onClick={toggleNotifications}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <FaBell
          style={{
            color: showNotifications ? "#5ce65c" : "rgb(236, 91, 39)",
            fontSize: "30px",
          }}
        />
      </button>

      {showNotifications && (
        <div className="notifications-list">
          {notifications.map((item) => (
            <div key={item.id} className="notification">
              <span className="timestamp">2m ago</span>
              <p className="notification-text">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notificationspagecoach;
