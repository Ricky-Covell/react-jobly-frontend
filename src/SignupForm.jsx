import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardTitle } from "reactstrap";

const SignupForm = ({ registerUser }) => {
    const [formData, setFormData] = useState({
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        email: null,
    })

    const navigate = useNavigate()

    // Updates form display while typing
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))}

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        await registerUser(formData)
        navigate('/')
    }    

    return (
        <Card>
            <CardTitle>
                <h3>Sign Up</h3>
            </CardTitle>
            <CardBody>
            <div>
            <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="username"
                      value={formData.username}
                      id="username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="password"
                      value={formData.password}
                      id="password"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      id="firstName"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      id="lastName"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="email"
                      value={formData.email}
                      id="email"
                      required
                    />
                  </div>
                </div>
                <div id='submitButtonContainer'>
                    <button id="addItemButton">Register</button>
                </div>                    
            </form>
            </div>
            </CardBody>
        </Card>            
)
}
export default SignupForm