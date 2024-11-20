import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import useLocalStorage from "./useLocalStorage.js";
import UserContext from "./UserContext.jsx";
import JoblyApi from './joblyApi.js'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import JobList from './JobList.jsx'
import CompanyList from './CompanyList.jsx'
import CompanyPage from './CompanyPage.jsx'
import Profile from './Profile.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const [lists, setLists] = useState({
    companies: null,
    jobs: null,
  })
  useEffect(() => {
    const getLists = async () => {
      let res = await JoblyApi.getAll()
      const {jobs, companies} = res
      setLists({
        companies,
        jobs,
      })
      setIsLoading(false)
    }
    getLists()
  }, [])
  
  const user = useLocalStorage('get', 'user')
  const [currentUser, setCurrentUser] = useState(user)

  const token = useLocalStorage('get', 'token')
  const [userToken, setUserToken] = useState(token)
  useEffect(() => {
    const getUserInfo = async () => {
      if (Object.keys(userToken).length !== 0) {
        const u = await JoblyApi.decodeToken(userToken)
        useLocalStorage('set', 'token', userToken)

        const { user }  = await JoblyApi.getUserInfo(u.username)
        const { username, applications, isAdmin} = user
        
        useLocalStorage('set', 'user', { username, applications, isAdmin})
        setCurrentUser({ username, applications, isAdmin })
      } else {
        setCurrentUser({})
      }     
    }
    getUserInfo()
  }, [userToken])

  // // // // // // // // Helper function for user functionality // // // // // // // // 

  /** user: {username, password} --> returns JWT token. */
  const login = async (user) => {
    const { token } = await JoblyApi.login(user)
    setUserToken(token)
  }

  const logout = () => {
    useLocalStorage('logout')
    setCurrentUser({})
  }

  const signup = async (newUser) => {
    const { token } = await JoblyApi.signup(newUser)
    setUserToken(token)
  }

  const editUser = async (newDetails) => {
    const { username, isAdmin } = await JoblyApi.patchUserInfo(newDetails)
    useLocalStorage('set', 'user', { username, isAdmin})
  }

  // // // // // // // // App // // // // // // // // 

  if (isLoading) return <h1>Still Loading</h1>
  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, userToken }}>
       <BrowserRouter>
         <Navbar logoutUser={logout}/>
         <main>
           <Routes>
             <Route exact path='/' element={<Home />}/>
             <Route exact path='/Login' element={<LoginForm loginUser={login} />}/>
             <Route exact path='/Signup' element={<SignupForm registerUser={signup} />}/>
             <Route exact path='/Jobs' element={<JobList jobs={lists.jobs}/>}/>
             <Route exact path='/Companies' element={<CompanyList companies={lists.companies} />}/>
             <Route exact path='/Companies/:handle' element={<CompanyPage jobs={lists.jobs} />}/>
             <Route exact path='/Profile' element={<Profile patchUser={editUser}/>}/>
           </Routes>
         </main>
       </BrowserRouter>
      </UserContext.Provider>  
    </div>
  );
}

export default App;
