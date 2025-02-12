import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import  "./index.scss"
import { Link } from 'react-router-dom'
const menuItems=[
    {
        label:'HOME',
        to:'/'
    },
    {
        label:'ABOUT US',
        to:'/about'
    },  
    {
        label:'CONTACT US',
        to:'/contact'
    },
    {
        label:'SERVICES',
        to:'/#service_section'
    }
]


function Navbar(){
    const[LoggedInUsername,setLoggedInUsername]=useState("Login/Sign up")
    const fetchUserInfo = async () => {
  try {
    const response = await axios.get("http://localhost:4000/auth", { withCredentials: true });
    setLoggedInUsername(response.data.username);
  } catch (err) {
    console.error("Token expired or invalid", err);
    setLoggedInUsername("Login/Sign up"); // Clear username if token is invalid
  }
};

// Call fetchUserInfo on component mount
useEffect(() => {
  fetchUserInfo();
}, []);
    return(
        <nav className="navbar">
            {
                menuItems.map((item,key)=>(
                   <div key={key} className="navbar_items">
                        <Link to={item.to} className="navbar_items_link">{item.label}</Link>
                           
                   </div> 
                ))
            }
            <div className="login_info">
                <div className="login_info_username"><Link to='/login' className="navbar_items_link">{LoggedInUsername}</Link></div>
                <div className="login_image_container"><img src="/defaultuser.webp" className="login_info_image" alt="pic" /></div>
                
            </div>
        </nav>
    )
}

export default Navbar