import React, { useEffect, useState } from "react";
import MealApplyModal from "./MealApplyModal";
import { useData } from "../../context/UserContext";
import Chat from "../../components/Chat";
import { API_BASE_URL } from "../../config/api";

const MealPostCard = ({ meal, index, setMealPosts }) => {
  const { user } = useData();

  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(1);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  const [applied, setApplied] = useState(
    meal.applied?.some(entry => entry.p_id._id === user?._id) ||
    meal.awarded?.some(entry => entry.p_id === user?._id)
  );

  // Applied Array
  meal.applied = (meal.applied || []).filter(app =>
    !(meal.awarded || []).some(award => award.p_id === app.p_id._id)
  );


  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
  });

  const handleApply = async () => {
    let values = {
      campaignId: meal._id,
      userId: user._id,
      appliedPersons: selectedPeople,
    };
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applyCampaign?userId=${user?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Applied successfully");
        setApplied(true);
      } else {
        alert(result.error);
        console.log(result.error);
      }
      setSubmitStatus("success");

      const newApplication = {
        p_id: { fullname: user.username },
        date: { $date: new Date().toISOString() },
        persons: selectedPeople,
      };

      setMealPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === meal._id
            ? { ...post, applied: [newApplication, ...post.applied] }
            : post
        )
      );
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 w-full cursor-pointer transition-all duration-700"
      >
        {/* Top Section: User Info */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full text-center text-white font-bold flex justify-center items-center bg-brand-700 text-lg sm:text-2xl">
            {firstLetter}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">{meal.createdBy.fullname}</h3>
            <p className="text-stone-500 text-sm">{meal.location}</p>
          </div>
        </div>

        {/* Meal Info */}
        <h2 className="text-lg sm:text-xl font-semibold mb-2">{meal.title}</h2>
        <p className="text-stone-700 text-sm sm:text-base mb-3">{meal.description}</p>

        {/* Details Row */}
        <div className="flex flex-col sm:flex-row justify-between text-sm text-stone-700 gap-1">
          <p>
            🍴 {meal.foodType} for {meal.remaining}{" "}
            {meal.amount > 1 ? "persons" : "person"}
          </p>
          <p>Status: {meal.status}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between text-sm text-stone-700 mt-2 gap-1">
          <p>⏰ {new Date(meal.createdAt).toLocaleString("en-PK")}</p>
          <p>
            👥 {meal.applied.length} Applied{" "}
            {applied && <span className="text-brand-600 ml-1">✔️</span>}
          </p>
        </div>

        {/* Expanded Section */}
        {expanded && (
          <div className="transition-all duration-700 mt-6">
            <div className="mb-3">
              <p className="text-sm font-semibold text-stone-600 mb-1">Applicants:</p>
              <ul className="list-disc pl-5 text-sm text-stone-700">
                {meal.applied.map((a, i) => (
                  <li key={i}>
                    {a.p_id.fullname} - {a.persons}{" "}
                    {a.persons > 1 ? "people" : "person"}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <button
                className={`w-full sm:w-auto px-5 py-2 text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200 ${!applied
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-brand-700 hover:bg-brand-800"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChatModal(true);
                  setSelectedUser({
                    selectedUserId: meal.createdBy?._id,
                    selectedusername: meal.createdBy?.fullname,
                  });
                }}
                disabled={!applied}
              >
                Start Chat
              </button>

              <button
                className={`w-full sm:w-auto px-6 py-2 text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200 ${applied
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-brand-700 hover:bg-brand-800"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!applied) setShowModal(true);
                }}
                disabled={applied}
              >
                {applied ? "Applied" : "Apply"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {showModal && (
        <MealApplyModal
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          personCount={meal.remaining}
          submitStatus={submitStatus}
          setShowModal={setShowModal}
          handleApply={handleApply}
        />
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <Chat
          selectedUserData={selectedUser}
          user={user}
          setIsChatOpen={setShowChatModal}
          campaignId={meal._id}
        />
      )}
    </>
  );
};

export default MealPostCard;