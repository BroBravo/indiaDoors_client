import React from "react";
import  "./index.scss"
import { Link } from 'react-router-dom'
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

function navbar(){
    return(
        <nav className="navbar">
            {
                menuItems.map((item,key)=>(
                   <ul key={key} className="navbar_items">
                        <Link to={item.to}>
                           {item.label}
                        </Link>

                   </ul> 
                ))
            }
        </nav>
    )
}

export default navbar