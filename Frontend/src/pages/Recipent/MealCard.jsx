import React, { useState } from 'react'

const MealCard = ({ meal }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div
            onClick={() => setExpanded(prev => !prev)}
            className='w-full px-4 py-3 my-2  mb-2 border-b rounded-md border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-300'
        >
            {/* Row Header */}
            <div className='flex items-center justify-between gap-4'>
                {/* Left Side: Photo + User + Title */}
                <div className='flex items-center gap-4 w-[40%]'>
                    <img
                        src={meal.userPhoto}
                        alt='user'
                        className='w-10 h-10 rounded-full object-cover border'
                    />
                    <div>
                        <p className='text-sm font-semibold text-gray-700'>{meal.userName}</p>
                        <p className='text-base font-bold text-green-700'>{meal.mealTitle}</p>
                    </div>
                </div>

                {/* Middle: Quick Info */}
                <div className='flex flex-col w-[30%] text-sm text-gray-600'>
                    <span>🍽️ {meal.mealCount} meals</span>
                    <span>🕒 Applied: {meal.appliedOn}</span>
                </div>

                {/* Right Side: Applicants */}
                <div className='w-[20%]  text-right'>
                    {meal.granted ? <span>✅ Awarded <p className='text-green-600'>{meal.granted}</p></span> : <p className=' text-amber-600'>👥 {meal.totalApplicants} applicants </p>}
                </div>

            </div>

            {/* Expanded Details */}
            {expanded && (
                <div className='mt-3 ml-14 border-t pt-3 text-sm text-gray-600 space-y-1'>
                    <p><strong>Description:</strong> {meal.description}</p>
                    <p><strong>Location:</strong> {meal.location}</p>
                    <p><strong>Posted On:</strong> {meal.postedOn}</p>
                    {meal.appliedFor && meal.acceptedFor &&
                        <>
                            <p><strong>Applied For: </strong> {meal.appliedFor > 1 ? <> {meal.appliedFor} persons </> : <> {meal.appliedFor} person </>} </p>
                            <p><strong>Accepted For: </strong>  {meal.acceptedFor > 1 ? <> {meal.acceptedFor} persons </> : <> {meal.acceptedFor} person </>} </p>
                        </>
                    }
                </div>
            )}
        </div>
    )
}

export default MealCard