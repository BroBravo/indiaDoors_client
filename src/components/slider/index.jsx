import { useState, useEffect } from 'react';
import styles from "./index.module.scss"; 

function Slider() {
  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images
  const images = [
    "/slider_pics/plywood.jpg",
    "/slider_pics/plywood2.avif",
    "/slider_pics/door1.webp",
    "/slider_pics/door2.webp"
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
  
    useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval); // ✅ Clear on unmount
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div className={`${styles.arrow} ${styles.left}`} onClick={handlePrev}>
        <img className={styles.fullImage} src="slider_pics/arrowIcon.png" alt="Previous" />
      </div>

      <div 
        className={styles.slider} 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className={styles.sliderImageContainer} key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className={`${styles.arrow} ${styles.right}`} onClick={handleNext}>
        <img className={styles.fullImage} src="slider_pics/arrowIcon.png" alt="Next" />
      </div>
    </div>
  );
}

export default Slider;

