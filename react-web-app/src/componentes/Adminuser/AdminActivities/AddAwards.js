import React, { useState, useEffect } from "react";
import "./AddAwards.css";
import Navbaradmin from "../homescreen/Navbaradmin";
import AddAwardsModel from "./AddAwardsModel";
import URL from "../../../enum/enum";
import axios from "axios";
const AddAwards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(`${URL}/getAwards`);
        if (!response.ok) {
          throw new Error("Failed to fetch awards");
        }

        const data = await response.json();
        const awards = data.awards.map((award) => ({
          ...award,
          photo: award.photoUrl,
        }));
        setAwards(awards);
        console.log(awards);
      } catch (error) {
        console.error("Error fetching awards:", error);
      }
    };

    fetchAwards();
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
