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
                </div>
            )}
        </div>
    )
}

export default MealCard



// import React, { useState } from 'react'

// const MealCard = ({ meal }) => {
//     const [expanded, setExpanded] = useState(false)

//     return (
//         <div
//             onClick={() => setExpanded(prev => !prev)}
//             className=' rounded-2xl bg-white shadow-md m-2 p-4 transition-all duration-300 hover:shadow-2xl cursor-pointer space-y-2'
//         >
//             {/* User Info */}
//             <div className='flex items-center gap-3'>
//                 <img
//                     src={meal.userPhoto}
//                     alt='user'
//                     className='w-12 h-12 rounded-full object-cover border border-gray-200'
//                 />
//                 <p className='text-[1.1rem] font-medium text-gray-700'>{meal.userName}</p>
//             </div>

//             {/* Meal Title */}
//             <div className='pl-6 font-bold text-lg text-green-800'>
//                 <h3>{meal.mealTitle}</h3>
//             </div>

//             {/* Meal Info Preview */}
//             <div className='pl-6 text-sm text-gray-700'>
//                 <p>👥 Serves: <strong>{meal.mealCount}</strong> people</p>
//                 <p>📅 Applied on: {meal.appliedOn}</p>
//                 <p>📝 Total Applicants: <span className='font-semibold text-amber-600'>{meal.totalApplicants}</span></p>
//             </div>

//             {/* Expanded Details */}
//             {expanded && (
//                 <div className='mt-2 pl-6 text-sm text-gray-600 border-t pt-3 space-y-1'>
//                     <p><strong>Details:</strong> {meal.description}</p>
//                     <p><strong>Location:</strong> {meal.location}</p>
//                     <p><strong>Posted On:</strong> {meal.postedOn}</p>
//                     <p><strong>Other Applicants:</strong> {meal.totalApplicants}</p>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default MealCard






