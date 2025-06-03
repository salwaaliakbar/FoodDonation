import React from 'react'

function MealApplicants({ requestedPersons, selectedPeople, setSelectedPeople, personCount, submitStatus, setShowModal, handleAllocate }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[350px] animate-zoomIn">
                <h2 className="text-xl font-semibold mb-4">Allocate Meal</h2>
                <br />
                <p>Request number of people: {requestedPersons}</p>
                <label className="block mb-2 text-sm">Select number of people</label>
                <select
                    value={selectedPeople}
                    onChange={(e) => setSelectedPeople(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                >
                    {Array.from({ length: personCount }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                {submitStatus === 'success' && <p className="text-green-600">Applied successfully!</p>}
                {submitStatus === 'error' && <p className="text-red-600">An error occurred. Please try again.</p>}

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { setShowModal(false); handleAllocate() }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Allocate
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MealApplicants
