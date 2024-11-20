import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"
import UserContext from "./UserContext";

const Navbar = ({ logoutUser }) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)

    const handleLogout = () => {
        logoutUser()
        navigate('/')
    }

    const loggedIn = (
        <span>
            <span class='nav-item'>
                <NavLink to={'/companies'}>
                        Companies
                </NavLink>
            </span>
            <span class='nav-item'>
                <NavLink to={'/jobs'}>
                        Jobs
                </NavLink>
            </span>
            <span class='nav-item'>
                <NavLink to={'/profile'}>
                        Profile
                </NavLink>
            </span>
            <span class='nav-item'>
                <NavLink onClick={handleLogout}>
                        Logout
                </NavLink>
            </span>
        </span>
    )

    const notLoggedIn = (
        <span>
            <span class='nav-item'>
                <NavLink to={'/login'}>
                        Login
                </NavLink>
            </span>
            <span class='nav-item'>
                <NavLink to={'/signup'}>
                        Signup
                </NavLink>
            </span>
        </span>
    )

    const userLinks = (Object.keys(currentUser).length === 0) 
        ? notLoggedIn  
        : loggedIn

    return (
        <div id="navbar">            
            <span id='nav-jobly' class='nav-item'>
                <NavLink to={'/'}>
                        Jobly
                </NavLink>
            </span>
            <span>
                {userLinks}
            </span>            
        </div>
    )
}

export default Navbar