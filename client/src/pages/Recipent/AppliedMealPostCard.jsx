import React from "react";
import { useState } from "react";
import { useData } from "../../context/UserContext";
import Chat from "../../components/Chat";

const AppliedMealPostCard = ({ mealData }) => {
  const [expanded, setExpanded] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { user } = useData();
  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
  });

  // Applied Array
  mealData.applied = (mealData.applied || []).filter(app =>
    !(mealData.awarded || []).some(award => award.p_id === app.p_id._id)
  );


  const firstLetter = user.fullname.charAt(0).toUpperCase() || "U";

  // console.log(mealData);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-brand-700">
          {firstLetter}
        </div>{" "}
        <div>
          <h3 className="text-lg font-bold">{mealData.createdBy.fullname}</h3>
          <p className="text-stone-500 text-sm">{mealData.location}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">{mealData.title}</h2>
      <p className="text-stone-700 mb-3">{mealData.description}</p>
      <div className="flex justify-between items-center text-sm text-stone-700 mt-2">
        <p>
          🍴 {mealData.foodType} for {mealData.remaining}{" "}
          {mealData.remaining > 1 ? "persons" : "person"}{" "}
        </p>
        <p>Status: {mealData.status}</p>
      </div>

      <div className="flex justify-between items-center text-sm text-stone-700 mt-2">
        <p>⏰ {new Date(mealData.createdAt).toLocaleString("en-PK")}</p>
        <p>👥 {mealData.applied.length} Applied</p>
      </div>

      {expanded && (
        <div className="transition-all duration-1000 mt-8">
          {/* <p className="text-gray-700 mb-3">{mealDescription}</p> */}

          <div className="mb-2 relative">
            <p className="text-sm font-semibold text-stone-600 mb-1">
              Applicants:
            </p>
            <ul className="list-disc pl-5 text-sm text-stone-700">
              {mealData.applied.map((a, i) => (
                <div className="flex justify-between" key={i}>
                  <li>
                    {a.p_id.fullname} - {a.persons}{" "}
                    {a.persons > 1 ? "people" : "person"}
                  </li>
                  <p>Applied At: {new Date(a.date).toLocaleString("en-PK")}</p>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="w-full sm:w-auto px-6 py-2 text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-200 bg-brand-700 hover:bg-brand-800"
              onClick={(e) => {
                e.stopPropagation();
                setShowChatModal(true);
                setSelectedUser({
                  selectedUserId: mealData.createdBy?._id,
                  selectedusername: mealData.createdBy?.fullname,
                });
              }}
            >
              Start Chat
            </button>
          </div>
        </div>
      )}
      {/* Chat Modal */}
      {showChatModal && (
        <Chat
          selectedUserData={selectedUser}
          user={user}
          setIsChatOpen={setShowChatModal}
          campaignId={mealData._id}
        />
      )}
    </div>
  );
};

export default AppliedMealPostCard;