import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import UserContext from "./UserContext";

const Home = () => {
    const { currentUser } = useContext(UserContext)
    
    const loggedIn = (
        <div class='home'>
            <h1>Welcome, {currentUser.username}</h1>
        </div>
    )

    const notLoggedIn = (
        <div class='home'>
            <h1>Please Login or Sign Up</h1>
            <div>
                <span class='home-item'>
                    <Link to={'/login'}>
                        <button type="button">
                            Login
                        </button>
                    </Link>
                </span>
                <span class='home-item'>
                    <Link to={'/signup'}>
                        <button type="button">
                            Signup
                        </button>
                    </Link>
                </span>
            </div>
        </div>
    )

    const homePage = (Object.keys(currentUser).length === 0) 
        ? notLoggedIn  
        : loggedIn

    return homePage
}

export default Home