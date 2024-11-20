import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom"
import JoblyApi from "./joblyApi";
import JobCard from "./JobCard";
import IsUserLoggedIn from "./isUserLoggedIn";
import UserContext from "./UserContext";


const CompanyPage = ({ jobs, getJobs }) => {
    const { currentUser } = useContext(UserContext)
    const userInfo = {
        username: currentUser.username,
        applications: currentUser.applications
    }

    const location = useLocation();
    const { handle, name, description } = location.state || ''

    // NOTE: I wasn't able to find an API point for filtering jobs by company?
    const companyJobs = jobs.filter(job => job.companyHandle === handle)

    return (
        <div>
            <IsUserLoggedIn />
            <div class='page-title'>
                <div>
                    <h2>{name}</h2>
                </div>
                <div>
                    <p>{description}</p>
                </div>
            </div>        
            <div>
            <div>
                {companyJobs.map(j => (                    
                    <JobCard job={j} userInfo={userInfo}/>                    
                ))}            
            </div>
            </div>
        </div>
    )
}

export default CompanyPage