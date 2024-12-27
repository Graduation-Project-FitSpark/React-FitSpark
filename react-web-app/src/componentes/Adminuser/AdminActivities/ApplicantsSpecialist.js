import React, { useState, useEffect } from "react";
import "./ApplicantsSpecialist.css";
import Navbaradmin from "../homescreen/Navbaradmin";
function ApplicantsSpecialist() {
  const [countSpecialists, setCountSpecialists] = useState(0);

  const [specialists, setSpecialists] = useState([
    {
      ID_Specialist: 1,
      Username: "Ali",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 100,
      Img: null,
      YearsOfExperience: 7,
      AcceptedDescription: "P",
      Description: "trehthrhrthhr",
    },
    {
      ID_Specialist: 2,
      Username: "AhmadA",
      First_Name: "Ahmad",
      Last_Name: "A",
      Age: 12,
      Gender: "Female",
      Location: "Genen",
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
      AcceptedDescription: "A",
      Description: "sdfsdfwre4t43t535",
    },
  ]);

  useEffect(() => {
    const acceptedCount = specialists.filter(
      (specialist) => specialist.AcceptedDescription.toLowerCase() === "a"
    ).length;
    setCountSpecialists(acceptedCount);
  }, [specialists]);

  const handleAccept = (id) => {
    setSpecialists((prevSpecialists) =>
      prevSpecialists.map((specialist) =>
        specialist.ID_Specialist === id
          ? { ...specialist, AcceptedDescription: "A" }
          : specialist
      )
    );
  };

  const handleReject = (id) => {
    setSpecialists((prevSpecialists) =>
      prevSpecialists.map((specialist) =>
        specialist.ID_Specialist === id
          ? { ...specialist, AcceptedDescription: "R" }
          : specialist
      )
    );
  };

  return (
    <div>
      <Navbaradmin />
      <div className="specialists-container">
        <div className="header">
          <h2>Request Specialist</h2>
          <p>Specialists in the system: {countSpecialists}</p>
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
