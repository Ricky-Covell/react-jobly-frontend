import React, { useState, useEffect } from "react";
import JoblyApi from './joblyApi'

const JobCard = ({ job, userInfo }) => {
    const { username, applications } = userInfo
    const { title, salary, equity, id } = job

    const hasUserApplied = () => {
        if (applications.length === 0) return false
        return applications.some(j => j === job.id)
    }

    const hasApplied = hasUserApplied()

    const apply = async (evt) => {    
        evt.preventDefault()
        if (hasApplied) return
        
        try {
            const res = await JoblyApi.applyToJob(username, id)
            document.getElementById(`apply-${id}`)
                .innerText='Applied'

            return res            
        } catch (err) {
            console.log(err)
        }
    }

    const buttonText = (hasApplied) ? 'Applied' : 'Apply'

    return (
        <div class='card-container'>
            <div>
                <h2>{title}</h2>
            </div>
            <div>
                <p>Salary: {salary}</p>
            </div>
            <div>
                <p>Equity: {equity}</p>
            </div>
            <div>
                <button id={`apply-${id}`} onClick={apply}>
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default JobCard