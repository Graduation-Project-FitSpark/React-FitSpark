import React from "react";
import "./Messenger.css";
import messenger from "../../../img/messenger.jpg";
import { IoChevronForwardOutline } from "react-icons/io5";
function Messenger() {
  return (
    <div className="container-messenger">
      <div className="container-messenger-inner">
        <div
          className="image-background1"
          style={{ backgroundImage: `url(${messenger})` }}
        >
          <div className="text-container-outer">
            <div className="text-container">
              <p className="title-text">Messaging System</p>
            </div>
            <div className="container-button-text">
              <div className="fake-container"></div>
              <div className="button-container">
                <button className="button-textMessenger1">
                  <IoChevronForwardOutline size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
