import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";

import { CiLock } from "react-icons/ci";
import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();
    const handleChange = (e) =>
    {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:8080/api/Login",
                {
                    method: "Post",
                     
                    credentials: "include",
                    headers:
                    
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userName: form.email,
                        password: form.password
                    })
                }
            );

            const result = await response.text();
            if (!response.ok) {
                setError(result);
            }
            else {
                navigate("/");
            
            }
        }
        catch (error)
        {
            setError("Unable to connect to Server");
        }
        
    }
  return (
      <div className='w-120 bg-[#0B1026] min-h-120 rounded-b-2xl'>
      <div className=''>
        <div>
          <div>
            <h1 className='text-white text-center pt-4 text-4xl font-semibold'>Welcome Back, Login</h1>
          </div>
                  <div>
                      
                      <form onSubmit={handleSubmit}>
                          <div className='flex justify-center items-center'>
                                <div className='flex justify-center flex-col gap-10 mt-20'>
                                        <div className='items-center flex justify-center bg-[#20264A] border-1 text-white font-extralight text-xl pl-5  border-white rounded-full w-80 h-12 '><MdOutlineMailOutline color='white' size={28} /><input className='w-full h-full pl-4 border-0 rounded-2xl bg-transparent border-transparent focus:ring-0 focus:outline-none'  type='email' placeholder='Email Address' name='email' onChange={handleChange} value={form.email} required /></div>
                                          <div className='items-center flex justify-center bg-[#20264A] border-1 text-white font-extralight text-xl pl-5 border-white rounded-full w-80 h-12 '><CiLock color='white' size={28} /><input className='w-full h-full pl-4 border-0 rounded-2xl bg-transparent border-transparent focus:ring-0 focus:outline-none'  type={showPassword?"text":"password"} placeholder='Password' name='password' value={form.password} onChange={handleChange} required/>{showPassword ? <LuEyeClosed color='white' size={28} className='mr-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> : <FaEye color='white' size={28} className='mr-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)} name='password' />}</div>
                                  <button type='submit' className='self-center hover:shadow-[0_0_20px] hover:shadow-violet-500 align-middle text-xl cursor-pointer text-white font-semibold w-60 h-12 rounded-full bg-linear-to-r from-violet-500 to-blue-800'>Login →</button>
                                  {error && <p className='text-xl text-center text-red-500'>{error}</p>}  
                              </div>
                              
                            </div>
                      </form>
            </div>
         </div>
        </div>
    </div>
  )
}

export default Login