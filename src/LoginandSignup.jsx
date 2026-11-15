import React, { useState } from 'react'
import Login from './Login'

import Signup from './Signup';

import { FaUserPlus } from "react-icons/fa";
const LoginandSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
  return (
      <div className=' bg-gradient-to-br from-[#3736A5] via-[#625BFF] to-[#E8E5FF] min-h-screen min-w-screen'>
          <div className='flex justify-center items-center'>
              <div className='w-2/4 items-center h-full'>
                  
                  <div>
                  
                      <div><h1 className='text-6xl mb-4 font-bold text-white'>Simple <span className='text-6xl font-bold text-[#A855F7] text-shadow-2xl text-shadow-voilet-800'>Notes</span></h1></div>
                      <div className=''>
                          <h1 className='text-4xl text-white font-semibold'>Your thoughts,</h1>
                            <h1 className='text-4xl mt-2 font-semibold text-[#A78BCA]'>beautifully organized.</h1>
                            <h1 className='font-extralight text-2xl text-violet-200'>Capture your ideas, organize your notes, and keep everything important in one place.</h1>
                      </div>
                      <div className='flex flex-row justify-center gap-20 mt-2'>
                          
                          <p className='bg-violet-800/20 text-violet-200 w-28 text-center rounded-full'>Create</p><p className='bg-indigo-800/20 text-indigo-200 w-28 text-center rounded-full'>Organize</p><p className='bg-purple-500/20 text-purple-200 w-28 text-center rounded-full'>Remember</p>
                      </div>
                  </div>
                  
              </div>
              
              <div>
                  <div className='min-h-screen items-center flex flex-col justify-center'>
                      <div className='w-full flex flex-row justify-between rounded-t-4xl bg-[#0B1026] text-white text-2xl font-semibold'>
                          <div className='w-1/2 border-0 cursor-pointer rounded-2xl' onClick={()=>setIsLogin(true)}  style={{backgroundColor:isLogin?"#072cd1":"#0B1026"}}>
                              <h1 className='text-center'>Login</h1>
                          </div> 
                          <div className=' w-1/2 border-0 rounded-2xl cursor-pointer' style={{ backgroundColor: !isLogin ? "#072cd1" : "#0B1026"}} onClick={()=>setIsLogin(false)}>
                              <h1 className='text-center'>Signup</h1>
                          </div>

                          
                      </div>
                      {
                          isLogin?<Login/>:<Signup/>
                      }
                  </div>
              </div>
          </div>
    </div>
  )
}

export default LoginandSignup