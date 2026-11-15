import React, { useEffect, useState } from 'react'
import ItemShow from './ItemShow';

import API_BASE_URL from "./config";
import OptionsList from './OptionsList';
import { useNavigate } from 'react-router-dom';
import { FaGreaterThan } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
const ViewNotes = () => {
    const [data, setData] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(true);
    const [itemDetails, setItemDetails] = useState({
        id: "",
        
        title: "",
        content:""
    })
    const [showDetails, setShowDetails] = useState(false);
    const handleItemsDetails = (note) =>
    {
        setItemDetails({
            id: note.id,
            title: note.title,
            
            content:note.content
            
        })
    
        setShowDetails(true);
    }
    const navigate = useNavigate();
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/note/getNotes`,
                    {
                        method: "GET",
                        credentials:"include"
                    }
                )
                if (response.status === 401) {
                    navigate("/Signup");
                    return;
                }
                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }

                const data = await response.json();
                setData(data);
                console.log(data);
            }

            catch (error) {
                setErrorMessage("Unable to fetch the data");
            }

            finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, [])

    return (
       <div className='min-h-screen w-full overflow-x-hidden bg-[#fff9bb]'
    style={{
        backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 39px,
            #B3B3B3 40px
        )`
    }}
>

   <div className='relative flex flex-wrap items-center justify-end gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 pt-4'>

    <OptionsList name={"Home"} bgcolor={"purple"} link="/" fontColor={"white"} shadowColor={"blue"} />

    <OptionsList name={"AddNote"} bgcolor={"purple"} link="/AddNotes" fontColor={"white"} shadowColor={"blue"} />

    

    <div className='w-11 h-11 bg-black shadow-[0_0_10px] shadow-amber-500 rounded-full flex items-center justify-center' onClick={()=>navigate("/User")}><img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='w-10 h-10 cursor-pointer'/></div>

        </div>

            <div className='w-full px-4 sm:px-6 lg:px-10 mt-20'>

                <div className='relative text-black text-5xl font-bold mt-6 sm:mt-4'>
                    
                    {
                        showDetails && <div><CiLogout color='red' className='size-10 cursor-pointer' onClick={()=>setShowDetails(false)}/></div>
                    }
                    <h1 className='text-center'>Notes</h1>
                </div>

                <div className='flex flex-col flex-wrap justify-center items-center mt-20 gap-6 sm:gap-10 lg:gap-15 mt-2'>

                    {
                        loading ?( <h1 className='text-white'>Loading...</h1> ):

                        errorMessage ? (<h1 className='text-white'>{errorMessage}</h1> ):

                        data.length === 0 ?( <h1 className='text-white'>No data found</h1> ):

                                    
                                    showDetails ?(<div className='flex flex-col justify-between'><ItemShow id={itemDetails.id}
                                     title={itemDetails.title} content={itemDetails.content}/></div>):(
                    data.map((note) => (
                            <div key={note.id} className='max-w-full'>
                                <div className='w-160 h-20 bg-linear-to-r justify-between flex flex-row from-yellow-600 to-blue-700 to-green-500'>
                                    <h1 className='pr-2 text-white text-4xl font-semibold pl-4 pt-2'>{note.title}</h1><button><FaGreaterThan className='w-10 h-10 hover:w-11 hover:h-11 transition duration-600 cursor-pointer' color='orange' onClick={()=>handleItemsDetails(note)}/></button>
                                </div>
                            </div>
                        )))
                    
                        
                    }

                </div>

            </div>

        </div>
    )
}

export default ViewNotes
