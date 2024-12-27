import React, { useState, useEffect } from "react";
import "./Applicantscoach.css";
import Navbaradmin from "../homescreen/Navbaradmin";
function Applicants() {
  const [countTrainers, setCountTrainers] = useState(0);
  const [coaches, setCoaches] = useState([
    {
      ID_Coach: 1,
      Username: "Ali",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 200,
      Img: null,
      YearsOfExperience: 7,
      AcceptedDescription: "A",
      Description: "trehthrhrthhr",
    },
    {
      ID_Coach: 2,
      Username: "AhmadA",
      First_Name: "Ahmad",
      Last_Name: "A",
      Age: 12,
      Gender: "Female",
      Location: "Genen",
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
      AcceptedDescription: "P",
      Description: "sdfsdfwre4t43t535",
    },
  ]);

  useEffect(() => {
    const acceptedCount = coaches.filter(
      (coach) => coach.AcceptedDescription.toLowerCase() === "a"
    ).length;
    setCountTrainers(acceptedCount);
  }, [coaches]);

  const handleAccept = (id) => {
    setCoaches((prevCoaches) =>
      prevCoaches.map((coach) =>
        coach.ID_Coach === id ? { ...coach, AcceptedDescription: "A" } : coach
      )
    );
  };

  const handleReject = (id) => {
    setCoaches((prevCoaches) =>
      prevCoaches.map((coach) =>
        coach.ID_Coach === id ? { ...coach, AcceptedDescription: "R" } : coach
      )
    );
  };

  return (
    <div>
      <Navbaradmin />
      <div className="applicants-container">
        <div className="header">
          <h2>Request Coach</h2>
          <p>Coaches in the system: {countTrainers} Trainees</p>
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
