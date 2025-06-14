import React, { useState } from 'react'
import { useData } from '../../context/UserContext';

const MealCard = ({ meal }) => {
    const [expanded, setExpanded] = useState(false)
    const { user } = useData();

    const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";

    const applied = meal.applied.filter(app => app.p_id._id === user._id);

    // console.log(applied);


    return (
        <div
            onClick={() => setExpanded(prev => !prev)}
            className='w-full px-4 py-3 my-2  mb-2 border-b rounded-md border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-300'
        >
            {/* Row Header */}
            <div className='flex items-center justify-between gap-4'>
                {/* Left Side: Photo + User + Title */}
                <div className='flex items-center gap-4 w-[40%]'>
                    <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
                        {firstLetter}
                    </div>
                    <div>
                        <p className='text-sm font-semibold text-gray-700'>{meal.createdBy?.fullname}</p>
                        <p className='text-base font-bold text-green-700'>{meal.title}</p>
                    </div>
                </div>

                {/* Middle: Quick Info */}
                <div className='flex flex-col w-[30%] text-sm text-gray-600'>
                    <span>🍽️ {meal.amount} meals</span>
                    <span>🕒 Applied: {new Date(applied[0].date).toLocaleString("en-PK")}  </span>
                </div>

                {/* Right Side: Applicants */}
                <div className='w-[20%]  text-right'>
                    {meal.status === 'Awarded' ? <span>✅ Awarded <p className='text-green-600'>{meal.granted}</p></span> : <p className=' text-amber-600'>👥 {meal.totalApplicants} applicants </p>}
                </div>

            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className='mt-3 ml-14 border-t pt-3 text-sm text-gray-600 space-y-1'>
                    <p><strong>Description:</strong> {meal.description}</p>
                    <p><strong>Location:</strong> {meal.location}</p>
                    <p><strong>Posted On:</strong> {meal.createdAt}</p>
                    {meal.applied[0].persons && meal.applied[0].persons &&
                        <>
                            <p><strong>Applied For: </strong> {applied[0].persons > 1 ? <> {applied[0].persons} persons </> : <> {applied[0].persons} person </>} </p>
                            <p><strong>Accepted For: </strong>  {applied[0].persons > 1 ? <> {applied[0].persons} persons </> : <> {applied[0].persons} person </>} </p>
                        </>
                    }
                </div>
            )}
        </div>
    )
}

export default MealCard