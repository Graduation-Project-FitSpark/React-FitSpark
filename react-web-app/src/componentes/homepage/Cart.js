import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../MyProvider";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import Navbarhomepage from "./Navbarhomepage";
import {
  IoBarbell,
  IoPersonAdd,
  IoFastFood,
  IoPeople,
  IoBasket,
  IoCashOutline,
  IoLogoPaypal,
  IoCart,
} from "react-icons/io5";
import { RiVisaLine } from "react-icons/ri";
import complet from "../../img/7efs-maker-unscreen.gif";
function Cart() {
  const { sharedValue } = useContext(MyContext);
  const [Items, setItems] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [setshowvias, setsetshowvias] = useState(false);
  const [showcash, setshowcash] = useState(false);
  const [showpaypal, setshowpaypal] = useState(false);
  const [ID_Trainer, setID_Trainer] = useState(10); //جيب الاي دي تا الي داخل منو الحساب
  const [showcompletl, setshowcompletl] = useState(false);

  useEffect(() => {
    let calculatedTotal = 0;
    Items.forEach((item) => {
      calculatedTotal += item.Price * item.Quantity;
    });
    setTotal(calculatedTotal);
  }, [Items]);
  useEffect(() => {
    if (showcompletl) {
      const timer = setTimeout(() => {
        setshowcompletl(false);
        navigate("/Shop");
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [showcompletl]);
  const deliveryCost = 10.0;
  const finalTotal = total + deliveryCost;

  const finalpay = () => {
    const currentDate = new Date().toISOString();

    const updatedItems = Items.map((item) => ({
      ...item,
      ID_Trainer: ID_Trainer,
      Dateenter: currentDate,
    }));

    console.log("Updated Items with additional properties:", updatedItems);
    setshowcompletl(true);
  };

  useEffect(() => {
    if (!Array.isArray(sharedValue) && Object.keys(sharedValue).length === 0) {
      console.log("sharedValue is an empty object");
    } else {
      const newItem = Array.isArray(sharedValue)
        ? [...sharedValue]
        : [
            {
              ID_Sale: sharedValue.id,
              Salee_Name: sharedValue.name,
              Price: sharedValue.price,
              Quantity: sharedValue.quantity,
              Size: sharedValue.size,
              Description: sharedValue.description,
              Product_Name: sharedValue.Product_Name,
            },
          ];

      setItems(newItem);
    }
  }, [sharedValue]);

  const updateQuantity = (newQuantity, state) => {
    state === 1
      ? setItems((prevItems) =>
          prevItems.map((item) =>
            item.ID_Sale === newQuantity
              ? { ...item, Quantity: item.Quantity + 1 }
              : item
          )
        )
      : setItems((prevItems) =>
          prevItems.map((item) =>
            item.ID_Sale === newQuantity
              ? {
                  ...item,
                  Quantity:
                    item.Quantity > 1 ? item.Quantity - 1 : item.Quantity,
                }
              : item
          )
        );
  };

  const updateItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.ID_Sale !== id));
  };

  const printItems = () => {
    navigate("/checkout", { state: { Items } });
  };

  return (
    <div className="cart-container-all">
      <Navbarhomepage />
      <div className="cart-container-all-padding">
        <div className="head-cart">
          <div className="top-view">
            <IoCart
              size={50}
              color="#ea9c82"
              onClick={() => navigate("/Cart")}
              className="card-icon-cart"
            />
            <h1 className="header-text-cart">Summary</h1>
          </div>
        </div>
        <div className="cart-container">
          <div className="cart-items">
            {Items && Items.length > 0 ? (
              Items.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="item-info">
                    <div className="item-header">
                      <button
                        className="remove-button"
                        onClick={() => updateItem(item.ID_Sale)}
                      >
                        &#10006;
                      </button>
                      <p className="item-name">{item.Salee_Name}</p>
                    </div>
                    <p className="Price-cart">Price: ${item.Price}</p>
                    <div className="quantity-size">
                      <div className="quantity-controls">
                        <button
                          className="quantity-button-cart"
                          onClick={() => updateQuantity(item.ID_Sale, 1)}
                        >
                          +
                        </button>
                        <span className="quantity-value">{item.Quantity}</span>
                        <button
                          className="quantity-button-cart"
                          onClick={() => updateQuantity(item.ID_Sale, 0)}
                        >
                          -
                        </button>
                      </div>
                      <p className="size">Size: {item.Size}</p>
                    </div>
                  </div>
                  <img
                    src="https://p7.hiclipart.com/preview/548/366/440/dietary-supplement-whey-protein-isolate-optimum-nutrition-gold-standard-100-whey-protein-thumbnail.jpg"
                    alt="Product"
                    className="item-image-cart"
                  />
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </div>

          <div className="checkout">
            <div className="summary-item-outer">
              <div className="summary-item">
                <span className="label">Total Required:</span>
                <span className="value">${total.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span className="label">Delivery Cost:</span>
                <span className="value">${deliveryCost.toFixed(2)}</span>
              </div>
              <div className="final-item">
                <span className="label">TOTAL:</span>
                <span className="value">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            {/*اذا بدك حط هون الخريطة  */}
            <div className="pay">
              <button
                className={`pay-button ${
                  setshowvias ? "pay-button-active" : ""
                }`}
                onClick={() => {
                  setsetshowvias((prev) => !prev);
                  setshowcash(false);
                  setshowpaypal(false);
                }}
              >
                <RiVisaLine size={30} color="#000" />
              </button>
              <button
                className={`pay-button ${
                  showpaypal ? "pay-button-active" : ""
                }`}
                onClick={() => {
                  setshowpaypal((prev) => !prev);
                  setsetshowvias(false);
                  setshowcash(false);
                }}
              >
                <IoLogoPaypal size={30} color="#000" />
              </button>
              <button
                className={`pay-button ${showcash ? "pay-button-active" : ""}`}
                onClick={() => {
                  setshowcash((prev) => !prev);
                  setsetshowvias(false);
                  setshowpaypal(false);
                }}
              >
                <IoCashOutline size={30} color="#000" />
              </button>
            </div>

            {setshowvias && (
              <div>
                <label className="label">CARDHOLDER'S NAME</label>
                <input className="input" placeholder="John Doe" />

                <label className="label">CARD NUMBER</label>
                <input
                  className="input"
                  placeholder="•••• •••• •••• 1234"
                  type="text"
                />

                <div className="row">
                  <div className="column">
                    <label className="label">EXP DATE</label>
                    <input
                      className="input"
                      placeholder="MM/YYYY"
                      type="text"
                    />
                  </div>
                  <div className="column">
                    <label className="label">CVC/CVV2</label>
                    <input className="input" placeholder="•••" type="text" />
                  </div>
                </div>
              </div>
            )}

            {showcash && (
              <div className="cash-container">
                <h2 className="cash-title">Cash Payment</h2>
                <p className="cash-text">
                  Please prepare the exact amount: ${finalTotal.toFixed(2)}
                </p>
                <input
                  className="input"
                  placeholder="Enter any instructions for the delivery person "
                />
                <div className="cash-instructions">
                  <p>
                    The delivery person will collect the cash upon delivery.
                  </p>
                </div>
              </div>
            )}

            {showpaypal && (
              <div className="cash-container">
                <h2 className="cash-title">
                  PayPal is not supported, it will be available soon.
                </h2>
              </div>
            )}
            {showcompletl && (
              <div className="modal-count-curt">
                <div className="modal-curt">
                  <img
                    src={complet}
                    alt="Modal Content"
                    className="modal-image-curt"
                  />
                </div>
              </div>
            )}
            <button className="submit-button" onClick={finalpay}>
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
