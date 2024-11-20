import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Card, CardBody, CardTitle } from "reactstrap";

const EditUserForm = (user, patchUser) => {
    const navigate = useNavigate()
    const { username, firstName, lastName } = user

    const [formData, setFormData] = useState({
        username, 
        firstName, 
        lastName 
    })


    // Updates form display while typing
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }))}

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        await patchUser(formData)
        navigate('/')
    }    

    return (
        <Card>
            <CardTitle>
                <h3>Edit Profile</h3>
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
                </div>
                <div id='submitButtonContainer'>
                    <button id="editProfileSubmit">Submit</button>
                </div>                    
            </form>
            </div>
            </CardBody>
        </Card>            
    )    
}

export default EditUserForm
