import React, { useEffect, useState } from "react";
import MealApplyModal from "./MealApplyModal";
import { useData } from "../../context/UserContext";
import Chat from "../../Components/Chat";

const MealPostCard = ({ meal, index, setMealPosts }) => {
  const { user } = useData();

  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState(1);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  const [applied, setApplied] = useState(
    meal.applied?.some((entry) => entry.p_id._id === user._id)
  );
  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
  });
  // console.log(meal._id);
  // console.log(applied);
  // console.log('meal applied ids: ', meal.applied);
  // console.log('userid ', user._id);

  const handleApply = async () => {
    let values = {
      campaignId: meal._id,
      userId: user._id,
      appliedPersons: selectedPeople,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/applyCampaign?userId=${user._id}`,
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
        alert("applied successfully");
        setApplied(true);
      } else {
        alert("Error During Applying");
        console.log(result.error);
      }
      setSubmitStatus("success");
      setApplied(true);

      const newApplication = {
        p_id: { fullname: user.username },
        date: { $date: new Date().toISOString() },
        persons: selectedPeople,
      };

      setMealPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === meal._id
            ? { ...post, applied: [...post.applied, newApplication] }
            : post
        )
      );
    } catch (error) {
      console.error("Error during new campaign creation:", err);
      alert(
        "An error occurred during new campaign creation. Please try again."
      );
    }
  };

  return (
    <>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
            {firstLetter}
          </div>
          <div>
            <h3 className="text-lg font-bold">{meal.createdBy.fullname}</h3>
            <p className="text-gray-500 text-sm">{meal.location}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">{meal.title}</h2>
        <p className="text-gray-700 mb-3">{meal.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <p>
            🍴 Meal for {meal.amount} {meal.amount > 1 ? "persons" : "person"}{" "}
          </p>
          <p>Status: {meal.status}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <p>⏰ {new Date(meal.createdAt).toLocaleString("en-PK")}</p>
          <p>
            👥 {meal.applied.length} Applied{" "}
            {applied && <span className="text-green-600 ml-2">✔️</span>}
          </p>
        </div>

        {expanded && (
          <div className="transition-all duration-1000 mt-8">
            {/* <p className="text-gray-700 mb-3">{mealDescription}</p> */}

            <div className="mb-2">
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Applicants:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {meal.applied.map((a, i) => (
                  <li key={i}>
                    {a.p_id.fullname} - {a.persons}{" "}
                    {a.persons > 1 ? "people" : "person"}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className={`px-9 py-2 text-white rounded ${
                  !applied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-800 hover:bg-green-700"
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
                Chat
              </button>

              <button
                className={`px-6 py-2 text-white rounded ${
                  applied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-800 hover:bg-green-700"
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

      {showModal && (
        <MealApplyModal
          selectedPeople={selectedPeople}
          setSelectedPeople={setSelectedPeople}
          personCount={meal.amount}
          submitStatus={submitStatus}
          setShowModal={setShowModal}
          handleApply={handleApply}
        />
      )}

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
