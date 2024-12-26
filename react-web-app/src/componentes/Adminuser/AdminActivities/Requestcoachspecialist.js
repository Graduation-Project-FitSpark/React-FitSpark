import React from "react";
import "./Chosseuser.css";
import { useNavigate } from "react-router-dom";
import Navbaradmin from "../homescreen/Navbaradmin";
function Requestcoachspecialist() {
  const navigate = useNavigate();
  return (
    <div className="chosseuser">
      <Navbaradmin />
      <div className="inerchosseuser">
        <h1 className="titleUsers">Users Applicants </h1>
        <div className="cardsContainer">
          <div className="cardsContainer-top">
            <div
              className="card-cho backgroundImage"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/675179390/photo/muscular-trainer-writing-on-clipboard.jpg?s=612x612&w=0&k=20&c=9NKx1AwVMpPY0YBlk5H-hxx2vJSCu1Wc78BKRM9wFq0=')",
              }}
              onClick={() => navigate("/Applicantscoach")}
            >
              <div className="boxshwdo">
                <h2 className="text-ch">Coach</h2>
              </div>
            </div>
            <div
              className="card-cho backgroundImage"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/1044382612/photo/beautiful-smiling-nutritionist-looking-at-camera-and-showing-healthy-vegetables-in-the.jpg?s=612x612&w=0&k=20&c=2-C7hNt9QkxDc6g7YaCTmY1akX9gjwOO137EhnDceV0=')",
              }}
              onClick={() => navigate("/ApplicantsSpecialist")}
            >
              <div className="boxshwdo">
                <h2 className="text-ch">Nutritionist</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requestcoachspecialist;
