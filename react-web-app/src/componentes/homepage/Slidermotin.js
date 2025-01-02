import React, { useState, useEffect } from "react";
import "./Slideshow.css";
import img1 from "../../img/slider-2.jpg";
import img2 from "../../img/slider-1.png";
import img3 from "../../img/slider-3.png";

function Slidermotin() {
  const [slideIndex, setSlideIndex] = useState(3); // Initially set to show the third image

  useEffect(() => {
    showSlides(slideIndex); // Always show the third slide
  }, [slideIndex]);

  const showSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; // Hide all slides
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show only the third slide and make it active
    if (slides[2]) {
      // The third slide is at index 2
      slides[2].style.display = "block";
      dots[2].className += " active"; // Activate the third dot
    }
  };

  return (
    <div>
      <div className="slideshow-container">
        <div className="mySlides">
          <img src={img1} style={{ width: "100%" }} alt="Nature" />
        </div>

        <div className="mySlides">
          <img src={img2} style={{ width: "100%" }} alt="Snow" />
        </div>

        <div className="mySlides">
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
