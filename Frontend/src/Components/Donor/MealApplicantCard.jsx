import React from 'react'
import { useState } from 'react';
import { useData } from '../ContextAPIs/UserContext';
import MealApplicants from './MealApplicants';

const MealApplicantCard = ({ mealData }) => {

    const [expanded, setExpanded] = useState(false);
    const totalAwarded = mealData.awarded.reduce((sum, award) => sum + award.a_persons, 0);
    const [remainingMealAmount, setRemaining] = useState(mealData.amount - totalAwarded);

    const { user } = useData();
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // console.log(mealData);
    // console.log(totalAwarded);
    // console.log(remainingMealAmount);


    async function updateCampaignStatus(userId, mealDataId, status) {
        try {
            const response = await fetch(`http://localhost:5000/api/campaignStatus?userId=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, mealDataId, status }),
                credentials: "include"
            });


            const result = await response.json();

            if (result.success) {
                console.log("✅ Campaign status updated successfully.");
            } else {
                console.error("❌ API Error [response.success = false]:", result.error || "Unknown error");
            }

        } catch (err) {
            console.error("❌ Network or Fetch Error in updateCampaignStatus:", err);
        }
    }



    async function handleAllocate() {
        // console.log('handle Allocate called');

        let values = {
            campaignId: mealData._id,
            userId: selectedApplicant.p_id._id,
            awardedPersons: selectedPeople,
        }
        try {
            const response = await fetch(`http://localhost:5000/api/awardCampaign?userId=${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include"
            });

            const result = await response.json()
            if (result.success) {
                alert('applied successfully');
                // setApplied(true);
                const newRemaining = remainingMealAmount - selectedPeople;
                setRemaining(newRemaining);

                if (newRemaining <= 0) {
                    console.log('Not enough meals remaining! changing its status as granted');
                    let status = 'Granted'
                    updateCampaignStatus(user._id, mealData._id, status);
                }

            } else {
                alert('Error During Applying');
                console.log(result.error)
            }
            setSubmitStatus('success');
            // setApplied(true);

            const newApplication = {
                p_id: selectedApplicant.p_id._id,
                a_date: { $date: new Date().toISOString() },
                a_persons: selectedPeople
            };

            setMealPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === mealData._id
                        ? { ...post, awarded: [...post.awarded, newApplication] }
                        : post
                )
            );

        } catch (error) {
            console.error("Error during new campaign creation:", err);
            alert("An error occurred during new campaign creation. Please try again.");
        }

    }

    return (
        <>
            <div
                onClick={() => setExpanded(prev => !prev)}
                className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
            >
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
                <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
                    <p></p>
                    <p className="text-gray-500 text-sm">Location: {mealData.location}</p>
                </div>

                {expanded && (
                    <div className="transition-all duration-1000 mt-8">
                        {/* <p className="text-gray-700 mb-3">{mealDescription}</p> */}

                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-600 mb-1">Applicants:</p>
                            <div className="space-y-2">
                                {mealData.applied.map((a, i) => {
                                    const isAccepted = mealData.awarded?.some(entry => entry.p_id === a.p_id._id);
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center justify-around bg-gray-50 border border-gray-300 rounded-lg px-4 py-2"
                                        >
                                            <div className="w-6 text-gray-600 font-medium">{i + 1}.</div>
                                            <div className="flex text-gray-800">{a.p_id.fullname}</div>
                                            <div className="w-32 text-gray-700">
                                                {a.persons} {a.persons > 1 ? 'people' : 'person'}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {new Date(a.date).toLocaleString('en-PK')}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (!isAccepted) {
                                                        setSelectedApplicant(a); // Save who triggered it
                                                        setShowModal(true);
                                                    }
                                                }}
                                                disabled={isAccepted}
                                                className={`px-3 py-1 rounded-md text-sm ${isAccepted
                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                    : 'bg-green-600 text-white hover:bg-green-700'
                                                    }`}
                                            >
                                                {isAccepted ? 'Accepted' : 'Accept'}
                                            </button>
                                            {/* {
                                            showModal && <MealApplicants requestedPersons={a.persons} selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} personCount={remainingMealAmount} submitStatus={submitStatus} setShowModal={setShowModal} handleAllocate={handleAllocate} />
                                        } */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div >
            {showModal && selectedApplicant && (
                <MealApplicants
                    requestedPersons={selectedApplicant.persons}
                    selectedPeople={selectedPeople}
                    setSelectedPeople={setSelectedPeople}
                    personCount={remainingMealAmount}
                    submitStatus={submitStatus}
                    setShowModal={setShowModal}
                    handleAllocate={handleAllocate}
                />
            )}
        </>
    )
}

export default MealApplicantCard
