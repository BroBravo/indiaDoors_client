import  { useState } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";

const FlipDoor = ({ frontWrap, backWrap, frontCarving, backCarving, widthInInches, heightInInches  }) => {
  const [flipped, setFlipped] = useState(false);
  const scaleFactor = .8; // 1 inch = .8vh
  const doorWidth = `${(widthInInches?widthInInches:30) * scaleFactor}vh`;
  const doorHeight = `${(heightInInches?heightInInches:80) * scaleFactor}vh`;
  const lamHeight = `${80 * scaleFactor}vh`;
  const lamWidth = `${30 * scaleFactor}vh`;
  return (
    <div className={styles.flipDoorContainer}>
      <div className={styles.doorWrapper} style={{ width: doorWidth, height: doorHeight }}>
        <motion.div
          className={styles.door}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "center" }} 
        >
          {/* Front Image */}
          <img
            src={frontWrap?frontWrap:'Laminates/Lam-1.png'}
            alt="Front of door"
            className={`${styles.doorFace} ${styles.front}`}
            style={{ width: lamWidth, height: lamHeight }}
          />
          {frontCarving && <img src={frontCarving} alt="Carving Pattern" className={`${styles.doorFace} ${styles.front} ${styles.carvingOverlay}`} />}

          {/* Back Image */}
          <img
            src={backWrap?backWrap:'Laminates/Lam-2.png'}
            alt="Back of door"
            className={`${styles.doorFace} ${styles.back}`}
            style={{ width: lamWidth, height: lamHeight }}
          />
          {backCarving && <img src={backCarving} alt="Carving Pattern" className={`${styles.doorFace} ${styles.back} ${styles.carvingOverlay}`} />}
        </motion.div>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          aria-pressed={!flipped}
          className={`${styles.flipButton} ${!flipped ? styles.active : ""}`}
          onClick={() => setFlipped(false)}
        >
          Front
        </button>

        <button
          type="button"
          aria-pressed={flipped}
          className={`${styles.flipButton} ${flipped ? styles.active : ""}`}
          onClick={() => setFlipped(true)}
        >
          Back
        </button>
      </div>

    </div>
  );
};

export default FlipDoor;
