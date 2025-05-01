import React from 'react'
import { useState } from 'react';

const AppliedMealPostCard = ({ mealData }) => {

    const [expanded, setExpanded] = useState(false);

    const {
        donorPic,
        donorName,
        mealTitle,
        mealDescription,
        personCount,
        location,
        postedAt,
        applicants,
        applied,
        status,
        appliedAt,
        appliedDetails
    } = mealData;



    return (
        <div
            onClick={() => setExpanded(prev => !prev)}
            className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
        >
            <div className="flex items-center mb-3">
                <img src={donorPic} alt="Donor" className="w-12 h-12 rounded-full mr-3 border-[1px] border-black object-cover" />
                <div>
                    <h3 className="text-lg font-bold">{donorName}</h3>
                    <p className="text-gray-500 text-sm">{location}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{mealTitle}</h2>
            <p className="text-gray-700 mb-3">{mealDescription}</p>
            <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                <p>🍴 Meal for {personCount} {personCount > 1 ? 'persons' : 'person'} </p>
                <p>Status: {status}</p>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                <p>⏰ {postedAt}</p>
                <p>👥 {applicants} Applied</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                <p></p>
                <p> {appliedAt && <span className="text-green-600 ml-2">Applied at: {appliedAt}</span>}</p>
            </div>

            {expanded && (
                <div className="transition-all duration-1000 mt-8">
                    {/* <p className="text-gray-700 mb-3">{mealDescription}</p> */}

                    <div className="mb-2">
                        <p className="text-sm font-semibold text-gray-600 mb-1">Applicants:</p>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                            {appliedDetails.map((a, i) => (
                                <li key={i}>
                                    {a.name} - {a.count} {a.count > 1 ? 'people' : 'person'}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div >
    )
}

export default AppliedMealPostCard
