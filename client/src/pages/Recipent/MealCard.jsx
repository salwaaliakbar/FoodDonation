import React, { useState } from "react";
import { useData } from "../../context/UserContext";
import Chat from "../../Components/Chat";

const MealCard = ({ meal }) => {
  const [expanded, setExpanded] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { user } = useData();
  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
  });

  // console.log("MealCard meal:", meal);

  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  const applied = meal.applied.filter((app) => app.p_id._id === user._id);
  const awarded = meal.awarded?.filter((app) => app.p_id === user._id) || [];
  // const applied = meal.applied.some(app => app.p_id._id === user._id) || meal.awarded.some(app => app.p_id === user._id);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="w-full px-4 py-3 my-2 mb-2 border-b rounded-md border-gray-200 hover:bg-gray-100 cursor-pointer transition-all duration-300"
    >
      {/* Row Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Side: Photo + User + Title */}
        <div className="flex items-center gap-4 w-full sm:w-[40%]">
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
            {firstLetter}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {meal.createdBy?.fullname}
            </p>
            <p className="text-base font-bold text-green-700">{meal.title}</p>
          </div>
        </div>

        {/* Middle: Quick Info */}
        <div className="flex flex-col w-full sm:w-[30%] text-sm text-gray-600">
          <span>
            🍽️ {meal.amount} {meal.foodType}
          </span>
          <span>
            🕒 Applied At: {new Date(applied[0]?.date).toLocaleString("en-PK")}
          </span>
        </div>

        {/* Right Side: Applicants */}
        <div className="w-full sm:w-[20%] text-right">
          {meal.status === "Awarded" ? (
            <span>
              ✅ Awarded <p className="text-green-600">{meal.granted}</p>
            </span>
          ) : (
            <p className="text-amber-600">
              👥 {meal.applied.length} applicants
            </p>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <>
          <div className="mt-3 ml-0 sm:ml-14 border-t pt-3 text-sm text-gray-600 space-y-1">
            <p>
              <strong>Description:</strong> {meal.description}
            </p>
            <p>
              <strong>Location:</strong> {meal.location}
            </p>
            <p>
              <strong>Posted On:</strong> {meal.createdAt}
            </p>
            {applied[0].persons && (
              <p>
                <strong>Applied For:</strong> {applied[0].persons}{" "}
                {applied[0].persons > 1 ? "persons" : "person"}
              </p>
            )}
            {awarded.length > 0 && awarded[0].a_person && (
              <>
                <p>
                  <strong>Accepted For:</strong> {awarded[0].a_person}{" "}
                  {awarded[0].a_person > 1 ? "persons" : "person"}
                </p>
                <span>
                  🕒 Accepted At:{" "}
                  {new Date(awarded[0]?.a_date).toLocaleString("en-PK")}
                </span>
              </>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="w-full sm:w-auto px-6 py-2 text-white rounded bg-green-800 hover:bg-green-700"
              onClick={(e) => {
                e.stopPropagation();
                setShowChatModal(true);
                setSelectedUser({
                  selectedUserId: meal.createdBy?._id,
                  selectedusername: meal.createdBy?.fullname,
                });
              }}
            >
              Start Chat
            </button>
          </div>
        </>
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
    </div>
  );
};

export default MealCard;
