import React, { useState, useEffect, useContext } from "react";
import EditUserForm from "./EditUserForm"
import UserContext from "./UserContext";
import JoblyApi from "./joblyApi";


const Profile = (patchUser) => {
    const { currentUser } = useContext(UserContext)
    
    const getAccountDetails = async (username) => {
        let uRes = await JoblyApi.getUserInfo(username)            
        return uRes
    }        

    let userDetails = getAccountDetails(currentUser.username)

    return (
        <div>
            <EditUserForm user={userDetails} patchUser={patchUser} />
        </div>
    )
}

export default Profile