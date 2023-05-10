import React from 'react'
import {NavLink} from 'react-router-dom'

function NavBar(){
return <div className="navbar">
    <NavLink
            to="/"
            exact
            
            activeStyle={{
                color:"black",
            }}
            className="navOption"
            >
                Home 
            </NavLink>
        <NavLink
            to="/to-read"
            exact
           
            activeStyle={{
                color:"black",
            }}
            className="navOption"
            >
                To Read   
            </NavLink>
        <NavLink
            to="/new-book"
            exact
           
            activeStyle={{
                color:"black",
            }}
            className="navOption"
            >
                Add New Book  
            </NavLink>

</div>

}

export default NavBar