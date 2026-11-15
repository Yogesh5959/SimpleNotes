import React from 'react'
import AddNotes from './AddNotes'

import Home from './Home'
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import ViewNotes from './ViewNotes'
import Signup from './Signup'
import Login from './Login'
import LoginandSignup from './LoginandSignup'
import UpdateNotes from './UpdateNotes'
import User from './User'


const App = () => {
  return (
    <div>
      
          
      <Routes>
        
        <Route path='*' element={<Navigate to={"/Signup"} />} />
        <Route path='/Signup' element={<LoginandSignup/>}/>
        <Route path='/' element={<Home />} />
        <Route path="/addnotes" element={<AddNotes />} />
        
        <Route path='/UpdateNote' element={<UpdateNotes/>}/>
        <Route path="/Notes" element={<ViewNotes />} />
        <Route path='/User' element={<User/>}/>
        </Routes>
      
      
     </div>
  )
}

export default App