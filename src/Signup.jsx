import React, { useState } from 'react'
import { CiLock } from "react-icons/ci";

import API_BASE_URL from "./config";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
const Signup = () => {

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState("");
  const handleChange = (e) =>
  {
    
    setForm({...form,
      [e.target.name]:e.target.value
    })
  }
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    
    password: "",
    confirmPassword:""
  
  })
  
const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSignupSuccess("");

    if (!form.email.match(emailPattern)) {
        return setError("Enter valid email");
    }

    if (!form.password.match(passwordPattern)) {
        return setError("Password must contain 8 characters, uppercase, lowercase, number and special character");
    }

    if (form.password !== form.confirmPassword) {
        return setError("Password and confirmPassword doesn't match");
    }

    try {
       const response = await fetch(`${API_BASE_URL}/api/signup`, {
          method: "POST",
           credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: form.email,
                password: form.password
            })
        });

        const message = await response.text();

        if (!response.ok) {
            setError(message || "Cannot Register");
            return;
        }

        setSignupSuccess(message || "Registered Successfully");

        setTimeout(() => {
            setSignupSuccess("");
        }, 2000);

        setForm({
            email: "",
            password: "",
            confirmPassword: ""
        });

        setShowPassword(false);
    }
    catch (error) {
        setError("Unable to connect to server");
        console.error(error);
    }
};

  return (
    <div className='w-120 bg-[#0B1026] min-h-120 rounded-b-2xl'>
      <div className=''>
        <div>
          <div>
            <h1 className='text-white text-center pt-4 text-4xl font-semibold'>Create Your Account</h1>
          </div>
          <div>
            
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center items-center'>
              <div className='flex justify-center flex-col gap-10 mt-20'>
              <div className='items-center flex justify-center bg-[#20264A] border-1 text-white font-extralight text-xl pl-5 border-white rounded-full w-80 h-12 '><MdOutlineMailOutline color='white' size={28} /><input className='w-full h-full pl-4 border-0 rounded-2xl bg-transparent border-transparent focus:ring-0 focus:outline-none'  type='email' placeholder='Email Address' name='email' value={form.email} onChange={handleChange} required /></div>
                
                <div className='items-center flex justify-center bg-[#20264A] border-1 text-white font-extralight text-xl pl-5 border-white rounded-full w-80 h-12 '><CiLock color='white' size={28} /><input className='w-full h-full pl-4 border-0 rounded-2xl bg-transparent border-transparent focus:ring-0 focus:outline-none' type={showPassword ? "text" : "password"} name='password' placeholder='password' value={form.password} onChange={handleChange} required/>{showPassword ? <LuEyeClosed color='white' size={28} className='mr-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> : <FaEye color='white' size={28} className='mr-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)} name='password' />}</div>
                <div className='items-center flex justify-center bg-[#20264A] border-1 text-white font-extralight text-xl pl-5 border-white rounded-full w-80 h-12 '><CiLock color='white' size={28} /><input className='w-full h-full pl-4 border-0 rounded-2xl bg-transparent border-transparent focus:ring-0 focus:outline-none'  type='password' placeholder='Confirm Password' name='confirmPassword' value={form.confirmPassword} onChange={handleChange} required/></div>
                <button type='submit' className='self-center align-middle text-xl cursor-pointer hover:shadow-[0_0_20px] hover:shadow-violet-500 text-white font-semibold w-60 h-12 rounded-full bg-linear-to-r from-violet-500 to-blue-800'>Signup →</button>
              </div>
              
            </div>
          </form>
          <div></div>
          {error ? <p className='text-red-400 text-xl text-center mt-4 bottom-2 relative'>{error}</p>:<p className='text-green-500 text-xl text-center mt-4 bottom-2 relative'>{signupSuccess}</p>}
        </div>
      </div>
    </div>
  )
}

export default Signup