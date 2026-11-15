
import React, { useEffect, useState } from 'react'
import { FaHistory } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import OptionsList from './OptionsList';
import { FaHome } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
const User = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleResetActivites = async() =>
    {
        const resetHistory = window.confirm("Do you want delete your activites history?");
        if (!resetHistory)
        {
            return;
        }
        try
        {
            
            const response = await fetch("http://localhost:8080/api/userActivity/deleteActivity",
                {
                    method: "DELETE",
                    credentials:"include"
                }
            )
            if (response.status === 401) {
            navigate("/Login");
            return;
        }

        if (response.ok) {
            setData([]);
            alert("All activities deleted successfully");
        } else {
            alert("Unable to delete activities");
        }
    } catch (error) {
        alert("Something went wrong");
    }
            
    }
    const handleLogout = async() =>
    {
        const logoutConfirm = window.confirm("Do you want to logout? ");
        if (!logoutConfirm)
        {
            return;
        }
        try
        {
            const response = await fetch("http://localhost:8080/api/Login/logout",
                {
                    method: "POST",
                    credentials: "include",
                    
                }
            )
            if (response.ok)
            {
                navigate("/Login", { replace: true });
            }
            else
            {
                alert("Cannot logout");
            }
        
        }
        catch (error)
        {
            alert("Something went wrong")
        }
    }
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await fetch("http://localhost:8080/api/userActivity/getActivity",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.status === 401)
                {
                    navigate("/Login");
                    return;
                }

                if (!response.ok)
                {
                    setError("Something went wrong");
                    return;
                }

                setError("");
                const result = await response.json();

                setData(result);
            }
            catch (error)
            {
                setError("Something went wrong");
                return;
            }
        };

        fetchData();

    }, [navigate]);

    return (
        <div>
            <div className='bg-olive-200 w-screen h-screen overflow-hidden'>

                <div className='h-20 bg-blue-200 border-b border-b-blue-400'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-purple-600 font-bold text-5xl pl-5 pt-2'>
                        Simple Notes
                        </h1>
                        <h1 className='bg-blue-600 text-white p-2 text-2xl font-semibold rounded-2xl mr-5 cursor-pointer hover:bg-blue-900' onClick={handleResetActivites}>Reset Activities</h1>
                   
                    </div>
                </div>

                <div className='flex h-[calc(100vh-5rem)] justify-center'>

                    <div className='w-50 bg-blue-200 h-full overflow-y-auto shrink-0'>
                        <div className='flex flex-col gap-5 mt-10 w-49'>
                            <div className='text-2xl pl-4  font-semibold flex gap-2 hover:bg-blue-500 rounded-2xl cursor-pointer hover:text-white'  onClick={()=>navigate("/")}><FaHome className='mt-1'/>Home</div>
                            
                            <div className='text-2xl pl-4 font-semibold flex gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl cursor-pointer '  onClick={()=>navigate("/User")}><FaHistory className='mt-1'/>Your Activity</div>
                            <div className='text-2xl pl-4 font-semibold flex gap-2 hover:bg-blue-500 rounded-2xl cursor-pointer hover:text-white' onClick={handleLogout}><IoMdLogOut className='mt-1'/>Logout</div>
                        </div>
                    </div>

                    <div className='flex-1 min-w-0 h-full overflow-y-auto'>

                        <div className='mx-5 mt-4 w-3/4'>

                            <div className='bg-blue-900'>
                                <h1 className='text-white text-4xl font-semibold p-2 pl-6 flex gap-4'>
                                    <FaHistory className='mt-1' />
                                    Your Activity
                                </h1>
                            </div>

                            <div className='w-full mt-4'>

                                {error && (
                                    <h1 className='text-red-600 p-3'>
                                        {error}
                                    </h1>
                                )}

                                <div className='overflow-y-auto w-full max-h-[70vh]'>

                                    <table className='w-full border-collapse text-left'>

                                        <thead className='bg-blue-200 sticky top-0'>
                                            <tr>
                                                <th className='p-3 border'>Date & Time</th>
                                                <th className='p-3 border'>Activity</th>
                                                <th className='p-3 border'>Note Title</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                data.length > 0 ? (

                                                    data.map((item) =>
                                                    (
                                                        <tr key={item.id} className='hover:bg-blue-100'>

                                                            <td className='p-3 border whitespace-nowrap'>
                                                                {new Date(item.activityTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} {new Date(item.activityTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                                                            </td>

                                                            <td className='p-3 border'>
                                                                {item.type}
                                                            </td>

                                                            <td className='p-3 border'>
                                                                {item.noteName || "N/A"}
                                                            </td>

                                                        </tr>
                                                    ))

                                                ) : (

                                                    <tr>
                                                        <td colSpan="3" className='p-5 text-center text-2xl font-bold text-blue-950'>
                                                            No Activities Found
                                                        </td>
                                                    </tr>

                                                )
                                            }
                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default User
