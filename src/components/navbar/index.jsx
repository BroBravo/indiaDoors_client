import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useUser } from "../../context/userContext";
const menuItems = [
  {
    label: "HOME",
    to: "/",
  },
  {
    label: "ABOUT US",
    to: "/about-us#about",
  },
  {
    label: "CONTACT US",
    to: "/about-us#contact",
  },
  {
    label: "CUSTOMIZE DOOR",
    to: "/custom-door",
  },
];

function Navbar() {
  const navigate=useNavigate();
  const location=useLocation();
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUser(); 
 const handleLogout = async () => {
  try {
    await axios.post('http://localhost:4000/api/logout',{},{ withCredentials: true }); // hit the backend to clear cookie
    setUser(null);
    navigate("/home");
  } catch (error) {
    console.error("Logout failed", error);
  }
};
//   const fetchUserInfo = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) return; // No token, user is not logged in

//   try {
//     const response = await axios.get("http://localhost:4000/auth", {
//       headers: { Authorization: `Bearer ${token}` }, // Send token in request
//     });

//     setLoggedInUsername(response.data.username); // Set username from response
//    // window.location.reload();

//     // if (location.pathname !== "/home") {
//     //     navigate("/home");
//     //     //window.location.reload();

//     //   }
//   } catch (err) {
//     console.error("Token expired or invalid", err);
//     localStorage.removeItem("token"); // Remove expired token
//     setLoggedInUsername(null); // Reset to default
//   }
// };

//   // Call fetchUserInfo on component mount
//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

  return (
    <nav className={styles.navbar}>
      {menuItems.map((item, key) => (
        <div key={key} className={styles.navbarItems}>
          <Link to={item.to} className={styles.navbarItemsLink}>
            {item.label}
          </Link>
        </div>
      ))}
      
      {user && <Link to="/cart" className={styles.cartIconContainer}>
        <FaShoppingCart className={styles.cartIcon} />
       </Link>
       } 
       <div className={styles.loginInfo}>
        {user ? (
          // ✅ Show username & logout button if logged in
          <>
            <Link onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)} 
                   className={`${styles.navbarItemsLink} ${styles.loginInfoUsername} `}>
                {user.username}
            </Link>
            <div className={styles.loginImageContainer}>
              <img src="/defaultuser.webp" className={styles.loginInfoImage} alt="User" />
            </div>
            { isDropdownOpen && (<div onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}  className={styles.dropDownContainer}>
                <div className={styles.dropDownContainerItem}>
                  <Link to="/profile" className={styles.profileLink}>
                  View Profile
                  </Link>
                </div >
                <div className={styles.dropDownContainerItem}>
                  <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
                
            </div>)}
          </>
        ) : (
          
          <>
              <Link to="/login" className={`${styles.navbarItemsLink} ${styles.loginInfoUsername} `}>
                Login/Sign up
              </Link>
            <div className={styles.loginImageContainer}>
                <img src="/defaultuser.webp" className={styles.loginInfoImage} alt="User" />
              </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

