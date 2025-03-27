import React, { useState } from 'react';
import DynamicForm from "../../components/form";
import styles from "./index.module.scss"; // Import SCSS module

function AboutUs() {

  const fields = [
    { label: "Name", name: "name", type: "text" , placeholder:"Enter Username"},
    { label: "Phone Number", name: "phone", type: "tel", placeholder:"+91 0000011111"},
    { label: "Password", name: "password", type: "password", placeholder:"Enter Password" },
    { label: "Confirm Password", name: "password", type: "password", placeholder:"Confirm Password" },
    { label: "Age", name: "age", type: "number", placeholder:"Enter your age" },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      placeholder:"Select gender"
    },
  ];
  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.formContainer}>
      
       <div className={styles.form}>
        <input placeholder='Username' type='text' name='username' className={styles.inputStyle}></input>
        <input placeholder='Password' type='password' name='username' className={styles.inputStyle}></input>
        <button className={styles.button} >Login</button>
       {/* <DynamicForm fields={fields} onSubmit={handleFormSubmit}/>  */}
        <div className={styles.doorToggleContainer}>
          <p>For new users</p>
          <button className={`${styles.button} ${styles.doorToggle}`} onClick={toggleDoor}>Sign up</button>
        </div>
        
      </div>

      <div className={styles.form}>
        <div className={`${styles.door} ${isOpen ? styles.open : ''}`}>
          <img className={styles.doorImage} src="login_door.jpg"/>
        </div>
        <DynamicForm fields={fields} onSubmit={handleFormSubmit}/>
        <div className={styles.doorToggleContainer}>
          <p>If already registered</p>
          <button className={`${styles.button} ${styles.doorToggle}`} onClick={toggleDoor}>Sign in</button>
        </div>
      </div> 
    </div>
  );
}

export default AboutUs;
