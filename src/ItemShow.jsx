import React, { useState } from 'react'
import OptionsList from './OptionsList'

import API_BASE_URL from "./config";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
const ItemShow = ({ id, title, content }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const handleEdit = () =>
    {
        navigate("/UpdateNote", {
            state: {

                title: title
            }
        })
    }
    const handleDelete = async () =>
    {
        const confirmDelete = window.confirm("Are you sure you want to delete this note? ");
        if (!confirmDelete) {
            
            return;
        }
        try
        {
            setError("");
           const response = await fetch(`${API_BASE_URL}/api/note/delete/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                
                }
            );
            if (response.status == 401)
            {
                navigate("/Signup");
                return;
            }
            const message=await response.text()
            if (!response.ok)
            
            {    
                setError(message);
                
                return;
                
            }
            window.location.reload();
        }
        catch (error)
        {
            setError("Something went wrong while deleting the note");
        }
    }
  return (
      <div className=' w-screen flex ml-2 border-0 rounded-2xl mt-5'>
          
          <div className='bg-linear-to-r from-red-200 mb-9  to-blue-200 to-green-100 ml-20 rounded-2xl p-2 w-3/4 overflow-hidden pl-6'>
              <div>
              <h1 className='font-bold text-2xl text-purple-900'>ID:
              {id}
          </h1>
          </div>
          
          
            <div className='font-bold mt-6 pl-8 text-fuchsia-800 text-left text-3xl mt-3 break-words line-clamp-3'>
              <h1>{title}</h1>
          </div>

              <p className='text-left text-blue-900 font-serif text-xl mt-8 overflow-y-auto whitespace-pre-wrap break-words flex-1'>{content}</p>
              
          </div>
          <div className='flex flex-col justify-center gap-5 items-center'>
              <CiEdit size={40} color='blue' className='cursor-pointer' onClick={handleEdit} />
              <MdDelete size={40} color='red' className='cursor-pointer' onClick={handleDelete}/>
          </div>
          <div>
              
            
          </div>
      </div>
  )
}

export default ItemShow