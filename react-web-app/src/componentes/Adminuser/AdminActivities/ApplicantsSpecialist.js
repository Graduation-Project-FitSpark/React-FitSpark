import React, { useState, useEffect } from "react";
import "./ApplicantsSpecialist.css";
import Navbaradmin from "../homescreen/Navbaradmin";
import URL from "../../../enum/enum";
import axios from "axios";
function ApplicantsSpecialist() {
  const [countSpecialists, setCountSpecialists] = useState(0);

  const [specialists, setSpecialists] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response3 = await fetch(`${URL}/getAllSepcialistsAdmin`);

        if (!response3.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        const data3 = await response3.json();
        setSpecialists(data3);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const acceptedCount = specialists.filter(
      (specialist) => specialist.AcceptedDescription.toLowerCase() === "a"
    ).length;
    setCountSpecialists(acceptedCount);
  }, [specialists]);

  const handleAccept = async (id) => {
    try {
      const updatedSpecialists = specialists.map((specialist) =>
        specialist.ID_Specialist === id
          ? { ...specialist, AcceptedDescription: "A" }
          : specialist
      );

      setSpecialists(updatedSpecialists);

      const response = await fetch(`${URL}/EditSpecialistsAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpecialists),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const data = await response.json();
      console.log("Spec details updated:", data);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const updatedSpecialists = specialists.map((specialist) =>
        specialist.ID_Specialist === id
          ? { ...specialist, AcceptedDescription: "R" }
          : specialist
      );

      setSpecialists(updatedSpecialists);
      const response = await fetch(`${URL}/EditSpecialistsAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpecialists),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const data = await response.json();
      console.log("Spec details updated:", data);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div>
      <Navbaradmin />
      <div className="specialists-container">
        <div className="header">
          <h2>Request Nutration Expert</h2>
          <p>Nutraion Experts in the system: {countSpecialists}</p>
        </div>

        <div className="specialists-list">
          {specialists
            .filter(
              (specialist) =>
                specialist.AcceptedDescription.toLowerCase() === "p"
            )
            .map((specialist) => (
              <div key={specialist.ID_Specialist} className="specialist-card">
                <div className="specialist-details">
                  <img
                    src={specialist.Img || "default-avatar.png"}
                    alt="Specialist Avatar"
                    className="specialist-image"
                  />
                  <div className="specialist-info">
                    <div className="specialist-info-iner">
                      <p>
                        <strong>Name:</strong> {specialist.First_Name}{" "}
                        {specialist.Last_Name}
                      </p>
                      <p>
                        <strong>Age:</strong> {specialist.Age}
                      </p>
                    </div>
                    <div className="specialist-info-iner">
                      <p>
                        <strong>Gender:</strong> {specialist.Gender}
                      </p>
                      <p>
                        <strong>Experience:</strong>{" "}
                        {specialist.YearsOfExperience} years
                      </p>
                    </div>
                  </div>
                </div>
                <p className="specialist-description">
                  {specialist.Description}
                </p>
                <div className="actions">
                  <button
                    className="accept-button"
                    onClick={() => handleAccept(specialist.ID_Specialist)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(specialist.ID_Specialist)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ApplicantsSpecialist;
