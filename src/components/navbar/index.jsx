import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart,FaTimes,FaBars, FaUserCircle, FaPowerOff} from "react-icons/fa";
import { useUser } from "../../context/userContext";
import { MenuIcon, MenuSquare, ListCollapse, List} from 'lucide-react';
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
  const { user, setUser } = useUser(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const baseURL = process.env.REACT_APP_BASE_URL;
 const handleLogout = async () => {
  try {
    await axios.post(`${baseURL}/api/logout`,{},{ withCredentials: true }); // hit the backend to clear cookie
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
//     const response = await axios.get(`${baseURL}/auth", {
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
   const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    // <nav className={styles.navbar}>
    //   {menuItems.map((item, key) => (
    //     <div key={key} className={styles.navbarItems}>
    //       <Link to={item.to} className={styles.navbarItemsLink}>
    //         {item.label}
    //       </Link>
    //     </div>
    //   ))}
      
    //   {user && <Link to="/cart" className={styles.cartIconContainer}>
    //     <FaShoppingCart className={styles.cartIcon} />
    //    </Link>
    //    } 
    //    <div className={styles.loginInfo}>
    //     {user ? (
    //       // ✅ Show username & logout button if logged in
    //       <>
    //         <Link onMouseEnter={() => setIsDropdownOpen(true)}
    //               onMouseLeave={() => setIsDropdownOpen(false)} 
    //                className={`${styles.navbarItemsLink} ${styles.loginInfoUsername} `}>
    //             {user.username}
    //         </Link>
    //         <div className={styles.loginImageContainer}>
    //           <img src="/defaultuser.webp" className={styles.loginInfoImage} alt="User" />
    //         </div>
    //         { isDropdownOpen && (<div onMouseEnter={() => setIsDropdownOpen(true)}
    //               onMouseLeave={() => setIsDropdownOpen(false)}  className={styles.dropDownContainer}>
    //             <div className={styles.dropDownContainerItem}>
    //               <Link to="/profile" className={styles.profileLink}>
    //               View Profile
    //               </Link>
    //             </div >
    //             <div className={styles.dropDownContainerItem}>
    //               <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
    //             </div>
                
    //         </div>)}
    //       </>
    //     ) : (
          
    //       <>
    //           <Link to="/login" className={`${styles.navbarItemsLink} ${styles.loginInfoUsername} `}>
    //             Login/Sign up
    //           </Link>
    //         <div className={styles.loginImageContainer}>
    //             <img src="/defaultuser.webp" className={styles.loginInfoImage} alt="User" />
    //           </div>
    //       </>
    //     )}
    //   </div>
    // </nav>
     <nav className={styles.navbar}>

       {/* Logo */}
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src="/IndiaDoors_logo2.png" alt="Company Logo" className={styles.logoImage} />
          </Link>
        </div>

      <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
        {/* {menuOpen ? <FaTimes /> : <FaBars />} */}
        {menuOpen ? <MenuIcon /> : <MenuIcon />}
      </div>

      <div className={`${styles.menuItems} ${menuOpen ? styles.open : ""}`}>
        {menuItems.map((item, key) => (
          <Link to={item.to} className={styles.navbarItemsLink} onClick={() => setMenuOpen(false)}>
              <div key={key} className={styles.navbarItems}>
                  {item.label}
              </div>
          </Link>
          
        ))}
      </div>

      {user && (
        <Link to="/cart" className={styles.cartIconContainer}>
          <FaShoppingCart className={styles.cartIcon} />
          
        </Link>
      )}

      <div className={styles.loginInfo}>
        {user ? (
          <div  className={styles.dropdownWrapper}>
            <div className={`${styles.navbarItemsLink} ${styles.loginInfoUsername}`} >
              {user.username}
            </div>
            <div className={styles.loginImageContainer}>
              {/* <img src="/defaultuser.webp" className={styles.loginInfoImage} alt="User" /> */}
              <FaUserCircle style={{ fontSize: '2vw', color: '#654321' }}/>
            </div>
            
              <div className={styles.dropDownContainer}>
                <div className={styles.dropDownContainerItem}>
                  <Link to="/profile" className={styles.profileLink}>
                    View Profile
                  </Link>
                  <FaUserCircle style={{color:'rgb(40, 116, 240)', marginLeft: '8px' }}/>
                </div>
                <div className={styles.dropDownContainerItem}>
                  <div className={styles.profileLink} onClick={handleLogout}>
                    Logout  
                  </div>
                  <FaPowerOff style={{color:'red', marginLeft: '8px' }}/>
                </div>
              </div>
            
          </div>
        ) : (
          <>
            <Link to="/login" className={`${styles.navbarItemsLink} ${styles.loginInfoUsername}`}>
              Login/Sign up
            </Link>
            <div className={styles.loginImageContainer}>
              {/* <img src="/defaultuser.webp" className={styles.loginInfoImage} alt="User" /> */}
              <FaUserCircle style={{ fontSize: '2vw', color: '#654321' }}/>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

