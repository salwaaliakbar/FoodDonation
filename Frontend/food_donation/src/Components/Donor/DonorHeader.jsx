import React from 'react'
import userPic from '/src/assets/images/user_pic.jpg';


const Header = () => {
    return (
        <div className='flex justify-around items-center h-20 border-b-[1.5px] border-b-green-700 bg-white'>
            <div className="flex items-center border-2 border-gray-300 rounded-lg p-2 w-[50%]">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="w-full px-4 text-lg border-none focus:outline-none"
                />
                <button className="ml-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    {/* Search Icon (Heroicons) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>

            {/* User Info */}
            <div className="flex items-center border-gray-300 rounded-lg p-2">
                <div className="mr-4 text-right">
                    <p className="text-sm font-semibold">Name</p>
                    <p className="text-xs text-gray-500">Recipient</p>
                </div>
                <div>
                    <img
                        src={userPic}
                        alt="User"
                        className="w-11 h-11 rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
