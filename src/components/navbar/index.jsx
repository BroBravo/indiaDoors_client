import React from "react";
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
        label:'LOGIN',
        to:'/login'
    },
    {
        label:'CONTACT US',
        to:'/contact'
    }
]

function Navbar(){
    return(
        <nav className="navbar">
            {
                menuItems.map((item,key)=>(
                   <div key={key} className="navbar_items">
                        <Link to={item.to} className="navbar_items_link">{item.label}</Link>
                           
                   </div> 
                ))
            }
        </nav>
    )
}

export default Navbar