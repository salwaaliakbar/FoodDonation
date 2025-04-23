import React from 'react'
import Navbar from './NavBar'
import Header from './Header'

function Recipent_Dashboard() {
    return (
        <div className='flex'>
            <div className="top-0 left-0 h-screen w-[20%] bg-green-800 text-white flex flex-col justify-around shadow-lg">
                {/* Logo Section */}
                <div className="flex items-center justify-center h-20 bg-green-700">
                    <h1 className="text-2xl font-bold">YourLogo</h1>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-4">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-[#666666] hover:text-white transition-colors">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-[#666666] hover:text-white transition-colors">
                                General Feed
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-[#666666] hover:text-white transition-colors">
                                Other1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-[#666666] hover:text-white transition-colors">
                                Other2
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-[#666666] hover:text-white transition-colors">
                                My Profile
                            </a>
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

            <div className='w-[80%]'>
                <Header />
                <div>
                    <h1>Dashboard portion</h1>
                </div>
            </div>
        </div>
    )
}

export default Recipent_Dashboard