// import styles from "./index.module.scss"; // Import SCSS module
// import axios from 'axios';
// import { useState } from 'react';

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset error message

//     try {
//       const response = await axios.post("http://localhost:4000/login", {
//         username,
//         password,
//       }, { withCredentials: true });

//       alert(`Welcome, ${response.data.username}!`);
//     } catch (err) {
//       if (err.response && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div className={styles.container_style}>
//       <img src='/loginImage.png' alt='login' className={styles.login_image} />
      
//       <form className={styles.formContainer_style} onSubmit={handleLogin}>
//         <input className={styles.input_style} type='text' id="username"
//           placeholder='User name' value={username} onChange={(e) => setUsername(e.target.value)} required />

//         <input className={styles.input_style} type='password' id="password"
//           placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

//         <button className={`${styles.button_style} ${styles.button_hover_style}`} type='submit'>Login</button>
//       </form>

//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
//import DynamicForm from "../../components/form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./index.module.scss"; // Import SCSS module

function LoginPage() {

   const navigate = useNavigate(); // Initialize navigation
  const [loginData, setloginData] = useState({ 
    username: "", 
    password: "" ,
    });

  const [signUpData,setsignUpData]=useState({
    firstName: "",
    lastName: "",
    phone: "",
    signupPassword: "", 
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  
  const [isOpen, setIsOpen] = useState(false);

  const [errors, setErrors] = useState({});

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

  try {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/home");
      window.location.reload();
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server unable to respond");
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
    setsignUpData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (data) => {

    console.log("Form Data:", data);
  };

  

  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.page}>
      
       <div className={styles.formContainer}>
          <form  className={`${styles.form} ${styles.login}`} onSubmit={handleLogin}>
            {/* Username Field */}
            <div className={styles.fieldContainer}>
              <label className={styles.label}>
                  Username <span className={styles.asterisk}>*</span>
                </label>
                <input
                  placeholder="Enter Username"
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
            <div className={styles.fieldContainer}>

              <label className={styles.label}>
                Password <span className={styles.asterisk}>*</span>
              </label>
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                className={styles.inputStyle}
                onChange={handleLoginChange}
              />
              <p className={styles.error} style={{ minHeight: "16px", visibility: errors.password ? "visible" : "hidden" }}>
                   {errors.password || "⠀"} {/* Unicode space to keep height */}
                </p>
            </div>
            

            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
              <button className={styles.button}>Login</button>
              <button className={styles.button}>Forgot Password</button>
            </div>
         </form>

          {/* <DynamicForm fields={fields} onSubmit={handleFormSubmit}/>  */}
            <div className={styles.doorToggleContainer}>
              <p>For new users</p>
              <button className={`${styles.button} ${styles.doorToggle}`} onClick={toggleDoor}>Sign up</button>
            </div>
        
      </div>

      <div className={styles.formContainer}>
        <div className={`${styles.door} ${isOpen ? styles.open : ''}`}>
          <img className={styles.doorImage} src="login_door.jpg" alt='door'/>
        </div>
        
        {/* <DynamicForm fields={fields} onSubmit={handleFormSubmit}/> */}

        <form  className={`${styles.form} ${styles.signUp}`}  onSubmit={handleLogin}>
          {/* First Name */}
          <div className={styles.fieldContainerSignUp} >
            <label className={styles.label}>
              First Name <span className={styles.asterisk}>*</span>
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
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>Last Name</label>
            <input
              placeholder="Enter Last Name"
              type="text"
              name="lastName"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.lastName ? "visible" : "hidden" }}>
                   {errors.lastName || "⠀"} {/* Unicode space to keep height */}
                </p>
          </div>
          

          {/* Phone Number */}
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Phone Number <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Enter Phone Number"
              type="tel"
              name="phone"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.phone ? "visible" : "hidden" }}>
                   {errors.phone || "⠀"} {/* Unicode space to keep height */}
                </p>
          </div>
          

          <div className={styles.fieldContainerSignUp}>
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
              <option value="customer">Customer</option> {/* Default selected */}
            </select>
            {errors.userType && <p className={styles.error}>{errors.userType}</p>}
          </div>

          {/* Password */}
          <div className={styles.fieldContainerSignUp}>
            <label className={styles.label}>
              Password <span className={styles.asterisk}>*</span>
            </label>
            <input
              placeholder="Enter Password"
              type="password"
              name="loginPassword"
              className={styles.inputStyle}
              onChange={handleSignUpChange}
            />
            <p className={styles.error} style={{ minHeight: "16px", visibility: errors.password ? "visible" : "hidden" }}>
                   {errors.password || "⠀"} {/* Unicode space to keep height */}
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
          

          <div className={styles.fieldContainerSignUp}><button className={styles.button}>Submit</button></div>
          
        </form>

        <div className={styles.doorToggleContainer}>
          <p>If already registered</p>
          <button className={`${styles.button} ${styles.doorToggle}`} onClick={toggleDoor}>Sign in</button>
        </div>
      </div> 
    </div>
  );
}

export default LoginPage;