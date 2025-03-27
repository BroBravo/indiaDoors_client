import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import styles from "./index.module.scss"; 

const socialLinks = [
  { label: "Facebook", url: "https://facebook.com", icon: <FaFacebook /> },
  { label: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
  { label: "Instagram", url: "https://instagram.com", icon: <FaInstagram /> },
  { label: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedin /> },
];

const footerLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Contact", to: "/contact" },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Social Media Links */}
        <div className={styles.socialLinks}>
          {socialLinks.map((item, index) => (
            <a className={styles.socialIcon} key={index} href={item.url} target="_blank" rel="noopener noreferrer">
              {item.icon}
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <div className={styles.footerLinks}>
          {footerLinks.map((item, index) => (
            <Link key={index} to={item.to} className={styles.footerLink}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Copyright Text */}
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
