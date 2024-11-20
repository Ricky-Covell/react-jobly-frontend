import React, { useState, useEffect } from "react";
import './App.css'

const CompanyCard = ({ company }) => {
    return (
        <div class='card-container'>
            <div>
                <h2>{company.name}</h2>
            </div>
            <div>
                <p>{company.description}</p>
            </div>
        </div>
    )
}

export default CompanyCard