import React, { useState, useEffect } from "react";
import "./TitleName.css";

function TitleName() {
  const [nameofuser, setnameofuser] = useState("Mahmoud");
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : "Good Evening";
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        let username = localStorage.getItem("username");
        setnameofuser(username);
      } catch (error) {
        console.error("Error With Coaches:", error);
      }
    };

    fetchAdmin();
  }, []);
  const userData = { name: nameofuser };
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="welcome">
      <span>{greeting} Admin🔥</span>
      <div className="namedate">
        <span className="name">{userData.name}</span>
        <span className="date">{date}</span>
      </div>
    </div>
  );
}

export default TitleName;
