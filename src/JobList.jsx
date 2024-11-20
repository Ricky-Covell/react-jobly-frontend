import React, { useState, useEffect, useContext } from "react";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import IsUserLoggedIn from "./isUserLoggedIn";
import JoblyApi from "./joblyApi";
import UserContext from "./UserContext";

const JobList = ({ jobs }) => {    
    const { currentUser } = useContext(UserContext)

    const [list, setList] = useState(jobs)

    const update = (newList) => {
        setList(newList)
    }

    return (
        <div>
            <IsUserLoggedIn />
            <div>
                <SearchBar searchType='Jobs' updateList={update}/>
            </div>
            <div>
                {list.map(j => (
                    <JobCard job={j} userInfo={currentUser} />
                ))}
            </div>
        </div>
    )
}


export default JobList