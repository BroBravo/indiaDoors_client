// import  { useEffect, useState } from "react";
// import { FaShoppingCart, FaHeart, FaMapMarkerAlt, FaCreditCard, FaLock, FaSignOutAlt, FaUserCircle, FaPowerOff } from "react-icons/fa";
// import styles from "./index.module.scss"; // Import SCSS module
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../../context/userContext";
// import DynamicForm from "../../components/form";
// import axios from "axios";

// const ProfilePage = () => {
//   const {user,setUser}=useUser();
//   const [activeSection, setActiveSection] = useState("orders");
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume true, update based on actual auth check
//   const [showPopup, setShowPopup] = useState(false);
//   const [editingAddressType, setEditingAddressType] = useState(null); // "billing" or "shipping" or null
//   const [addresses, setAddresses] = useState({
//   billing: null,
//   shipping: null,
// });
 
//   const navigate = useNavigate();

   
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("https://indiadoors.in/back/api/auth", {
//           withCredentials: true, // ✅ includes HttpOnly cookie
//         });

//         setUser(res.data); // ✅ axios auto-parses JSON
//       } catch (error) {
//         console.error("Auth check failed:", error);
//         setUser(null);
//         setIsAuthenticated(false);
//         setShowPopup(true);
//       } 
//     };
//     const fetchAddresses = async () => {
//     try {
//       const res = await axios.get("https://indiadoors.in/back/user/addresses", {
//         withCredentials: true,
//       });
//       setAddresses({
//         billing: res.data.billing || null,
//         shipping: res.data.shipping || null,
//       });
//     } catch (err) {
//       console.error("Failed to fetch addresses", err);
//     }
//     };

//     useEffect(() => {
//       fetchUser();
//       fetchAddresses();
//     }, []);

//     const addressFields = [
//     {
//       label: "Address Line",
//       name: "line1",
//       type: "text",
//       placeholder: "123 Main St",
//     },
//     {
//       label: "City",
//       name: "city",
//       type: "text",
//       placeholder: "City",
//     },
//     {
//       label: "State",
//       name: "state",
//       type: "text",
//       placeholder: "State",
//     },
//     {
//       label: "ZIP Code",
//       name: "zip",
//       type: "text",
//       placeholder: "ZIP Code",
//     },
//     {
//       label: "Country",
//       name: "country",
//       type: "text",
//       placeholder: "Country",
//     },
//   ];
  
//  const handleAddressSubmit = (type, mode = "add", addressId = null) => async (data) => {
//   try {
//     const payload = {
//       ...data,
//       type,
//     };

//     const url = mode === "edit"
//       ? `https://indiadoors.in/back/user/address/${addressId}`
//       : "https://indiadoors.in/back/user/address/add";

//     const method = mode === "edit" ? "put" : "post";

//     const res = await axios({
//       method,
//       url,
//       data: payload,
//       withCredentials: true,
//     });

//     console.log(`Address ${mode}ed:`, res.data);
//     // Optionally refresh UI here
//   } catch (err) {
//     console.error(`Failed to ${mode} ${type} address:`, err);
//   }
// };


  

//   return (
//     <div className={styles.profileContainer}>
//        {/* Authentication Popup */}
//       {showPopup && (
//         <div className={styles.popup}>
//           <p>You must be logged in to access your profile. Navigate to <Link to='/login'>Login</Link></p>
//         </div>
//       )}

//       {/* Sidebar */}
//       {isAuthenticated && (
//       <>
//       <aside className={styles.sidebar}>
//         <div className={styles.profileInfo}>
//           <div className={styles.profileImage} ><FaUserCircle/></div>
//           {/* <img src={<FaUserCircle/>} alt="Profile" className={styles.profileImage} /> */}
//           <h2 className={styles.profileName}>Welcome, {user?.username}</h2>
//           <p className={styles.profileEmail}>{user?.identifier}</p>
//         </div>
//         <nav className={styles.navLinks}>
//           <button onClick={() => setActiveSection("orders")} className={styles.navButton}>
//             <FaShoppingCart /> Orders
//           </button>
//           <button onClick={() => setActiveSection("wishlist")} className={styles.navButton}>
//             <FaHeart /> Wishlist
//           </button>
//           <button onClick={() => setActiveSection("addresses")} className={styles.navButton}>
//             <FaMapMarkerAlt /> Saved Addresses
//           </button>
//           <button onClick={() => setActiveSection("payment")} className={styles.navButton}>
//             <FaCreditCard /> Payment Methods
//           </button>
//           <button onClick={() => setActiveSection("security")} className={styles.navButton}>
//             <FaLock /> Account Security
//           </button>
//           <button className={`${styles.navButton} ${styles.logout}`}>
//             <FaPowerOff /> Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className={styles.mainContent}>
//         {activeSection === "orders" && (
//           <section className={styles.section}>
//             <h2 className={styles.sectionTitle}>Order History</h2>
//             <p>No recent orders</p>
//           </section>
//         )}

//         {activeSection === "wishlist" && (
//           <section className={styles.section}>
//             <h2 className={styles.sectionTitle}>Wishlist</h2>
//             <p>Your wishlist is empty</p>
//           </section>
//         )}

//        {activeSection === "addresses" && (
//        <section className={styles.section}>
//         <h2 className={styles.sectionTitle}>Saved Addresses</h2>

//         {/* Billing Address Block */}
//         <div className={styles.addressBlock}>
//           <h3>Billing Address</h3>
//           {addresses.billing && editingAddressType !== "billing" ? (
//             <div className={styles.addressCard}>
//               <p>{addresses.billing.line1}</p>
//               <p>{addresses.billing.city}, {addresses.billing.state} - {addresses.billing.zip}</p>
//               <p>{addresses.billing.country}</p>
//               <button className={styles.editBtn} onClick={() => setEditingAddressType("billing")}>Edit</button>
//             </div>
//           ) : editingAddressType === "billing" ? (
//             <DynamicForm
//               fields={addressFields}
//               initialData={addresses.billing || {}}
//               onSubmit={async (data) => {
//                 await handleAddressSubmit(
//                   "billing",
//                   addresses.billing ? "edit" : "add",
//                   addresses.billing?.id
//                 )(data);
//                 setEditingAddressType(null);
//                 fetchAddresses();
//               }}
//             />
//           ) : (
//             <button className={styles.addBtn} onClick={() => setEditingAddressType("billing")}>
//               Add Billing Address
//             </button>
//           )}
//         </div>

//         {/* Shipping Address Block */}
//         <div className={styles.addressBlock}>
//           <h3>Shipping Address</h3>
//           {addresses.shipping && editingAddressType !== "shipping" ? (
//             <div className={styles.addressCard}>
//               <p>{addresses.shipping.line1}</p>
//               <p>{addresses.shipping.city}, {addresses.shipping.state} - {addresses.shipping.zip}</p>
//               <p>{addresses.shipping.country}</p>
//               <button className={styles.editBtn} onClick={() => setEditingAddressType("shipping")}>Edit</button>
//             </div>
//           ) : editingAddressType === "shipping" ? (
//             <DynamicForm
//               fields={addressFields}
//               initialData={addresses.shipping || {}}
//               onSubmit={async (data) => {
//                 await handleAddressSubmit(
//                   "shipping",
//                   addresses.shipping ? "edit" : "add",
//                   addresses.shipping?.id
//                 )(data);
//                 setEditingAddressType(null);
//                 fetchAddresses();
//               }}
//             />
//                 ) : (
//                   <button className={styles.addBtn} onClick={() => setEditingAddressType("shipping")}>
//                     Add Shipping Address
//                   </button>
//                 )}
//               </div>
//             </section>
//           )}


//         {activeSection === "payment" && (
//           <section className={styles.section}>
//             <h2 className={styles.sectionTitle}>Payment Methods</h2>
//             <p>No saved payment methods</p>
//           </section>
//         )}

//         {activeSection === "security" && (
//           <section className={styles.section}>
//             <h2 className={styles.sectionTitle}>Account Security</h2>
//             <p>Update your password & security settings</p>
//           </section>
//         )}
//       </main>
//       </>
//      )}
//     </div>
//   );
// };

// export default ProfilePage;

import  { useEffect, useState } from "react";
import { FaBoxOpen, FaShoppingCart, FaHeart, FaMapMarkerAlt, FaCreditCard, FaLock, FaSignOutAlt, FaUserCircle, FaPowerOff, FaShoppingBag, FaUserCog, FaMoneyCheckAlt, FaGift, FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa";
import styles from "./index.module.scss"; 
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import axios from "axios";
import { MdAccountCircle, MdEmail, MdEdit, MdPhone, MdPerson } from "react-icons/md";
import ProfileInfo from "../../components/profileInfo";
import AddressForm from "../../components/addressForm";
import {Helmet} from "react-helmet";
const ProfilePage = () => {

    const navigate = useNavigate();
    const {user,setUser}=useUser();
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume true, update based on actual auth check
    const [showPopup, setShowPopup] = useState(false);
    const [addresses, setAddresses] = useState({
      billing: null,
      shipping: null,
    });
    const [selectedSection, setSelectedSection] = useState('profile');
    const [userDetails, setUserDetails] = useState(null);

    const fetchProfileDetails = async () => {
      try {
        const res = await axios.get("https://indiadoors.in/back/user/info", {
          withCredentials: true,
        });
        setUserDetails({
          firstName: res.data.first_name || "",
          lastName: res.data.last_name || "",
          gender: res.data.gender || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile details:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("https://indiadoors.in/back/api/auth", {
          withCredentials: true, // ✅ includes HttpOnly cookie
        });

        setUser(res.data); // ✅ axios auto-parses JSON
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
        setIsAuthenticated(false);
        setShowPopup(true);
      } 
    };
    const fetchAddresses = async () => {
    try {
      const res = await axios.get("https://indiadoors.in/back/user/addresses", {
        withCredentials: true,
      });
      setAddresses({
        billing: res.data.billing || null,
        shipping: res.data.shipping || null,
      });
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
    };

    useEffect(() => {
      fetchUser();
      fetchProfileDetails();
     // fetchAddresses();
    }, []);

    

   
  return(
    <>
       <Helmet>
                <title>Profile | India Doors</title>
       </Helmet>
    <div className={styles.container}>
       
      {showPopup && (
        <div className={styles.popup}>
          <p>You must be logged in to access your profile. Navigate to <Link to='/login'>Login</Link></p>
        </div>
      )}
      {/* Sidebar */}
      {isAuthenticated && 
      <>
      <div className={styles.sidebar}>
        <div className={styles.greeting}>
          <MdAccountCircle className={styles.avatar} />
          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start',padding:'10px'}}>
            <div><strong>Hello,</strong></div>
            
             <p>{user?.username}</p> 
          </div>
        </div>

        <div className={styles.menu}>

          <div className={styles.section}>
            <div className={styles.sectionHeader} >
              <FaUserCog style={{color:'#2874f0'}}/>  
              <h4>ACCOUNT SETTINGS</h4>
              
            </div> 
            
              <ul>
                <li onClick={() => setSelectedSection('profile')}
                    className={selectedSection === 'profile' ? styles.active : ''}>
                    Personal Information</li>
                <li onClick={() => setSelectedSection('addresses')}
                    className={selectedSection === 'addresses' ? styles.active : ''}>
                    Manage Addresses</li>
                <li>PAN Card Information</li>
              </ul>
              
          </div>  

          <div className={styles.section}>
           <div className={styles.sectionHeader} >
              <FaShoppingBag style={{color:'#2874f0'}} />
              <h4>MY ORDERS</h4>
             
            </div>
            
              <ul>
                <li>On the way</li>
                <li>Delivered</li>
                <li>Cancelled</li>
                <li>Returned</li>

              </ul>
            
          </div>        

         
          
         <div className={styles.section}>
            <div className={styles.sectionHeader} >
              <FaCreditCard style={{color:'#2874f0'}}/>  
              <h4>PAYMENTS</h4>
             
            </div> 
           
               <ul>
                <li>Gift Cards</li>
                <li>Saved UPI</li>
                <li>Saved Cards</li>
              </ul>
             
          </div>  

          <div className={styles.section} >
            <div className={styles.sectionHeader} >
              <FaBoxOpen style={{color:'#2874f0'}}/>  
              <h4>MY STUFF</h4>
              
            </div> 
           
               <ul>
                <li>Favorites</li>
                <li>My Coupons</li>
               </ul>
              
          </div>  
         
          <div className={styles.section} style={{borderTop:'1px solid #777'}}>
            <div className={styles.sectionHeader} >
              <FaPowerOff style={{color:'red'}}/>  
              <h4>Log out</h4>
              
            </div> 
            
          </div>  
          
          
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainSection}>
          {selectedSection === 'profile' && userDetails && (
            <ProfileInfo userDetails={userDetails} />
          )}
         {selectedSection === 'addresses' && <AddressForm header="Billing address" />} 
      </div>
        
      </>
      }
    </div>
    </>
  );
};

export default ProfilePage;
