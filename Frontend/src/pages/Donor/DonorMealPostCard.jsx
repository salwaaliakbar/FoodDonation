import React, { useState } from "react";
import MealAcceptModel from "./MealAcceptModal";
import { EXPIRED, GRANTED } from "../../Components/CONSTANTS";
import { useLocation } from "react-router-dom";
import Chat from "../../Components/Chat";
import { Trash2 } from "lucide-react";
import { useData } from "../../context/UserContext";
import { useHandleDelete } from "../../customHooks/useHandleDelete";

const MealPostCard = ({ meal }) => {
  const [expanded, setExpanded] = useState(false); // Toggle detail view
  const [showModal, setShowModal] = useState(false); // Show accept modal
  const [isChatOpen, setIsChatOpen] = useState(false); // Show chat box
  const { user } = useData();
  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
  });
  const [status, setStatus] = useState(meal.status); // Track meal status
  const [awardedTo, setAwardedTo] = useState(meal.awarded || "none"); // Track winner
  const { pathname } = useLocation(); // Get current route
  const handleDelete = useHandleDelete();
  // Get first letter of donor name
  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  return (
    <>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
      >
        {/* Only show awarded banner if in generalfeed and meal is granted */}
        {pathname === "/donorDashBoard/generalfeed" &&
          status === GRANTED &&
          awardedTo && (
            <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md text-base font-semibold mb-4 shadow-sm">
              🏅 Meal Awarded to <span className="underline">{awardedTo}</span>
            </div>
          )}

        <div className="flex justify-between">
          {/* Donor info and location */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-11 h-11 rounded-full text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
              {firstLetter}
            </div>
            <div>
              <h3 className="text-lg font-bold">{meal.createdBy?.fullname}</h3>
              <p className="text-gray-500 text-sm">{meal.location}</p>
            </div>
          </div>
          <div>
            {meal.createdBy?._id === user._id ? (
              <div
                className="bg-red-100 p-2 rounded-full shadow-md hover:bg-red-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(meal._id);
                }}
                title="Delete Meal"
              >
                <Trash2 className=" text-red-700 hover:text-red-900 transition-transform duration-200 hover:scale-110" />
              </div>
            ) : (
              <div
                className="bg-gray-100 p-2 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
              <Trash2 className="text-gray-600  shadow-2xl mt-4 cursor-not-allowed disabled" />
              </div>
            )}
          </div>
        </div>

        {/* Meal title & description */}
        <h2 className="text-xl font-semibold mb-2">{meal.title}</h2>
        <p className="text-gray-700 mb-3">{meal.description}</p>

        {/* Meal meta: quantity + status */}
        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <p>
            🍴 Meal for {meal.amount} {meal.amount > 1 ? "persons" : "person"}
          </p>
          {status === GRANTED ? (
            <p className="text-green-600 font-semibold">
              🏅 Awarded to {awardedTo}
            </p>
          ) : (
            <p className="text-yellow-600 font-semibold">✅ Active</p>
          )}
        </div>

        {/* Time and applicant count */}
        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <p>⏰ {new Date(meal.createdAt).toLocaleString("en-PK")}</p>
          <p>👥 {meal.applied.length} Applied</p>
        </div>

        {/* Expandable section: applicants */}
        {expanded && (
          <div className="transition-all duration-1000 mt-8">
            <div className="mb-2">
              <p className="text-sm font-bold text-gray-600 mb-1">
                Applicants:
              </p>

              {/* Meal status logic */}
              {status === GRANTED ? (
                <p className="text-sm text-green-600 italic">
                  Meal has been awarded.
                </p>
              ) : status === EXPIRED ? (
                <p className="text-sm text-red-600 italic">
                  Meal has been expired.
                </p>
              ) : meal.applied.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {meal.applied.map((user, i) => (
                    <li
                      key={i}
                      className="transition transform duration-300 delay-150 hover:font-medium mt-2 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedUser({
                          selectedUserId: user.p_id._id,
                          selectedusername: user.p_id.fullname,
                        });
                      }}
                    >
                      {user.p_id.fullname} - {user.persons}{" "}
                      {user.persons > 1 ? "people" : "person"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No one has applied yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal for awarding meal */}
      {showModal && (
        <MealAcceptModel
          mealId={meal._id}
          createdBy={meal.createdBy}
          setShowModal={setShowModal}
          status={status}
          setStatus={setStatus}
          setAwardedTo={setAwardedTo}
          setIsChatOpen={setIsChatOpen}
          selectedUserData={selectedUser}
        />
      )}

      {/* Chat between donor and selected person */}
      {isChatOpen && (
        <Chat
          selectedUserData={selectedUser}
          user={meal.createdBy}
          setIsChatOpen={setIsChatOpen}
          campaignId={meal._id}
        />
      )}
    </>
  );
};

export default MealPostCard;
