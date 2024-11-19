import React, { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import "./Notifications.css";
import { FaBell } from "react-icons/fa";

function Notificationspage() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchedNotifications = [
      {
        id: "1",
        name: "Hey there, fitness warrior! 💪 Every step, every rep, every drop of sweat brings you closer.",
      },
      {
        id: "2",
        name: "Keep pushing, keep showing up, because you’re unstoppable!",
      },
      {
        id: "3",
        name: "Stay hydrated and stay motivated. You're doing great!",
      },
    ];
    setNotifications(fetchedNotifications);
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

export default Notificationspage;
