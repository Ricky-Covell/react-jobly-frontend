import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CompanyCard from './CompanyCard'
import JoblyApi from "./joblyApi";
import IsUserLoggedIn from "./isUserLoggedIn";

const CompanyList = ({ companies }) => {
    const [list, setList] = useState(companies)

    const update = (newList) => {
        setList(newList)
    }

    return (
        <div>
            <IsUserLoggedIn />
            <div>
                <SearchBar searchType='Companies' updateList={update}/>
            </div>
            <div>
                {list.map(company => (
                    <div>
                        <Link 
                            to={`/companies/${company.handle}`}                                                                 
                            state={company}
                        >
                            <CompanyCard company={company} />
                        </Link>
                    </div>                                    
                ))}            
            </div>
        </div>
    )
}

export default CompanyList