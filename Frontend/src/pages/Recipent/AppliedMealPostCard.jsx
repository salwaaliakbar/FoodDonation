import React from 'react'
import { useState } from 'react';
import { useData } from '../../context/UserContext';
import { div } from 'framer-motion/client';

const AppliedMealPostCard = ({ mealData }) => {

    const [expanded, setExpanded] = useState(false);
    const { user } = useData();

    const firstLetter = user.fullname.charAt(0).toUpperCase() || "U";

    // console.log(mealData);

    return (
        <div
            onClick={() => setExpanded(prev => !prev)}
            className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
                    {firstLetter}
                </div>                <div>
                    <h3 className="text-lg font-bold">{mealData.createdBy.fullname}</h3>
                    <p className="text-gray-500 text-sm">{mealData.location}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{mealData.title}</h2>
            <p className="text-gray-700 mb-3">{mealData.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                <p>🍴 Meal for {mealData.amount} {mealData.amount > 1 ? 'persons' : 'person'} </p>
                <p>Status: {mealData.status}</p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                <p>⏰ {new Date(mealData.createdAt).toLocaleString('en-PK')}</p>
                <p>👥 {mealData.applied.length} Applied</p>
            </div>

            {expanded && (
                <div className="transition-all duration-1000 mt-8">
                    {/* <p className="text-gray-700 mb-3">{mealDescription}</p> */}

                    <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-600 mb-1">Applicants:</p>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                            {mealData.applied.map((a, i) => (
                                <div className='flex justify-between'>
                                    <li key={i}>
                                        {a.p_id.fullname} - {a.persons} {a.persons > 1 ? 'people' : 'person'}
                                    </li>
                                    <p>Applied At: {new Date(a.date).toLocaleString('en-PK')}</p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div >
    )
}

export default AppliedMealPostCard
