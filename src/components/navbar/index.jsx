import { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaPowerOff } from "react-icons/fa";
import { useUser } from "../../context/userContext";
import { MenuIcon } from "lucide-react";

const menuItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us#about" },
  { label: "Contact Us", to: "/about-us#contact" },
  { label: "Custom Door", to: "/custom-door" },
];

function normalizePath(p = "") {
  return String(p).split("#")[0].split("?")[0];
}

function getActiveIndex(pathname) {
  const p = normalizePath(pathname);

  if (p.startsWith("/custom-door")) return 3;
  if (p.startsWith("/about-us")) return 1;
  if (p === "/") return 0;

  return -1; // unknown pages (cart/profile/login etc.)
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
      setUser(null);
      setProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.hash]);

  // Close profile dropdown on outside click + ESC
  useEffect(() => {
    if (!profileOpen) return;

    const onMouseDown = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setProfileOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [profileOpen]);

  const isCartActive = useMemo(() => {
    return normalizePath(location.pathname).startsWith("/cart");
  }, [location.pathname]);

  const activeIndex = useMemo(() => {
    if (isCartActive) return -1;

    const baseIndex = getActiveIndex(location.pathname);

    if (normalizePath(location.pathname).startsWith("/about-us")) {
      const h = String(location.hash || "").toLowerCase();
      if (h === "#contact") return 2;
      return 1;
    }

    return baseIndex;
  }, [location.pathname, location.hash, isCartActive]);

  const pillStyle = useMemo(() => {
    const w = 100 / menuItems.length;
    return {
      width: `${w}%`,
      transform: `translateX(${activeIndex * 100}%)`,
    };
  }, [activeIndex]);

  const showPillIndicator = activeIndex >= 0;

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src="/IndiaDoors_logo2.png"
            alt="Company Logo"
            className={styles.logoImage}
          />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
        <MenuIcon />
      </div>

      {/* Desktop pill menu */}
      <div className={styles.pillMenu} aria-label="Main navigation">
        {showPillIndicator && (
          <span className={styles.pillIndicator} style={pillStyle} />
        )}

        {menuItems.map((item, idx) => (
          <Link
            key={item.to}
            to={item.to}
            className={`${styles.pillLink} ${
              idx === activeIndex ? styles.pillLinkActive : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile drawer menu */}
      <div className={`${styles.menuItemsMobile} ${menuOpen ? styles.open : ""}`}>
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Cart */}
      {user && (
        <Link
          to="/cart"
          className={`${styles.cartIconContainer} ${
            isCartActive ? styles.cartActive : ""
          }`}
          aria-label="Cart"
          title="Cart"
        >
          <FaShoppingCart
            className={`${styles.cartIcon} ${
              isCartActive ? styles.cartIconActive : ""
            }`}
          />
        </Link>
      )}

      {/* Profile dropdown (CLICK) */}
      <div className={styles.loginInfo}>
        {user ? (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            {/* Trigger */}
            <button
              type="button"
              className={`${styles.profileTrigger} ${
                profileOpen ? styles.profileTriggerActive : ""
              }`}
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
            >
              <span className={styles.loginInfoUsername}>{user.username}</span>
              <span className={styles.loginImageContainer}>
                <FaUserCircle className={styles.userIcon} />
              </span>
            </button>

            {/* Dropdown */}
            <div
              className={`${styles.dropDownContainer} ${
                profileOpen ? styles.dropDownOpen : ""
              }`}
              role="menu"
              aria-label="Profile menu"
            >
              <div className={styles.dropDownHeader}>
                <div className={styles.dropDownAvatar}>
                  <FaUserCircle />
                </div>
                <div className={styles.dropDownHeaderText}>
                  <div className={styles.dropDownName}>{user.username}</div>
                  <div className={styles.dropDownSub}>Account</div>
                </div>
              </div>

              <div className={styles.dropDownDivider} />

              {/* View Profile (same row style as logout) */}
              <Link
                to="/profile"
                className={styles.dropDownItem}
                role="menuitem"
                onClick={() => setProfileOpen(false)}
              >
                <span className={styles.dropDownItemLeft}>
                  <FaUserCircle className={styles.ddIconBlue} />
                  <span>View Profile</span>
                </span>
                <span className={styles.dropDownChevron}>›</span>
              </Link>

              {/* Logout (same row style, just danger hover) */}
              <button
                type="button"
                className={`${styles.dropDownItem} ${styles.dropDownDanger}`}
                onClick={handleLogout}
                role="menuitem"
              >
                <span className={styles.dropDownItemLeft}>
                  <FaPowerOff className={styles.ddIconRed} />
                  <span>Logout</span>
                </span>
                <span className={styles.dropDownChevron}>›</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.loginInfoUsername}>
              Login/Sign up
            </Link>
            <div className={styles.loginImageContainer}>
              <FaUserCircle className={styles.userIcon} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
