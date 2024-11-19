import React, { useState, useEffect } from "react";
import "./BodyParts.css";
import img1 from "../../img/body/hand-1.png";
import img2 from "../../img/body/hand-2.png";
import img3 from "../../img/body/feet.png";
import img4 from "../../img/body/body.png";

const BodyParts = () => {
  const [hoveredPart, setHoveredPart] = useState(null);

  const [bodyFats, setBodyFats] = useState(20);
  const [bodyMuscle, setBodyMuscle] = useState(60);
  const [handFats, setHandFats] = useState(0);
  const [handMuscle, setHandMuscle] = useState(0);
  const [feetFats, setFeetFats] = useState(0);
  const [feetMuscle, setFeetMuscle] = useState(0);
  const [addvis, setAddvis] = useState([]);
  const [report, setreport] = useState([]);

  useEffect(() => {
    const fetchAdditives = async () => {
      const fetchedAdditives = [
        { id: 1, name: "Protein Powder" },
        { id: 2, name: "Creatine" },
        { id: 3, name: "BCAAs" },
        { id: 4, name: "Energy Bar" },
        { id: 5, name: "Electrolyte Drink" },
      ];
      setAddvis(fetchedAdditives); //هون بتاخذ النصائح من الاوبن ا اي وبتعملها ست
    };

    const reportform = async () => {
      const fetchedAdditives = [
        { id: 1, name: "Protein Powder" },
        { id: 2, name: "Creatinea" },
        { id: 3, name: "BCAAs" },
        { id: 4, name: "Energy Bar" },
        { id: 5, name: "Electrolyte Drink" },
      ];
      setreport(fetchedAdditives); // وطبعا لازمتمسح كل اشي جوا  الاريي ، هون بتاخذ البربوت من الاوبن ا اي وبتعملها ست
    };
    reportform();
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
        <p style={{ fontWeight: "bold" }}>Report:</p>
        {report.map((part) => (
          <div key={part.id}>
            <div>
              <div>-{part.name}</div>
            </div>
          </div>
        ))}
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

        {/* Progress Bars at the Bottom */}
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
        <p style={{ fontWeight: "bold" }}>Addvis:</p>

        {addvis.map((part) => (
          <div key={part.id}>
            <div>
              <div>-{part.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyParts;
