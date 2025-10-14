//require('dotenv').config();
import { useState, useEffect } from 'react';
//import DynamicForm from "../../components/form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./index.module.scss"; // Import SCSS module
import { useUser } from "../../context/userContext";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from 'react-helmet';
//import { getCountryCallingCode } from "libphonenumber-js";
function LoginPage() {

  //console.log("API URL:", process.env.REACT_APP_BASE_URL);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const {user,setUser}=useUser();
  const navigate = useNavigate(); // Initialize navigation
  const [loginData, setloginData] = useState({ 
    username: "", 
    password: "" ,
    });

  const [userType, setUserType] = useState("Customer");
  const [signUpData,setsignUpData]=useState({
    firstName: "",
    lastName: "",
    phone: "",
    email:"",
    gender:"",
    userType:userType,
    signupPassword: "", 
    confirmPassword: "",
  });
  
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const isPhone = (value) => /^\+?\d{10,15}$/.test(value);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 820);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
 const handleLogin = async (e) => {
  e.preventDefault();
  setErrors({}); // Reset errors before validation

  let newErrors = {};

  if (!loginData.username) newErrors.username = "Username is required";
  if (!loginData.password) newErrors.password = "Password is required";

  // If errors exist, update the state and stop form submission
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  let loginPayload = { ...loginData };
  if (isPhone(loginPayload.username) && !loginPayload.username.startsWith('+91')) {
    loginPayload.username = "+91" + loginPayload.username;
  }

  try {

  const response = await axios.post(`${baseURL}/api/login`, loginPayload, {

    headers: { "Content-Type": "application/json" },
    withCredentials: true, 
  });

  const data = response.data; 

  if (data.success) {
    console.log(data)

    const authRes = await axios.get(`${baseURL}/api/auth`, {

      withCredentials: true,
    });
    setUser(authRes.data);
    navigate("/home");
  
  } else {
    alert(data?.message || "Login failed.");
  }
  }  catch (err) {
    
    if (err.response) {
      alert(err.response.data?.message || `Login failed (${err.response.status})`);
    } else if (err.request) {
      alert("No response from server. Check your network.");
    } else {
      alert("Unexpected error. Please try again.");
    }
  }
 };
  const handleLoginChange = (e) => {
    setloginData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));

    setErrors((prevErrors) => ({
    ...prevErrors,
    [e.target.name]: "",
  }));
  };
 
  const handleSignUpChange = (e) => {
    setsignUpData((prev)=>({ ...prev, [e.target.name]: e.target.value }));
    
    setErrors((prevErrors) => ({
    ...prevErrors,
    [e.target.name]: "",
  }));
  };

  const handleSignUp = async (e) => {
  e.preventDefault();
  setErrors({});

  const newErrors = {};

  if (!signUpData.firstName) newErrors.firstName = "First name is required";
  if (!signUpData.phone) newErrors.phone = "Phone number is required";
 // if (!signUpData.gender) newErrors.gender = "Gender is required";
  if (!signUpData.signupPassword) newErrors.signupPassword = "Password is required";
  if (signUpData.signupPassword !== signUpData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (userType === "Business" && !signUpData.userType) {
    newErrors.userType = "Business partner type is required";
  }
  console.log(signUpData.userType)

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
   
  let signupPayload = { ...signUpData };
  if (isPhone(signUpData.phone)) {
    signupPayload.phone = "+91" + signupPayload.phone;
  }
  console.log(signupPayload.userType)
  try {

    const response = await fetch(`${baseURL}/api/signup`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...signupPayload}),
    });

    const data = await response.json();

    if (data.success) {
      alert("Signup successful!");
      setIsOpen(false); // Go back to login
    } else {
      alert(data.message || "Signup failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong during signup.");
  }
};


  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  const handleUserTypeChange = (e) => {
  const selectedType = e.target.value;
  setUserType(selectedType);

  setsignUpData((prev) => ({
    ...prev,
    userType: selectedType === "Customer" ? "Customer" : "", // clear if Business
  }));
  if(selectedType==="Customer")
  {
    setErrors((prevErrors) => ({
    ...prevErrors,
    userType: "",
  }));
  }
};

 useEffect(() => {
  if (user) {
    navigate("/home");
  }
}, [user, navigate]);

  return (
   <>
       <Helmet>
                <title>Login | India Doors</title>
       </Helmet>  
  {/* <div style={{display:"flex", flexDirection:"row"}}> */}
    <div className={styles.page}>
          
      <div className={styles.toggleSwitchContainer}>
        <span className={styles.toggleLabelLeft}>Sign In</span>

        <label className={styles.switch}>
          <input 
            type="checkbox" 
            checked={isOpen} 
            onChange={toggleDoor} 
          />
          <span className={styles.slider}></span>
        </label>

        <span className={styles.toggleLabelRight}>Sign Up</span>
      </div>

      {/* Mobile view with flip animation */}
      {isMobile ? (
        <div className={styles.formFlipCard}>
          <div className={`${styles.cardInner} ${isOpen ? styles.flipped : ""}`}>
            {/* Front Face - Login Form */}
            <div className={`${styles.cardFace} ${styles.front}`}>
              <div className={styles.formContainer}>
                {/** Login Form (use your same logic and fields) */}
               <form  className={`${styles.form} ${styles.login}`} onSubmit={handleLogin}>
            {/* Username Field */}
            <div className={styles.fieldContainer}>
              <label className={styles.label}>
                  Username <span className={styles.asterisk}>*</span>
                </label>
                <input
                  placeholder="Enter email or phone"
                  type="text"
                  name="username"
                  className={styles.inputStyle}
                  onChange={handleLoginChange}
                />
                <p className={styles.error} style={{ minHeight: "16px", visibility: errors.username ? "visible" : "hidden" }}>
                   {errors.username || "⠀"} {/* Unicode space to keep height */}
                </p>
            </div>
            

            {/* Password Field */}
            <div className={styles.fieldContainer} style={{ position: "relative" }}>

              <label className={styles.label}>
                Password <span className={styles.asterisk}>*</span>
              </label>
              <div style={{position:'relative', display:'flex',alignItems:'center',width:'100%'}}>
              <input
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.inputStyle}
                onChange={handleLoginChange}
                style={{ paddingRight: "40px" }}
              />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                    userSelect: "none",
                    fontSize: "16px",
                    color: "Black"
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                </div>
              <p className={styles.error} style={{ minHeight: "16px", visibility: errors.password ? "visible" : "hidden" }}>
                   {errors.password || "⠀"} {/* Unicode space to keep height */}
                </p>
            </div>
            

            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
              </button>
              <button className={styles.button}>Forgot Password</button>
            </div>
         </form>
              </div>
            </div>

            {/* Back Face - Sign Up Form */}
            <div className={`${styles.cardFace} ${styles.back}`}>
              <div className={styles.formContainer}>
                <form  className={`${styles.form} ${styles.signUp}`}  onSubmit={handleSignUp}>
            <div className={styles.radioSelect}>
              <label>
                <input
                  type="radio"
                  value="Customer"
                  checked={userType === "Customer"}
                  onChange={handleUserTypeChange}
                />
                Customer
              </label>
              <label >
                <input
                  type="radio"
                  value="Business"
                  checked={userType === "Business"}
                  onChange={handleUserTypeChange}
                />
                Business Partner
              </label>
            </div>

       {userType === "Business" && (
        <div style={{width:'100%'}}>
            <div className={styles.radioSelect}>
                <label className={styles.label}>
                  User Type <span className={styles.asterisk}>*</span>
                </label>
                <select
                  name="userType"
                  className={styles.inputStyle}
                  
                  onChange={handleSignUpChange}        
                >
                  <option value="">-- Select Role --</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Builder">Builder</option>
                  <option value="Other">Other</option>
                </select>
                
            </div>
             <p className={styles.error} style={{ minHeight: "16px", visibility: errors.userType ? "visible" : "hidden" }}>
                   {errors.userType || "⠀"} {/* Unicode space to keep height */}
            </p>
        </div>
       )}

          {/* Name */}
          <div className={styles.fieldContainerSignUp} >
            <label className={styles.label}>
              Name <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Enter First Name"  
              type="text"
              name="firstName"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.firstName ? "visible" : "hidden" }}>
                   {errors.firstName || "⠀"} {/* Unicode space to keep height */}
            </p>
          </div>
          

          {/* Last Name (Optional, No Asterisk) */}
          {/* <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>Last Name</label>
            <input
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.lastName ? "visible" : "hidden" }}>
                   {errors.lastName || "⠀"} 
                </p>
          </div> */}

          {/* <div style={{width:'100%'}}>
           <div className={styles.radioSelect}>
              <label>Gender: <span className={styles.asterisk}>*</span></label>
              <label>
                <input
                  type="radio"
                  value="Male"
                  name="gender" 
                  checked={signUpData.gender === "Male"}
                  onChange={handleSignUpChange}
                />
                Male
              </label>
              <label >
                <input
                  type="radio"
                  value="Female"
                  name="gender" 
                  checked={signUpData.gender === "Female"}
                  onChange={handleSignUpChange}
                />
                Female
              </label>
              <label >
                <input
                  type="radio"
                  value="Other"
                  name="gender" 
                  checked={signUpData.gender === "Other"}
                  onChange={handleSignUpChange}
                />
                Other
              </label>
              
             </div>
                <p className={styles.error} style={{ minHeight: "16px", visibility: errors.gender ? "visible" : "hidden" }}>
                   {errors.gender || "⠀"} 
                </p>
            </div> */}

          {/* Phone Number */}
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Phone Number <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Enter Phone Number"
              type="tel"
              name="phone"
                maxLength={15}
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.phone ? "visible" : "hidden" }}>
                   {errors.phone || "⠀"} {/* Unicode space to keep height */}
                </p>
          </div>
          
           {/* <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Email
            </label>
            <input
              placeholder="Enter Email"
              type="email"
              name="email"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.email ? "visible" : "hidden" }}>
                   {errors.email || "⠀"} 
                </p>
          </div> */}
          

          {/* <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              User Type 
            </label>
            <select
              name="userType"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
              defaultValue="customer" // Sets default selection
            >
              <option value="retailer">Retailer</option>
              <option value="carpenter">Carpenter</option>
              <option value="interior-designer">Interior Designer</option>
              <option value="builders">Builders</option>
              <option value="customer">Customer</option> // Default selected
            </select>
            {errors.userType && <p className={styles.error}>{errors.userType}</p>}
          </div> */}

          {/* Password */}
          <div className={styles.fieldContainerSignUp} style={{position:"relative"}}>
            <label className={styles.label}>
              Password <span className={styles.asterisk}>*</span>
            </label>
            <div style={{position:'relative', display:'flex',alignItems:'center',width:'100%'}}>
            <input
              placeholder="Enter Password"
               type={showSignUpPassword ? "text" : "password"}
              name="signupPassword"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
              <span
                    onClick={() => setShowSignUpPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px", 
                      cursor: "pointer",
                      userSelect: "none",
                      fontSize: "16px",
                      color: "Black"
                    }}
                  >
                    {showSignUpPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              </div> 
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.signupPassword ? "visible" : "hidden" }}>
                   {errors.signupPassword || "⠀"} {/* Unicode space to keep height */}
                </p>
          </div>
          

          {/* Confirm Password */}
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Confirm Password <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>
          

          <div style={{marginTop:"10px"}}><button type='submit' className={styles.button}>Submit</button></div>
          
        </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div className={styles.formContainerWrapper}>
       <div className={styles.formContainer} style={{alignItems:'centre'}}>
         
          <form  className={`${styles.form} ${styles.login}`} onSubmit={handleLogin}>
            {/* Username Field */}
            <div className={styles.fieldContainer}>
              <label className={styles.label}>
                  Username <span className={styles.asterisk}>*</span>
                </label>
                <input
                  placeholder="Enter email or phone"
                  type="text"
                  name="username"
                  className={styles.inputStyle}
                  onChange={handleLoginChange}
                />
                <p className={styles.error} style={{ minHeight: "16px", visibility: errors.username ? "visible" : "hidden" }}>
                   {errors.username || "⠀"} {/* Unicode space to keep height */}
                </p>
            </div>
            

            {/* Password Field */}
            <div className={styles.fieldContainer} style={{ position: "relative" }}>

              <label className={styles.label}>
                Password <span className={styles.asterisk}>*</span>
              </label>
              <div style={{position:'relative', display:'flex',alignItems:'center',width:'100%'}}>
              <input
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                name="password"
                className={styles.inputStyle}
                onChange={handleLoginChange}
                style={{ paddingRight: "40px" }}
              />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    cursor: "pointer",
                    userSelect: "none",
                    fontSize: "16px",
                    color: "Black"
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                </div>
              <p className={styles.error} style={{ minHeight: "16px", visibility: errors.password ? "visible" : "hidden" }}>
                   {errors.password || "⠀"} {/* Unicode space to keep height */}
                </p>
            </div>
            

            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
              </button>
              <button className={styles.button}>Forgot Password</button>
            </div>
         </form>

          {/* <DynamicForm fields={fields} onSubmit={handleFormSubmit}/>  */}
            {/* <div className={styles.doorToggleContainer}>
              <p>For new users</p>
              <button className={`${styles.button} ${styles.doorToggle}`} onClick={toggleDoor}>Sign up</button>
            </div> */}
        
       </div>

       <div className={styles.formContainer} style={{alignItems:'flex-start'}}>
        <div className={`${styles.door} ${isOpen ? styles.open : ''}`}>
          <img className={styles.doorImage} src="login_door.jpg" alt='door'/>
        </div>
        
        {/* <DynamicForm fields={fields} onSubmit={handleFormSubmit}/> */}

        <form  className={`${styles.form} ${styles.signUp}`}  onSubmit={handleSignUp}>
            <div className={styles.radioSelect}>
              <label>
                <input
                  type="radio"
                  value="Customer"
                  checked={userType === "Customer"}
                  onChange={handleUserTypeChange}
                />
                Customer
              </label>
              <label >
                <input
                  type="radio"
                  value="Business"
                  checked={userType === "Business"}
                  onChange={handleUserTypeChange}
                />
                Business Partner
              </label>
            </div>

       {userType === "Business" && (
        <div style={{width:'100%'}}>
            <div className={styles.radioSelect}>
                <label className={styles.label}>
                  User Type <span className={styles.asterisk}>*</span>
                </label>
                <select
                  name="userType"
                  className={styles.inputStyle}
                  
                  onChange={handleSignUpChange}        
                >
                  <option value="">-- Select Role --</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Builder">Builder</option>
                  <option value="Other">Other</option>
                </select>
                
            </div>
             <p className={styles.error} style={{ minHeight: "16px", visibility: errors.userType ? "visible" : "hidden" }}>
                   {errors.userType || "⠀"} {/* Unicode space to keep height */}
            </p>
        </div>
       )}

          {/* Name */}
          <div className={styles.fieldContainerSignUp} >
            <label className={styles.label}>
              Name <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Enter First Name"  
              type="text"
              name="firstName"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.firstName ? "visible" : "hidden" }}>
                   {errors.firstName || "⠀"} {/* Unicode space to keep height */}
            </p>
          </div>
          

          {/* Last Name (Optional, No Asterisk) */}
          {/* <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>Last Name</label>
            <input
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.lastName ? "visible" : "hidden" }}>
                   {errors.lastName || "⠀"} 
                </p>
          </div> */}

          {/* <div style={{width:'100%'}}>
           <div className={styles.radioSelect}>
              <label>Gender: <span className={styles.asterisk}>*</span></label>
              <label>
                <input
                  type="radio"
                  value="Male"
                  name="gender" 
                  checked={signUpData.gender === "Male"}
                  onChange={handleSignUpChange}
                />
                Male
              </label>
              <label >
                <input
                  type="radio"
                  value="Female"
                  name="gender" 
                  checked={signUpData.gender === "Female"}
                  onChange={handleSignUpChange}
                />
                Female
              </label>
              <label >
                <input
                  type="radio"
                  value="Other"
                  name="gender" 
                  checked={signUpData.gender === "Other"}
                  onChange={handleSignUpChange}
                />
                Other
              </label>
              
             </div>
                <p className={styles.error} style={{ minHeight: "16px", visibility: errors.gender ? "visible" : "hidden" }}>
                   {errors.gender || "⠀"} 
                </p>
            </div> */}

          {/* Phone Number */}
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Phone Number <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Enter Phone Number"
              type="tel"
              name="phone"
                maxLength={15}
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.phone ? "visible" : "hidden" }}>
                   {errors.phone || "⠀"} {/* Unicode space to keep height */}
                </p>
          </div>
          
           {/* <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Email
            </label>
            <input
              placeholder="Enter Email"
              type="email"
              name="email"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.email ? "visible" : "hidden" }}>
                   {errors.email || "⠀"} 
                </p>
          </div> */}
          

          {/* <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              User Type 
            </label>
            <select
              name="userType"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
              defaultValue="customer" // Sets default selection
            >
              <option value="retailer">Retailer</option>
              <option value="carpenter">Carpenter</option>
              <option value="interior-designer">Interior Designer</option>
              <option value="builders">Builders</option>
              <option value="customer">Customer</option> // Default selected
            </select>
            {errors.userType && <p className={styles.error}>{errors.userType}</p>}
          </div> */}

          {/* Password */}
          <div className={styles.fieldContainerSignUp} style={{position:"relative"}}>
            <label className={styles.label}>
              Password <span className={styles.asterisk}>*</span>
            </label>
            <div style={{position:'relative', display:'flex',alignItems:'center',width:'100%'}}>
            <input
              placeholder="Enter Password"
               type={showSignUpPassword ? "text" : "password"}
              name="signupPassword"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
              <span
                    onClick={() => setShowSignUpPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px", 
                      cursor: "pointer",
                      userSelect: "none",
                      fontSize: "16px",
                      color: "Black"
                    }}
                  >
                    {showSignUpPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              </div> 
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.signupPassword ? "visible" : "hidden" }}>
                   {errors.signupPassword || "⠀"} {/* Unicode space to keep height */}
                </p>
          </div>
          

          {/* Confirm Password */}
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Confirm Password <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>
          

          <div style={{marginTop:"10px"}}><button type='submit' className={styles.button}>Submit</button></div>
          
        </form>

        {/* <div className={styles.doorToggleContainer}>
          <p>If already registered</p>
          <button className={`${styles.button} ${styles.doorToggle}`} onClick={toggleDoor}>Sign in</button>
        </div> */}
       </div> 
       </div>
      )}
    </div>
    {/* </div> */}
     </>    
  );
}

export default LoginPage;