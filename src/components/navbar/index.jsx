import { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaPowerOff } from "react-icons/fa";
import { useUser } from "../../context/userContext";
import { MenuIcon } from "lucide-react";

const baseMenuItems = [
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

  return -1;
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const navItems = useMemo(() => {
    if (user) return baseMenuItems;
    return [...baseMenuItems, { label: "Login / Sign up", to: "/login" }];
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`, {}, { withCredentials: true });
      setUser(null);
      setProfileOpen(false);
      setMenuOpen(false);
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

  // Close mobile drawer on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isCartActive = useMemo(() => {
    return normalizePath(location.pathname).startsWith("/cart");
  }, [location.pathname]);

  const activeIndex = useMemo(() => {
    if (isCartActive) return -1;

    // ✅ Highlight Login when logged out and visiting /login or /signup
    if (!user) {
      const p = normalizePath(location.pathname);
      if (p.startsWith("/login") || p.startsWith("/signup")) {
        return navItems.length - 1; // last item
      }
    }

    const baseIndex = getActiveIndex(location.pathname);

    // About-us hash routing for Contact tab highlight
    if (normalizePath(location.pathname).startsWith("/about-us")) {
      const h = String(location.hash || "").toLowerCase();
      if (h === "#contact") return 2;
      return 1;
    }

    return baseIndex;
  }, [location.pathname, location.hash, isCartActive, user, navItems.length]);

  const pillStyle = useMemo(() => {
    const w = 100 / navItems.length;
    return {
      width: `${w}%`,
      transform: `translateX(${activeIndex * 100}%)`,
    };
  }, [activeIndex, navItems.length]);

  const showPillIndicator = activeIndex >= 0;

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src="/indiaDoors_logo3.png"
            alt="Company Logo"
            className={styles.logoImage}
          />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button
        type="button"
        className={styles.mobileMenuIcon}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <MenuIcon />
      </button>

      {/* Desktop pill menu */}
      <div className={styles.pillMenu} aria-label="Main navigation">
        {showPillIndicator && (
          <span className={styles.pillIndicator} style={pillStyle} />
        )}

        {navItems.map((item, idx) => (
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

      {/* Desktop Cart (hidden on mobile via CSS) */}
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

      {/* Profile (logged-in only). Logged-out has login inside pill menu now. */}
      <div className={styles.loginInfo}>
        {user ? (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              type="button"
              className={`${styles.profileAvatarBtn} ${
                profileOpen ? styles.profileAvatarBtnActive : ""
              }`}
              onClick={() => setProfileOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              aria-label="Open profile menu"
              title="Account"
            >
              <FaUserCircle className={styles.profileAvatarIcon} />
            </button>

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
        ) : null}
      </div>

      {/* ✅ Mobile Backdrop */}
      <div
        className={`${styles.mobileBackdrop} ${
          menuOpen ? styles.mobileBackdropOpen : ""
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ✅ Mobile Drawer (slides in from left) */}
      <aside
        className={`${styles.menuItemsMobile} ${menuOpen ? styles.open : ""}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileMenuInner}>
          {baseMenuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* ✅ Logged-out: show Login / Sign up inside drawer too */}
          {!user && (
            <Link
              to="/login"
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              Login / Sign up
              <span className={styles.mobileChevron}>›</span>
            </Link>
          )}

          {/* ✅ Cart at LAST position (bottom) */}
          {user && (
            <Link
              to="/cart"
              className={`${styles.mobileLink} ${styles.mobileCartLink}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobileRowLeft}>
                <FaShoppingCart className={styles.mobileCartIcon} />
                <span>Cart</span>
              </span>
              <span className={styles.mobileChevron}>›</span>
            </Link>
          )}
        </div>
      </aside>
    </nav>
  );
}
