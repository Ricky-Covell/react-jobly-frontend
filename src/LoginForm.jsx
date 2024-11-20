import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardBody, CardTitle } from "reactstrap";

const LoginForm = ({ loginUser }) => {
    const [formData, setFormData] = useState({
        username: null,
        password: null,        
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
        await loginUser(formData)
        navigate('/')
    }    

    return (        
          <Card>
            <CardTitle>
                <h3>Login</h3>
            </CardTitle>
            <CardBody>
            <div class='.card-container'> 
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
                </div>
                <div id='submitButtonContainer'>
                    <button id="addItemButton">Login </button>
                </div>                    
            </form>
            </div>
            </CardBody>
        </Card>            
)
}

export default LoginForm
