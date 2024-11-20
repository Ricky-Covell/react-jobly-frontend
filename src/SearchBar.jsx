import React, { useState, useEffect } from "react";
import JoblyApi from "./joblyApi";

const SearchBar = ({ searchType, updateList }) => {
    const [query, setQuery] = useState('')

    // Updates searchbar display while typing
    const handleChange = (evt) => {
        const { value } = evt.target
        setQuery(() => (value))
    }

    // On Submit: 
    const handleSubmit = async (evt) => {
        evt.preventDefault()

        switch(searchType) {
            case 'Companies':
                let foundCompanies = await JoblyApi.searchCompanies(query)
                return updateList(foundCompanies)

            case 'Jobs':
                let foundJobs = await JoblyApi.searchJobs({searchTerm: query})
                return updateList(foundJobs)
        }
    }

    return (
        <div>
            <div class='search-bar'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                      onChange={handleChange}
                      type="text" 
                      value={query}
                      id='search-bar'
                      required
                    />
                    <button id="addItemButton" type="submit">Search</button>
                </div>                                  
            </form>
            </div>
        </div>
    )
}

export default SearchBar