import React, { useState, useEffect } from "react";
import "./BodyParts.css";
import img1 from "../../img/body/hand-1.png";
import img2 from "../../img/body/hand-2.png";
import img3 from "../../img/body/feet.png";
import img4 from "../../img/body/body.png";
import URL from "../../enum/enum";
import axios from "axios";
const BodyParts = () => {
  const [hoveredPart, setHoveredPart] = useState(null);

  const [bodyFats, setBodyFats] = useState(0);
  const [bodyMuscle, setBodyMuscle] = useState(0);
  const [handFats, setHandFats] = useState(0);
  const [handMuscle, setHandMuscle] = useState(0);
  const [feetFats, setFeetFats] = useState(0);
  const [feetMuscle, setFeetMuscle] = useState(0);
  const [addvis, setAddvis] = useState([]);
  const [report, setreport] = useState("");

  useEffect(() => {
    const fetchAdditives = async () => {
      try {
        const username = localStorage.getItem("username");
        const trainerResponse = await axios.post(`${URL}/getTrainerDetails`, {
          username,
        });
        const details = trainerResponse.data.trainer;
        const openAiPrompt = `
You are an expert fitness trainer. Analyze the following user details and calculate approximate body metrics, including:
- Body fat percentage (bodyFats)
- Muscle mass percentage (bodyMuscle)
- Hand fat percentage (handFats)
- Hand muscle mass percentage (handMuscle)
- Feet fat percentage (feetFats)
- Feet muscle mass percentage (feetMuscle)

Additionally, provide:
- Personalized advice based on the user's attributes.
- A summary report describing the user's body composition and fitness recommendations.

### User Details:
- Age: ${details.Age}
- Weight: ${details.Weight}
- Height: ${details.Height}
- Gender: ${details.Gender}
- Class Type: ${details.Class_Type}
- Activity Level: ${details.Activity_Level}

### Important Instructions:
-Return the response **strictly** as JSON in the following format, without any additional text or explanations:
-Make a Muscle and Fats a Realistic as percentage
-Make the report maximum aas 10 lines
{
  "bodyFats": number,
  "bodyMuscle": number,
  "handFats": number,
  "handMuscle": number,
  "feetFats": number,
  "feetMuscle": number,
  "advice": [string],
  "report": string
}
`;

        const openAiResponse = await fetch(`${URL}/sendQuizResult`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: openAiPrompt }),
        });

        const openAiData = await openAiResponse.json();
        const parsedResponse = JSON.parse(openAiData.response);
        console.log(parsedResponse);

        if (parsedResponse) {
          setBodyFats(parsedResponse.bodyFats);
          setBodyMuscle(parsedResponse.bodyMuscle);
          setHandFats(parsedResponse.handFats);
          setHandMuscle(parsedResponse.handMuscle);
          setFeetFats(parsedResponse.feetFats);
          setFeetMuscle(parsedResponse.feetMuscle);
          setAddvis(parsedResponse.advice);
          setreport(parsedResponse.report);
        }
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchAdditives();
  }, []);
  const bodyParts = [
    {
      id: "body",
      image: img4,
      Fats: bodyFats,
      Muscle: bodyMuscle,
    },
    {
      id: "hand-left",
      image: img1,
      Fats: handFats,
      Muscle: handMuscle,
    },
    {
      id: "hand-right",
      image: img2,
      Fats: handFats,
      Muscle: handMuscle,
    },
    {
      id: "feet",
      image: img3,
      Fats: feetFats,
      Muscle: feetMuscle,
    },
  ];

  return (
    <div className="containerbody">
      <div className="side-section1">
        <div>
          <h3>Report</h3>
          <div>{report}</div>
        </div>
      </div>
      <div className="human-body">
        {bodyParts.map((part) => (
          <div
            key={part.id}
            className={`body-part ${part.id}`}
            onMouseEnter={() => setHoveredPart(part.id)}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <img src={part.image} alt={part.id} className="body-part-image" />
            {hoveredPart === part.id && (
              <div className="info-tooltip">
                <div>Fats: {part.Fats}%</div>
                <div>Muscle: {part.Muscle}%</div>
              </div>
            )}
          </div>
        ))}

        <div className="progress-container">
          <div className="progress-section">
            <p>Fats:</p>
            <progress value={bodyFats + handFats + feetFats} max="100" />
            <p>{bodyFats + handFats + feetFats}%</p>
          </div>
          <div className="progress-section2">
            <p>Muscle:</p>
            <progress value={bodyMuscle + handMuscle + feetMuscle} max="100" />
            <p>{bodyMuscle + handMuscle + feetMuscle}%</p>
          </div>
        </div>
      </div>
      <div className="side-section">
        <p style={{ fontWeight: "bold" }}>Advice:</p>

        {addvis.map((advice, index) => (
          <div key={index}>
            <div>
              <div>- {advice}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyParts;
