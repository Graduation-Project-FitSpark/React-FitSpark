import React from "react";
import "./Chosseuser.css";
import { useNavigate } from "react-router-dom";
import Navbaradmin from "../homescreen/Navbaradmin";
function Chosseuser() {
  const navigate = useNavigate();
  return (
    <div className="chosseuser">
      <Navbaradmin />
      <div className="inerchosseuser">
        <h1 className="titleUsers">Users Tables</h1>
        <div className="cardsContainer">
          <div className="cardsContainer-top">
            <div
              className="card-cho backgroundImage"
              style={{
                backgroundImage:
                  "url('https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/07/12/Pictures/_27cfe576-a4b3-11e9-88eb-6879d27b9db7.jpg')",
              }}
              onClick={() => navigate("/EditTrainees")}
            >
              <div className="boxshwdo">
                <h2 className="text-ch">Trainees Table</h2>
              </div>
            </div>

            <div
              className="card-cho backgroundImage"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/675179390/photo/muscular-trainer-writing-on-clipboard.jpg?s=612x612&w=0&k=20&c=9NKx1AwVMpPY0YBlk5H-hxx2vJSCu1Wc78BKRM9wFq0=')",
              }}
              onClick={() => navigate("/EditCoach")}
            >
              <div className="boxshwdo">
                <h2 className="text-ch">Coach Table</h2>
              </div>
            </div>
          </div>
          <div className="cardsContainer-bottom">
            <div
              className="card-cho backgroundImage"
              style={{
                backgroundImage:
                  "url('https://media.istockphoto.com/id/1044382612/photo/beautiful-smiling-nutritionist-looking-at-camera-and-showing-healthy-vegetables-in-the.jpg?s=612x612&w=0&k=20&c=2-C7hNt9QkxDc6g7YaCTmY1akX9gjwOO137EhnDceV0=')",
              }}
              onClick={() => navigate("/EditSpecialist")}
            >
              <div className="boxshwdo">
                <h2 className="text-ch">Nutritionist Table</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chosseuser;
