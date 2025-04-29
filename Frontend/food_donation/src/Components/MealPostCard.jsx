import React from 'react';

const MealPostCard = ({ donorPic, donorName, mealTitle, mealDescription, personCount, location, postedAt, applicants }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 w-full">
            <div className="flex items-center mb-3">
                <img src={donorPic} alt="Donor" className="w-12 h-12 rounded-full mr-3" />
                <div>
                    <h3 className="text-lg font-bold">{donorName}</h3>
                    <p className="text-gray-500 text-sm">{location}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">{mealTitle}</h2>
            <p className="text-gray-700 mb-3">{mealDescription}</p>

            <div className="flex items-center text-gray-600 text-sm mb-2">
                🍴 Meal for {personCount} {personCount > 1 ? 'persons' : 'person'}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
                <p>⏰ {postedAt}</p>
                <p>👥 {applicants} applied</p>
            </div>
        </div>
    );
};

export default MealPostCard;
