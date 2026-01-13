import { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./index.module.scss";

function Slider() {
  const images = useMemo(
    () => [
      "/slider_pics/Slider-1.jpg",
      "/slider_pics/Slider-2.png",
      "/slider_pics/door1.webp",
      "/slider_pics/door2.webp",
    ],
    []
  );

  // Optional per-slide heading
  const headings = useMemo(
    () => [
      "Choose from an extensive range of laminates",
      "Carved with perfection",
      "Designer Doors",
      "Premium Finishes",
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback(
    (idx) => {
      const safe = ((idx % images.length) + images.length) % images.length;
      setCurrentIndex(safe);
    },
    [images.length]
  );

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // ✅ Always slide (no pause on hover)
  useEffect(() => {
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.sliderShell}>
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, idx) => (
              <div className={styles.slide} key={idx}>
                <img className={styles.slideImg} src={src} alt={`Slide ${idx + 1}`} />
                <div className={styles.overlay} />
                <div className={styles.centerText}>
                  <h1 className={styles.title}>
                    {headings[idx] || "Sliders & Partitions"}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ premium dots BELOW slider */}
      <div className={styles.dotsBar}>
        <div className={styles.dots}>
          {images.map((_, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                className={`${styles.dot} ${active ? styles.dotActive : ""}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={active ? "true" : "false"}
              >
                {/* inner glow dot */}
                <span className={styles.dotInner} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Slider;
