import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Phone, Mail, User, Building } from "lucide-react";
import { useData } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSecureFetch } from "../../customHooks/useSecureFetch";

const Myprofile = () => {
    const [edit, setEdit] = useState(false)
    const { user, setUser } = useData()
    const [tempUser, setTempUser] = useState(user);
    const secureFetch = useSecureFetch()


    const firstLetter = user?.fullname
        ? user?.fullname.charAt(0).toUpperCase()
        : "U";

    function handleInput(e) {
        const { name, value } = e.target

        setTempUser(prevData => ({
            ...prevData,
            [name]: value
        }));

    }


    async function handleSubmit() {
        try {
            const data = await secureFetch("http://localhost:5000/api/updateProfile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tempUser),
                credentials: 'include',
            });
            // console.log(data)
            if (data.success) {
                alert("Profile Updated Successfully");
                setUser(tempUser);
                setEdit(!edit);
            } else {
                alert("Error updating profile: " + data.error);
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("An error occurred while updating the profile.");
        }
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='w-[80%] absolute right-0 bg-gray-200'>
                <Header />
                <div className='w-[85%] m-auto border-[1px] border-gray-200 bg-white rounded-md mt-6 p-4'>
                    <h2 className='ml-10 font-bold text-2xl'>User Profile</h2>
                    <div className='flex'>
                        {/* <img src={userPic} alt="User Pic" /> */}
                        <div className="w-32 h-32 m-3 rounded-full object-cover text-center text-4xl lg:text-6xl text-white font-bold flex justify-center items-center bg-green-800">
                            {firstLetter}
                        </div>
                        <span className='content-center'>
                            <p className='font-bold text-lg'>{user.fullname}</p>
                            <p className='text-lg'>{user.role}</p>
                            <button className='rounded-md bg-gray-200 mt-2 p-2 text-[0.8rem] hover:border-[1px] border-green-400 hover:bg-gray-300' onClick={() => setEdit(true)}>✏️ Edit Profile</button>
                        </span>
                    </div>
                    <div className='grid grid-cols-2 mt-8 ml-4 gap-y-10'>
                        <TextField fieldName='fullname' Icon={User} fieldValue={tempUser.fullname} edit={edit} handleInput={handleInput} />
                        <TextField fieldName="email" Icon={Mail} fieldValue={tempUser.email} handleInput={handleInput} />
                        <TextField fieldName="phone" Icon={Phone} fieldValue={tempUser.phone} edit={edit} handleInput={handleInput} />
                        <TextField fieldName='organization' Icon={Building} fieldValue={tempUser.organization} edit={edit} handleInput={handleInput} />
                    </div>
                    {edit ? <button onClick={handleSubmit} className='rounded-md bg-green-600 text-white mt-12 py-2 px-8 text-[1.1rem] border-[1px] border-green-700  hover:bg-green-800 relative left-[80%] cursor-pointer' >Submit</button> : <></>}

                    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                        <div className="flex  md:flex-row md:items-center md:justify-between">

                            <div className="mb-4 md:mb-0">
                                <h2 className="text-2xl font-bold mb-2">Meals Summary</h2>
                                <div className="space-y-1">
                                    <p className="text-gray-700">🍽️ Meals Received: <span className="font-semibold">35</span></p>
                                    <p className="text-gray-700">📅 Meals This Month: <span className="font-semibold">15</span></p>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <Link to='/recipent'>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                                        View Meal History
                                    </button>
                                </Link>
                                <Link to="/active">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                                        Request Meals
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>

                    <div></div>
                </div>
            </div>
        </div>
    )




}

function TextField({ fieldName, Icon, fieldValue, edit, handleInput }) {

    return (
        <div>
            <p className='font-semibold tex-[1.1rem] ml-2 mb-1 text-[1.1rem] capitalize '>{fieldName}</p>
            <div className={`flex items-center text-xs p-1.5 border-[1.7px] ${edit ? 'border-red-700' : 'border-gray-800'} border-gray-800 rounded-md w-[60%] focus-within:border-green-700`}>
                <Icon className="w-4 h-4 mr-1.5 text-gray-600" />
                <input type="text" name={fieldName} value={fieldValue} onChange={(e) => handleInput(e)} className='border-none focus:outline-none text-[0.9rem] p-0.5 w-full' disabled={!edit} />
            </div>

        </div>
    )
}

export default Myprofile

