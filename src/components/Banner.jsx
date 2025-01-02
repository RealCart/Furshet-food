import React, { useState } from "react";
import Slider from '/image/banner_picture.svg';
import BunnerBtn from '/Icons/banner_btn.svg';
import "../styles/Banner.css";

const Banner = () => {
  const slides = [
      Slider,
      Slider,
      Slider,
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <div className="slider_wrapper">
        <div className="slider-btn prev" onClick={prevSlide}>
          <img src={BunnerBtn} alt="Назад" />
        </div>
        <div className="slides_wrapper">
          <div 
            className="slides"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}  
          >
            {slides.map((item, index) => (
              <div className="slide" key={index}> 
                <img src={item} alt={`Слайд ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="slider-btn next" onClick={nextSlide}>
          <img src={BunnerBtn} alt="Вперед" />
        </div>
      </div>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;