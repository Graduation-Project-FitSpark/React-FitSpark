import React, { useState, useEffect } from "react";
import "./AddAwards.css";
import Navbaradmin from "../homescreen/Navbaradmin";
import AddAwardsModel from "./AddAwardsModel";
const AddAwards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Awards, setAwards] = useState([
    { point: 20, photo: "20.png", name: "Fitness Titan" },
    { point: 40, photo: "40.png", name: "Strength Champion" },
    { point: 60, photo: "60.png", name: "Power Icon" },
    { point: 80, photo: "80.png", name: "Endurance Legend" },
    { point: 100, photo: "100.png", name: "Prime Athlete" },
    { point: 120, photo: "120.png", name: "Vitality Hero" },
    { point: 150, photo: "150.png", name: "Peak Performer" },
    { point: 170, photo: "170.png", name: "Muscle Maverick" },
    { point: 200, photo: "200.png", name: "Flex Master" },
  ]);

  useEffect(() => {
    const newAward = { point: 250, photo: "250.png", name: "Core Conqueror" };
    setAwards((prevAwards) => {
      const exists = prevAwards.some((award) => award.point === newAward.point);
      return exists ? prevAwards : [...prevAwards, newAward];
    });
  }, []);

  const addNewAward = (newAward) => {
    setAwards((prevAwards) => [...prevAwards, newAward]);
  };

  const pointAwards = () => {
    const elements = [];
    for (let i = 0; i < Awards.length; i += 6) {
      const batch = Awards.slice(i, i + 6);
      elements.push(
        <div key={i} className="batch-container">
          {batch.map((item, index) => (
            <div key={index} className="outer">
              <div className="outer-item">
                <img className="point-img" src={item.photo} alt={item.name} />
                <div className="name-point">
                  <p className="name-awards">{item.name}</p>
                  <p className="point-of">{item.point}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return elements;
  };

  return (
    <div>
      <Navbaradmin />

      <div className="container">
        <div className="scroll-container">
          <div className="header">
            <div className="inner-header">
              <h2 className="text-header">Awards</h2>
            </div>
          </div>
          <div>{pointAwards()}</div>
          <button
            className="add-award-button"
            onClick={() => setModalVisible(true)}
          >
            +
          </button>
          {modalVisible && (
            <AddAwardsModel
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAwards;
