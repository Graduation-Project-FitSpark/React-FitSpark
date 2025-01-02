import React, { useEffect, useState } from "react";
import "./TitleName.css";

function TitleName() {
  const [nameofuser, setnameofuser] = useState("");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning Sir 🔥" : "Good Evening Sir 🔥";
  const userData = { name: nameofuser };
  useEffect(() => {
    setnameofuser(localStorage.getItem("username"));
  }, []);
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="welcome">
      <p>{greeting}</p>
      <div className="namedate">
        <span className="name">{userData.name}</span>
        <span className="date">{date}</span>
      </div>
    </div>
  );
}

export default TitleName;
