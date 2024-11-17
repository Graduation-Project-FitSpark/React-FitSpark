import React, { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa"; // Icon replacement for web
import "./Notifications.css"; // Assuming you're using CSS for styling
import { FaBell } from "react-icons/fa"; // FontAwesome bell icon

function Notificationspage() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications
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
            color: showNotifications ? "#5ce65c" : "rgb(236, 91, 39)", // Change color here
            fontSize: "30px", // Adjust icon size if needed
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
