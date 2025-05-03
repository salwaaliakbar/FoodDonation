// MealPostCard.jsx
import React, { useEffect, useState } from 'react';
import MealApplyModal from './MealApplyModal';

const MealPostCard = ({ meal, index, setMealPosts }) => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [submitStatus, setSubmitStatus] = useState(null);

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
        appliedDetails
    } = meal;

    const handleApply = () => {
        setMealPosts(prev => {
            const updated = [...prev];
            const updatedPost = { ...updated[index] };

            updatedPost.applied = true;
            updatedPost.applicants += 1;
            updatedPost.appliedDetails = [
                ...updatedPost.appliedDetails,
                { name: 'You', count: selectedPeople }
            ];

            updated[index] = updatedPost;
            return updated;
        });

        setSubmitStatus('success');
    };


    return (
        <>
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
                    <p>👥 {applicants} Applied {applied && <span className="text-green-600 ml-2">✔️</span>}</p>
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

                        <button
                            className={`mt-4 px-4 py-2 text-white relative left-[85%] rounded ${applied ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!applied) setShowModal(true);
                            }}
                            disabled={applied}
                        >
                            {applied ? 'Applied' : 'Apply'}
                        </button>
                    </div>
                )}
            </div >

            {showModal && <MealApplyModal selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} personCount={personCount} submitStatus={submitStatus} setShowModal={setShowModal} handleApply={handleApply} />
            }
        </>
    );
};

export default MealPostCard;