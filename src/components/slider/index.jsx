import { useEffect, useMemo, useState, useCallback, useRef } from "react";
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

  // ---- Swipe/drag refs ----
  const viewportRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const deltaXRef = useRef(0);

  // Prevent auto-slide right after manual swipe (feels better)
  const pausedUntilRef = useRef(0);

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

  const prev = useCallback(() => {
    setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  }, [images.length]);

  // ✅ Always slide (but don't fight with the user's swipe)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      next();
    }, 3500);

    return () => clearInterval(interval);
  }, [next]);

  // ---- Swipe logic ----
  const beginDrag = useCallback((clientX) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    lastXRef.current = clientX;
    deltaXRef.current = 0;

    // disable transition while dragging (so it follows finger)
    const track = viewportRef.current?.querySelector(`.${styles.track}`);
    if (track) track.style.transition = "none";
  }, [styles.track]);

  const moveDrag = useCallback(
    (clientX) => {
      if (!isDraggingRef.current) return;

      lastXRef.current = clientX;
      const dx = clientX - startXRef.current;
      deltaXRef.current = dx;

      const viewport = viewportRef.current;
      const track = viewport?.querySelector(`.${styles.track}`);
      if (!viewport || !track) return;

      const width = viewport.getBoundingClientRect().width || 1;
      const percent = (dx / width) * 100;

      // follow finger: base translate + drag offset
      track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${percent}%))`;
    },
    [currentIndex, styles.track]
  );

  const endDrag = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const viewport = viewportRef.current;
    const track = viewport?.querySelector(`.${styles.track}`);
    if (!viewport || !track) return;

    // restore transition for snap animation
    track.style.transition = "transform 650ms ease-in-out";

    const width = viewport.getBoundingClientRect().width || 1;
    const dx = deltaXRef.current;

    // swipe threshold: 15% of width (tweakable)
    const threshold = width * 0.15;

    // pause auto slide for a short moment after a swipe
    pausedUntilRef.current = Date.now() + 1200;

    if (Math.abs(dx) > threshold) {
      if (dx < 0) next(); // swipe left => next
      else prev();        // swipe right => previous
    } else {
      // snap back to current slide
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex, next, prev, styles.track]);

  // Touch handlers
  const onTouchStart = (e) => beginDrag(e.touches[0].clientX);
  const onTouchMove = (e) => moveDrag(e.touches[0].clientX);
  const onTouchEnd = () => endDrag();

  // Mouse handlers (desktop drag)
  const onMouseDown = (e) => {
    // only left click
    if (e.button !== 0) return;
    beginDrag(e.clientX);
  };
  const onMouseMove = (e) => moveDrag(e.clientX);
  const onMouseUp = () => endDrag();
  const onMouseLeave = () => endDrag();

  return (
    <section className={styles.wrapper}>
      <div className={styles.sliderShell}>
        <div
          className={styles.viewport}
          ref={viewportRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          role="region"
          aria-label="Home slider"
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, idx) => (
              <div className={styles.slide} key={idx}>
                <img
                  className={styles.slideImg}
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  draggable={false}
                />
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

      {/* dots below */}
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
