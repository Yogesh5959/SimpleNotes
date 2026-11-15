import React, { useEffect, useState } from 'react'
import OptionsList from './OptionsList'

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const UpdateNotes = () => {

    const navigate = useNavigate();
    
    const [error, setError] = useState("")
    const location = useLocation();
    const searchTitle = location.state?.title;
    
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({
        id: "",
        userid: "",
        title: "",
        content: ""
        
    })
    const handleChange = (e) =>
    {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    const updateChanges = async (e) =>
    {
        e.preventDefault();
        
        if (!form.title.trim() || !form.content.trim()) {
            return setError("Enter title and content");
        
        }
        
        if (form.content.length > 500)
        {
            return setError("The content can be minimum 1 and maximum 500 characters")
        }
        try
        {
            setError("");
            setSuccess("");
            const response = await fetch(`http://localhost:8080/api/note/update/${form.id}`,
                {
                    
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: form.id,
                        title: form.title,
                        content: form.content
                        
                    })
                }
            );
             if (response.status === 401) {
                navigate("/Signup");
                return;
            }
            if (!response.ok)
            {
                const message = await response.text();
                setError(message || "unable to update");
                return;
            }

            const message = await response.text();
            setSuccess(message || "Note updated Successfully");
            setTimeout(() =>
            {
               
                navigate("/Notes")
            },2000)
        }

        
        catch (error)
        {
            setError(error.message)
        }


    }
    useEffect(() => {
        const getNote = async () => {
            if (!searchTitle) {
                setError("No note Selected");
                return;
        
            }
            try {
                setError("");
                const response = await fetch(`http://localhost:8080/api/note/getWithName/${encodeURIComponent(searchTitle)}`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                if (response.status === 401) {
                    navigate("/Signup");
                    return;
                }
                const data = await response.json();
            
                if (!response.ok) {
                    setError("The title was not found");
                    return;
                }
                else {
                    setForm({
                        id: data.id,
                        userid: data.userId,
                        title: data.title,
                    

                        content: data.content
                    })
                }

            
            }
            catch (error) {
                setError("Some thing went wrong , can't update")
            }
        }
        getNote();
    }, [searchTitle, navigate]
);
  return (
      <div>
          <div className='bg-purple-900 min-w-screen min-h-screen flex flex-col justify-center items-center'>
              

              <div className=''>
                  <h1 className='text-white text-5xl font-semibold '>Update<span className='text-purple-500'>  Notes</span></h1>
                  
              </div>
              <div className='flex flex-col gap-8 mt-8 bg-blue-800 items-center w-120 min-h-80 border-2 rounded-2xl shadow-[0_0_20px] shadow-black justify-center'>
                  {
                      error ? <p className='text-red-500 font-semibold '>{error}</p> : <p className='text-green-500 font-semibold'>{success}</p>
                  }
              <form onSubmit={updateChanges}>
                  
                  <div className='flex-col flex gap-4'><label className='text-white text-2xl font-semibold'>Title</label><input className=' w-90 bg-purple-600 text-2xl text-white font-semibold p-2 rounded-2xl' type='text' value={form.title} name='title' onChange={handleChange}/></div>

                  <div className='flex-col flex gap-4 mt-4'><label className='text-white text-2xl font-semibold'>Content</label><textarea className='w-90 text-2xl bg-purple-600 text-white font-semibold p-2' type='text' value={form.content} name='content' onChange={handleChange}/></div>
                      <div className='w-full items-center justify-center flex'><button  className='bg-blue-500 px-9 py-2 mt-4 text-white text-2xl font-semibold rounded-2xl cursor-pointer mb-5 hover:bg-blue-600 hover:shadow-[0_0_20px] hover:shadow-blue-500 border-2'>Save Changes</button></div>
              
              </form>
              </div>
          </div>
    </div>
  )
}

export default UpdateNotes