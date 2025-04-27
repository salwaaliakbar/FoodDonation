import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import userPic from '/src/assets/images/user_pic.jpg';

const Myprofile = () => {
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
                            <button className='rounded-md bg-gray-200 mt-2 p-2 text-[0.8rem] hover:border-[1px] border-green-400 hover:bg-gray-300'>✏️ Edit Profile</button>
                        </span>
                    </div>
                    <div className='grid grid-cols-2 mt-8'>
                        <div>
                            <p className='font-semibold tex-[1.1rem]'>Name</p>
                            <input type="text" name="" id="" value={'John Newton'} className='text-xs p-1.5 border-[1px] border-gray-800 rounded-md' />
                        </div>
                        <div>B</div>
                        <div>C</div>
                        <div>D</div>
                    </div>
                    <div></div>
                </div>

            </div>

        </div>
    )
}

export default Myprofile
