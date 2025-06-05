import React, { useState } from "react";
import { format } from 'date-fns';
import { ACTIVE, EXPIRED, GRANTED } from "../CONSTANTS";

const MealCard = ({ meal, color }) => {
  const [expanded, setExpanded] = useState(false);
  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="w-full px-4 py-3 my-2 mb-0 border-b rounded-xl border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-300"
    >
      {/* Row Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Photo + User + Title */}
        <div className="flex items-center gap-4 w-full sm:w-[40%]">
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
            {firstLetter}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {meal.createdBy?.fullname || ""}
            </p>
            <p className={`text-base font-bold ${color} text-[17px]`}>
              {meal.title}
            </p>
          </div>
        </div>

        {/* Middle: Quick Info */}
        <div className="flex flex-col w-full sm:w-[30%] text-sm text-gray-600">
          <span>🍽️ {meal.amount} meals</span>
          <span>
            🕒 Created At: {format(new Date(meal.createdAt), "MM/dd/yyyy hh:mm a")}
          </span>
        </div>

        {/* Right Side: Applicants */}
        <div className="w-full sm:w-[20%] text-right">
          {meal.status === ACTIVE && (
            <>
              <span>
                ✅ {meal.status} <p className="text-yellow-600"></p>
              </span>
              <p className="text-amber-600">
                👥 {meal.totalApplicants} applicants{" "}
              </p>
            </>
          )}
          {meal.status === GRANTED && (
            <>
              <span>
                🏅 {meal.status} <p className="text-green-600"></p>
              </span>
              {console.log("awarded",meal.awarded)}
              <p className="text-amber-600">{meal.awarded}</p>
            </>
          )}
          {meal.status === EXPIRED && (
            <>
              <span>
                🚫 {meal.status} <p className="text-red-800"></p>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-3 ml-0 sm:ml-14 border-t pt-3 text-sm text-gray-600 space-y-1">
          <p>
            <strong>Description:</strong> {meal.description}
          </p>
          <p>
            <strong>Location:</strong> {meal.location}
          </p>
          <p>
            <strong>Expired On: </strong>{" "}
            {format(new Date(meal.expiration), "MM/dd/yyyy hh:mm a")}
          </p>
        </div>
      )}
    </div>
  );
};

export default MealCard;

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
