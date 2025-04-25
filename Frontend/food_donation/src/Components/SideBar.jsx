import React, { useState } from 'react'
import dash_pic from '/src/assets/images/dashboard.png'
import user_icon from '/src/assets/images/user.png'

// import userPic from '/src/assets/images/user_pic.jpg';



const SideBar = () => {

    return (
        <div className="fixed top-0 left-0 border-[1px] border-r-gray-200 h-screen w-[20%] bg-white text-black flex flex-col justify-around shadow-lg">
            {/* Logo Section */}
            <div className="flex items-center justify-center h-16 bg-green-700">
                <h1 className="text-2xl font-bold">YourLogo</h1>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-4">
                <ul className="space-y-2">
                    <li>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            <img src={dash_pic} alt="" className='w-8 h-8 bg-transparent' />
                            <a href="#" className='text-[1.1rem]' >
                                Dashboard
                            </a>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            General Feed
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            Other1
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            Other2
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            <img src={user_icon} alt="" className='w-8 h-8 bg-transparent' />
                            <a href="#" className='text-[1.1rem]' >
                                My Profile
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="px-4 py-4">
                <a href="#" className="block w-full text-center px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    Logout
                </a>
            </div>
        </div>
    )
}

export default SideBar
