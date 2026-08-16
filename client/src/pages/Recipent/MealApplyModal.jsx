import React from 'react'

const MealApplyModal = ({ selectedPeople, setSelectedPeople, personCount, submitStatus, setShowModal, handleApply }) => {
    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[350px] animate-zoomIn">
                <h2 className="text-xl font-semibold mb-4">Apply for Meal</h2>
                <label className="block mb-2 text-sm">Select number of people:</label>
                <select
                    value={selectedPeople}
                    onChange={(e) => setSelectedPeople(parseInt(e.target.value))}
                    className="w-full border border-stone-300 rounded p-2 mb-4"
                >
                    {Array.from({ length: personCount }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>

                {submitStatus === 'success' && <p className="text-brand-600">Applied successfully!</p>}
                {submitStatus === 'error' && <p className="text-red-600">An error occurred. Please try again.</p>}

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="bg-stone-400 text-white px-4 py-2 rounded hover:bg-stone-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { setShowModal(false); handleApply() }}
                        className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MealApplyModal