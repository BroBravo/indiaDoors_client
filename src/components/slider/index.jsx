import { useState } from 'react';
import './index.scss';

function Slider(props) {
  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array of images
  const images = [
    "/schoolpic1.jpeg",
    "/schoolpic2.jpeg",
    "/schoolpic3.jpeg",
    "/schoolpic4.jpeg"
  ];

  // Function to handle right arrow click
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle left arrow click
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="sliderContainer">
      <div className="arrow left" onClick={handlePrev}>
        <img className="fullImage" src="arrowIcon.png" alt="Previous"/>
      </div>

      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="imageContainer" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="arrow right" onClick={handleNext}>
        <img className="fullImage" src="arrowIcon.png" alt="Next"/>
      </div>
    </div>
  );
}

export default Slider;
