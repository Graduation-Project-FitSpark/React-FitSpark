import React, { useState, useEffect } from "react";
import "./Slideshow.css";
import img1 from "../../img/slider-2.jpg";
import img2 from "../../img/slider-1.png";
import img3 from "../../img/slider-3.png";
function Slidermotin() {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  const showSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  };

  return (
    <div>
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src={img1} style={{ width: "100%" }} alt="Nature" />
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src={img2} style={{ width: "100%" }} alt="Snow" />
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src={img3} style={{ width: "100%" }} alt="Mountains" />
        </div>
      </div>
      <br />

      <div
        style={{
          marginTop: -50,
          zIndex: 1,
          position: "absolute",
        }}
      >
        <span className="dot" onClick={() => setSlideIndex(1)}></span>
        <span className="dot" onClick={() => setSlideIndex(2)}></span>
        <span className="dot" onClick={() => setSlideIndex(3)}></span>
      </div>
    </div>
  );
}

export default Slidermotin;
