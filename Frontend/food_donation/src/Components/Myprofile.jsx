import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import userPic from '/src/assets/images/user_pic.jpg';
import penPic from '/src/assets/images/call.png'

const Myprofile = () => {
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState({
        name: 'John Doe',
        phone: '034-3432',
        email: 'john@doe.com',
        address: 'New State, New York',
        website: 'http://johndoe.in'
    })

    function handleInput(e) {
        const { name, value } = e.target

        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));

    }


    return (
        <div className='flex'>
            <SideBar />
            <div className='w-[80%] absolute right-0'>
                <Header />
                <div className='w-[85%] m-auto border-[1px] border-gray-200 rounded-md mt-6 p-4'>
                    <h2 className='ml-10 font-bold text-2xl'>User Profile</h2>
                    <div className='flex'>
                        <img src={userPic} alt="User Pic" className='w-32 h-32 object-cover rounded-full m-3' />
                        <span className='content-center'>
                            <p className='font-bold text-lg'>John Newton</p>
                            <p className='text-lg'>Recipient</p>
                            <button className='rounded-md bg-gray-200 mt-2 p-2 text-[0.8rem] hover:border-[1px] border-green-400 hover:bg-gray-300' onClick={() => setEdit(true)}>✏️ Edit Profile</button>
                        </span>
                    </div>
                    <div className='grid grid-cols-2 mt-8 ml-4 gap-y-10'>
                        <TextField fieldName="phone" iconPic={penPic} fieldValue={userData.phone} edit={edit} handleInput={handleInput} />
                        <TextField fieldName="email" iconPic={penPic} fieldValue={userData.email} edit={edit} handleInput={handleInput} />
                        <TextField fieldName='address' iconPic={penPic} fieldValue={userData.address} edit={edit} handleInput={handleInput} />
                        <TextField fieldName='website' iconPic={penPic} fieldValue={userData.website} edit={edit} handleInput={handleInput} />
                    </div>
                    {edit ? <button className='rounded-md bg-green-600 text-white mt-12 py-2 px-8 text-[1.1rem] border-[1px] border-green-700  hover:bg-green-800 relative left-[80%] cursor-pointer' onClick={() => setEdit(!edit)}>Submit</button> : <></>}
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
                                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                                    View Meal History
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                                    Request Meals
                                </button>
                            </div>

                        </div>
                    </div>

                    <div></div>
                </div>

            </div>

        </div>
    )




}

function TextField({ fieldName, iconPic, fieldValue, edit, handleInput }) {

    return (
        <div>
            <p className='font-semibold tex-[1.1rem] ml-2 mb-1 text-[1.1rem] capitalize '>{fieldName}</p>
            <div className={`flex items-center text-xs p-1.5 border-[1.7px] ${edit ? 'border-red-700' : 'border-gray-800'} border-gray-800 rounded-md w-[60%] focus-within:border-green-700`}>
                <img src={iconPic} alt="" className='w-4 h-4 mr-1.5' />
                <input type="text" name={fieldName} value={fieldValue} onChange={(e) => handleInput(e)} className='border-none focus:outline-none text-[0.9rem] p-0.5 w-full' disabled={!edit} />
            </div>

        </div>
    )
}

export default Myprofile

