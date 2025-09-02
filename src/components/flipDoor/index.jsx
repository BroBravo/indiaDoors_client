import  { useState } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";

const FlipDoor = ({ frontWrap, backWrap, frontCarving, backCarving, widthInInches, heightInInches  }) => {
  const [flipped, setFlipped] = useState(false);
  const scaleFactor = .8; // 1 inch = .8vh
  const doorWidth = `${(widthInInches?widthInInches:36) * scaleFactor}vh`;
  const doorHeight = `${(heightInInches?heightInInches:72) * scaleFactor}vh`;
  

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
          />
          {frontCarving && <img src={frontCarving} alt="Carving Pattern" className={`${styles.doorFace} ${styles.front} ${styles.carvingOverlay}`} />}

          {/* <svg
            viewBox="0 0 512 612"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            
            <defs>
              <linearGradient id="carveGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
              </linearGradient>
            </defs>

            
            <g>
             
              <rect x="42" y="42" width="428" height="528" rx="10" ry="10"
                    stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />

              
              <rect x="38" y="38" width="428" height="528" rx="10" ry="10"
                    stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />

              
              <rect x="40" y="40" width="432" height="532" rx="10" ry="10"
                    stroke="url(#carveGradient)" strokeWidth="1.5" fill="none" />
            </g>

            
            <g>
              <rect x="82" y="82" width="348" height="116" rx="8" ry="8"
                    stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" />
              <rect x="78" y="78" width="348" height="116" rx="8" ry="8"
                    stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
              <rect x="80" y="80" width="352" height="120" rx="8" ry="8"
                    stroke="url(#carveGradient)" strokeWidth="1.2" fill="none" />
            </g>

            
            <g stroke="url(#carveGradient)" strokeWidth="1.5">
              <line x1="180" y1="240" x2="180" y2="500" />
              <line x1="332" y1="240" x2="332" y2="500" />
            </g>

            
            <g>
              <rect x="82" y="462" width="348" height="76" rx="8" ry="8"
                    stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" />
              <rect x="78" y="458" width="348" height="76" rx="8" ry="8"
                    stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
              <rect x="80" y="460" width="352" height="80" rx="8" ry="8"
                    stroke="url(#carveGradient)" strokeWidth="1.2" fill="none" />
            </g>
          </svg> */}

          {/* Back Image */}
          <img
            src={backWrap?backWrap:'Laminates/Lam-2.png'}
            alt="Back of door"
            className={`${styles.doorFace} ${styles.back}`}
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
