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
        <div key={i} className="batch-container-ADDD">
          {batch.map((item, index) => (
            <div key={index} className="outer-ADDD">
              <div className="outer-item-ADDD">
                <img
                  className="point-img-ADDD"
                  src={item.photo}
                  alt={item.name}
                />
                <div className="name-point-ADDD">
                  <p className="name-awards-ADDD">{item.name}</p>
                  <p className="point-of-ADDD">{item.point}</p>
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

      <div className="container-ADDD">
        <div className="scroll-container-ADDD">
          <div className="header-ADDD">
            <div className="inner-header-ADDD">
              <h2 className="text-header-ADDD">Awards</h2>
            </div>
          </div>
          <div>{pointAwards()}</div>
          <button
            className="add-award-button-ADDD"
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
