import React, { useState } from 'react'

const MealCard = ({ meal }) => {
    const [expanded, setExpanded] = useState(false)


    return (
        <div className='border-2 border-amber-300 rounded-2xl'>
            <div className='flex items-center gap-2 text-[1.1rem]'>
                <img src={meal.userPhoto} alt="" className='w-12 h-10 rounded-full object-cover ' />
                <p className=''> {meal.userName} </p>
            </div>
            <div className=' p-2 pl-6 items-center font-bold text-lg'>
                <h3 className=''>{meal.mealTitle}</h3>
            </div>

        </div>
    )

    // return (
    //     <div
    //         className='bg-white p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300'
    //         onClick={() => setExpanded(prev => !prev)}
    //     >
    //         {/* Header */}
    //         <div className='flex items-center gap-3 mb-2'>
    //             <img src={meal.userPhoto} alt='user' className='w-10 h-10 rounded-full object-cover' />
    //             <div>
    //                 <h3 className='font-semibold'>{meal.userName}</h3>
    //                 <p className='text-sm text-gray-500'>{meal.mealTitle}</p>
    //             </div>
    //         </div>

    //         {/* Info */}
    //         <div className='text-gray-700 text-sm'>
    //             <p>Meal for <span className='font-medium'>{meal.mealCount}</span> people</p>
    //             <p>You applied on: <span className='text-gray-600'>{meal.appliedOn}</span></p>
    //             <p>Total Applicants: <span className='font-bold text-green-700'>{meal.totalApplicants}</span></p>
    //         </div>

    //         {/* Expanded Detail */}
    //         {expanded && (
    //             <div className='mt-4 text-sm text-gray-700 border-t pt-3'>
    //                 <p><strong>Details:</strong> {meal.description}</p>
    //                 <p><strong>Location:</strong> {meal.location}</p>
    //                 <p><strong>Posted on:</strong> {meal.postedOn}</p>
    //                 <p><strong>Other applicants:</strong> {meal.totalApplicants}</p>
    //             </div>
    //         )}
    //     </div>
    // )
}

export default MealCard
