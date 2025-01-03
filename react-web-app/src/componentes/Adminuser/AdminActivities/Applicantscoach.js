import React, { useState, useEffect } from "react";
import "./Applicantscoach.css";
import Navbaradmin from "../homescreen/Navbaradmin";
import URL from "../../../enum/enum";
import axios from "axios";
function Applicants() {
  const [countTrainers, setCountTrainers] = useState(0);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response2 = await fetch(`${URL}/getAllCoachesAdmin`);
        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setCoaches(data2);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const acceptedCount = coaches.filter(
      (coach) => coach.AcceptedDescription.toLowerCase() === "a"
    ).length;
    setCountTrainers(acceptedCount);
  }, [coaches]);

  const handleAccept = async (id) => {
    try {
      const updatedCoaches = coaches.map((coach) =>
        coach.ID_Coach === id ? { ...coach, AcceptedDescription: "A" } : coach
      );

      setCoaches(updatedCoaches);

      const response = await fetch(`${URL}/EditCoachsAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCoaches), // Use the updated coaches list here
      });

      if (!response.ok) {
        throw new Error("Failed to update coach details");
      }

      const data = await response.json();
      console.log("Coach details updated:", data);
    } catch (error) {
      console.error("Error updating coach details:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const updatedCoaches = coaches.map((coach) =>
        coach.ID_Coach === id ? { ...coach, AcceptedDescription: "R" } : coach
      );

      setCoaches(updatedCoaches);
      const response = await fetch(`${URL}/EditCoachsAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCoaches),
      });

      if (!response.ok) {
        throw new Error("Failed to update coach details");
      }

      const data = await response.json();
      console.log("Coach details updated:", data);
    } catch (error) {
      console.error("Error updating coach details:", error);
    }
  };

  return (
    <div>
      <Navbaradmin />
      <div className="applicants-container">
        <div className="header">
          <h2>Request Coach</h2>
          <p>Coaches in the system: {countTrainers} Coaches</p>
        </div>

        <div className="coaches-list">
          {coaches
            .filter((coach) => coach.AcceptedDescription === "P")
            .map((coach) => (
              <div key={coach.ID_Coach} className="coach-card">
                <div className="coach-details">
                  <img
                    src={coach.Img || "default-avatar.png"}
                    alt="Coach Avatar"
                    className="coach-image"
                  />
                  <div className="coach-info">
                    <div className="coach-info-iner">
                      <p>
                        <strong>Name:</strong> {coach.First_Name}{" "}
                        {coach.Last_Name}
                      </p>
                      <p>
                        <strong>Age:</strong> {coach.Age}
                      </p>
                    </div>
                    <div className="coach-info-iner">
                      <p>
                        <strong>Gender:</strong> {coach.Gender}
                      </p>
                      <p>
                        <strong>Experience:</strong> {coach.YearsOfExperience}{" "}
                        years
                      </p>
                    </div>
                  </div>
                </div>
                <p className="coach-description">{coach.Description}</p>
                <div className="actions">
                  <button
                    className="accept-button"
                    onClick={() => handleAccept(coach.ID_Coach)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(coach.ID_Coach)}
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

export default Applicants;
