//import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const DoorPriceCalculator = ({ frontWrap, backWrap, frontCarving, backCarving, baseWoodPrice, doorWidthInches, doorHeightInches, doorCount, setDoorCount }) => {
 // const [doorCount, setDoorCount] = useState(quantity);

  const getPrice = (item) => (item?.price ? parseFloat(item.price) : 0);

  const frontWrapPrice = getPrice(frontWrap);
  const backWrapPrice = getPrice(backWrap);
  const frontCarvingPrice = getPrice(frontCarving);
  const backCarvingPrice = getPrice(backCarving);

  // Calculate wood-only price per sqft
  const widthFt = doorWidthInches / 12;
  const heightFt = doorHeightInches / 12;
  const sqft = widthFt * heightFt;
  const pricePerDoor = sqft > 0 ? (baseWoodPrice * sqft).toFixed(2) : "N/A";
   
  const totalPerDoor = (frontWrapPrice + backWrapPrice + frontCarvingPrice + backCarvingPrice + (pricePerDoor==="N/A"?0:parseFloat(pricePerDoor))).toFixed(2);
  const totalAllDoors = (totalPerDoor * doorCount).toFixed(2); 

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) setDoorCount(value);
  };

  const increment = () => setDoorCount(prev => prev + 1);
  const decrement = () => setDoorCount(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.calculator}>
      <h2 style={{color:"rgba(84, 43, 5, 0.919)"}}>Door Pricing</h2>
      <div className={styles.counter}>
        <label>Number of doors: </label>
        <button onClick={decrement} className={styles.customButton}>-</button>  
        <input type="number" value={doorCount} onChange={handleChange} min="1" />
        <button onClick={increment} className={styles.customButton}>+</button>
      </div>
      <div><strong>
          Wood Price per Sq.Ft: ₹{baseWoodPrice}
          </strong>
        </div><br/>
      <div className={styles.grid}>
        <div>Raw Wood Door</div><div>₹{pricePerDoor}</div>
        <div>Front Wrap</div><div>₹{frontWrapPrice}</div>
        <div>Back Wrap</div><div>₹{backWrapPrice}</div>
        <div>Front Carving</div><div>₹{frontCarvingPrice}</div>
        <div>Back Carving</div><div>₹{backCarvingPrice}</div>
        <div><strong>Total / Door</strong></div><div><strong>₹{totalPerDoor}</strong></div>
        <div><strong>Total ({doorCount} doors)</strong></div><div><strong>₹{totalAllDoors}</strong></div>
        
      </div>
    </div>
  );
};

export default DoorPriceCalculator;
