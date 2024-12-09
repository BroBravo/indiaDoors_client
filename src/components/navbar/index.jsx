import React from "react";
import  "./index.scss"
//import { Link } from 'react-router-dom'
const menuItems=[
    {
        label:'Home',
        to:'/'
    },
    {
        label:'About us',
        to:'/about us'
    },
    {
        label:'Login',
        to:'/user login'
    },
    {
        label:'Contact us',
        to:'/'
    }
]

function Navbar(){
    return(
        <nav className="navbar">
            {
                menuItems.map((item,key)=>(
                   <div key={key} className="navbar_items">
                        
                           {item.label}
                        

                   </div> 
                ))
            }
        </nav>
    )
}

export default Navbar