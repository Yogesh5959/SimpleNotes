import API_BASE_URL from "./config";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import OptionsList from './OptionsList';

const AddNotes = () => {
    const [details, setDetails] = useState({
        title: "",
        content: ""
    })

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [successId, setSuccessId] = useState();

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!details.title.trim() || !details.content.trim()) {
            return setErrorMessage("Enter title and content");
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(`${API_BASE_URL}/api/note`, {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details),
                signal: controller.signal
            });

            if (response.status === 401)
            {
                navigate("/Signup");
                return;
            }
            if (response.ok) {
                const id = await response.json();

                setDetails({ title: "", content: "" });
                setSuccessId("Note created with id: " + id);

                setTimeout(() => {
                    setSuccessId("");
                }, 5000);

                setErrorMessage("");
            } else {
                const message = await response.text();
                setErrorMessage(message || "Cannot create note");
            }

        } catch (error) {
            if (error.name === "AbortError") {
                setErrorMessage("Request timed out!");
            } else {
                setErrorMessage("Server is not responding!");
            }
        } finally {
            clearTimeout(timeout);
        }
    };

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-indigo-900 via-indigo-500 to-indigo-200 flex flex-col'>

            <div className='w-full flex flex-wrap justify-end items-center gap-3 sm:gap-4 px-4 sm:px-6 pt-4 z-10'>

                <OptionsList name={"Home"} bgcolor={"#4338CA"} link="/" fontColor={"white"} shadowColor={"orange"} />

                <OptionsList name={"ViewNote"} bgcolor={"#4338CA"} link="/Notes" fontColor={"white"} shadowColor={"orange"} />
                <div className='w-11 h-11 bg-black shadow-[0_0_10px] shadow-amber-500 rounded-full flex items-center justify-center' onClick={()=>navigate("/User")}><img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' className='w-10 h-10 cursor-pointer'/></div>

                

            </div>

            <div className='flex-1 w-full flex justify-center items-center px-4 py-8'>

                <div className='bg-linear-to-br from-slate-100 via-indigo-100 to-indigo-200 border-2 rounded-4xl w-full max-w-[620px] min-h-[400px] shadow-[0_0_40px] shadow-blue-900'>

                    <div>
                        <div className='flex items-center justify-center bg-purple-600 border-t-2 rounded-t-4xl text-center'>

                            <img
                                src='https://imgs.search.brave.com/rRSBsmO_1xsCp8HU1NOd3YLnDPDIBmea_BwOQ0zAAPU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzIv/NzYwLzc5NC9zbWFs/bC9jbG9zZWQtYmx1/ZS1oYXJkY292ZXIt/bm90ZWJvb2std2l0/aC1hbi1lbGFzdGlj/LWJhbmQtYW5kLWJv/b2ttYXJrLWZyZWUt/cG5nLnBuZw'
                                className='w-20 ml-2 p-2'
                            />

                            <h1 className='text-white text-center text-3xl sm:text-4xl p-4 font-bold'>
                                Add Note
                            </h1>

                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <table className='w-[90%] table-fixed mx-auto text-lg sm:text-2xl lg:text-3xl font-semibold mt-5'>

                            <tbody>
                                <tr>
                                    <td className='w-[25%]'>
                                        <label>Name:</label>
                                    </td>

                                    <td className='w-[75%]'>
                                        <input
                                            type='text'
                                            className='border-4 p-2 bg-purple-50 pl-2 w-full min-w-0 ml-2 sm:ml-4 rounded-2xl mt-4 hover:bg-purple-100'
                                            value={details.title}
                                            name='title'
                                            onChange={handleChange}
                                            placeholder='Enter title'
                                            onClick={() => setErrorMessage("")}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='align-top pt-4'>
                                        <label>Content:</label>
                                    </td>

                                    <td>
                                        <textarea
                                            className='border-4 min-h-20 bg-purple-50 pl-2 p-2 ml-2 sm:ml-4 w-full min-w-0 rounded-2xl mt-4 hover:bg-purple-100'
                                            value={details.content}
                                            name='content'
                                            onChange={handleChange}
                                            placeholder='Enter content'
                                            onClick={() => setErrorMessage("")}
                                        />
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                        <div className='w-full text-center mt-6'>

                            <button
                                className='w-[200px] h-14 mb-10 p-2 text-2xl font-semibold text-white bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-500 hover:to-blue-600 border-2 rounded-2xl cursor-pointer hover:shadow-[0_0_10px_amber] transition-all duration-900 hover:shadow-[0_0_20px] hover:shadow-blue-400 ease-in-out'
                                type='submit'
                            >
                                Add Note
                            </button>

                        </div>

                    </form>

                    <p className='font-semibold text-center text-green-500 px-2 pb-3 text-lg sm:text-xl'>
                        {successId}
                    </p>

                    <p className='font-semibold text-center text-red-500 px-2 pb-3 text-lg sm:text-xl'>
                        {errorMessage}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default AddNotes
