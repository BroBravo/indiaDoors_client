import React, { useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaHeart, FaMapMarkerAlt, FaCreditCard, FaLock, FaSignOutAlt } from "react-icons/fa";
import styles from "./index.module.scss"; // Import SCSS module
import { Link, useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume true, update based on actual auth check
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token"); // Example: Check auth token in local storage
    if (!userToken) {
      setIsAuthenticated(false);
      setShowPopup(true);
      
    }
  }, [navigate]);
  return (
    <div className={styles.profileContainer}>
       {/* Authentication Popup */}
      {showPopup && (
        <div className={styles.popup}>
          <p>You must be logged in to access your profile. Navigate to <Link to='/login'>Login</Link></p>
        </div>
      )}

      {/* Sidebar */}
      {isAuthenticated && (
      <>
      <aside className={styles.sidebar}>
        <div className={styles.profileInfo}>
          <img src="https://via.placeholder.com/80" alt="Profile" className={styles.profileImage} />
          <h2 className={styles.profileName}>John Doe</h2>
          <p className={styles.profileEmail}>johndoe@example.com</p>
        </div>
        <nav className={styles.navLinks}>
          <button onClick={() => setActiveSection("orders")} className={styles.navButton}>
            <FaShoppingCart /> Orders
          </button>
          <button onClick={() => setActiveSection("wishlist")} className={styles.navButton}>
            <FaHeart /> Wishlist
          </button>
          <button onClick={() => setActiveSection("addresses")} className={styles.navButton}>
            <FaMapMarkerAlt /> Saved Addresses
          </button>
          <button onClick={() => setActiveSection("payment")} className={styles.navButton}>
            <FaCreditCard /> Payment Methods
          </button>
          <button onClick={() => setActiveSection("security")} className={styles.navButton}>
            <FaLock /> Account Security
          </button>
          <button className={`${styles.navButton} ${styles.logout}`}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {activeSection === "orders" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Order History</h2>
            <p>No recent orders</p>
          </section>
        )}

        {activeSection === "wishlist" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Wishlist</h2>
            <p>Your wishlist is empty</p>
          </section>
        )}

        {activeSection === "addresses" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Saved Addresses</h2>
            <p>No saved addresses</p>
          </section>
        )}

        {activeSection === "payment" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment Methods</h2>
            <p>No saved payment methods</p>
          </section>
        )}

        {activeSection === "security" && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Account Security</h2>
            <p>Update your password & security settings</p>
          </section>
        )}
      </main>
      </>
     )}
    </div>
  );
};

export default ProfilePage;

