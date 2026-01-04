import React, { useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import styles from "./index.module.scss";

function Footer() {
  const prefersReducedMotion = useReducedMotion();

  const socialLinks = useMemo(
    () => [
      { label: "Facebook", url: "https://facebook.com", icon: <FaFacebook /> },
      { label: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
      { label: "Instagram", url: "https://instagram.com", icon: <FaInstagram /> },
      { label: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedin /> },
    ],
    []
  );

  const footerLinks = useMemo(
    () => [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Contact", to: "/contact" },
    ],
    []
  );

  const ref = useRef(null);
  const controls = useAnimation();

  // Animate whenever footer enters the viewport; reset when it leaves
  const inView = useInView(ref, { amount: 0.35 });

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set("visible");
      return;
    }
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls, prefersReducedMotion]);

  // Container variants (stagger = wave left -> right)
  const iconContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  // "Watery" icon motion: drop + sideways drift + slight tilt
  // Use `custom` to alternate direction per index
  const iconItem = {
    hidden: (i) => {
      const dir = i % 2 === 0 ? -1 : 1; // left/right alternate
      return {
        opacity: 0,
        y: -28,
        x: 10 * dir,
        rotate: 6 * dir,
        scale: 0.95,
      };
    },
    visible: (i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      return {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 520,
          damping: 28,
          // tiny extra delay variation so it feels more organic
          delay: i * 0.01,
        },
      };
    },
  };

  const linksContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const linkItem = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 520, damping: 30 },
    },
  };

  const copyright = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      ref={ref}
      className={styles.footer}
      initial="hidden"
      animate={controls}
    >
      <div className={styles.footerContainer}>
        {/* Social Media Links (Top -> Down, watery wave left -> right) */}
        <motion.div className={styles.socialLinks} variants={iconContainer}>
          {socialLinks.map((item, index) => (
            <motion.a
              key={item.label}
              className={styles.socialIcon}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
              custom={index}
              variants={iconItem}
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.12, rotate: 0 }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation Links (Bottom -> Up) */}
        <motion.div className={styles.footerLinks} variants={linksContainer}>
          {footerLinks.map((item) => (
            <motion.div key={item.label} variants={linkItem}>
              <Link to={item.to} className={styles.footerLink}>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div className={styles.copyright} variants={copyright}>
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
