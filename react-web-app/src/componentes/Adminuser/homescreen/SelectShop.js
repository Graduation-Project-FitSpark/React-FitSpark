import React from "react";
import { useNavigate } from "react-router-dom";
import "./SelectShop.css";
import Navbaradmin from "./Navbaradmin";
function SelectShop() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbaradmin />
      <div className="chosseuser">
        <div className="inerchosseuser">
          <h1 className="titleUsers">Select Your Option</h1>
          <div className="cardsContainer">
            <div className="cardsContainer-top">
              <div
                className="card-cho"
                onClick={() => navigate("/AddItems")}
                role="button"
                tabIndex={0}
                onKeyDown={() => navigate("/add-item")}
              >
                <div
                  className="backgroundImage"
                  style={{
                    backgroundImage:
                      "url('https://png.pngtree.com/thumb_back/fh260/background/20230718/pngtree-digital-retailing-illustration-laptop-keyboard-with-shopping-basket-and-e-commerce-image_3903657.jpg')",
                  }}
                >
                  <div className="boxshwdo">
                    <p className="text-ch">Add New Items</p>
                  </div>
                </div>
              </div>

              <div
                className="card-cho"
                onClick={() => navigate("/SalesStatistics")}
                role="button"
                tabIndex={0}
              >
                <div
                  className="backgroundImage"
                  style={{
                    backgroundImage:
                      "url('https://thumbs.dreamstime.com/b/financial-background-digital-illustration-63048926.jpg')",
                  }}
                >
                  <div className="boxshwdo">
                    <p className="text-ch">See The Last Sales Updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectShop;
