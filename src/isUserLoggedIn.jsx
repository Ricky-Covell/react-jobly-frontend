import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "./UserContext"


const IsUserLoggedIn = () => {
    const { currentUser } = useContext(UserContext)

    if (Object.keys(currentUser).length === 0) {        
        return (
            <Navigate to='/' replace={true}/>
        )
    }
}

export default IsUserLoggedIn