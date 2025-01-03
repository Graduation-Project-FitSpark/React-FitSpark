import React, { useState, useEffect } from "react";
import "./Slideshow.css";

function Slidermotin() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "550px",
        backgroundImage: `url(${"https://theironoffice.com/cdn/shop/files/Gym_12.23-19.jpg?v=1701994187&width=3840"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        color: "white",
        fontSize: "3rem",
        fontWeight: "bold",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
        fontFamily: "'Poppins', sans-serif",
        animation: "fadeIn 2s ease-in-out",
      }}
    >
      <p
        style={{
          textDecoration: "underline",
          textDecorationColor: "#DB6539",
          textDecorationThickness: "4px",
        }}
      >
        Trainee Home Page
      </p>
    </div>
  );
}

export default Slidermotin;
