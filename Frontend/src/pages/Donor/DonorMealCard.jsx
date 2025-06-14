import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ACTIVE, EXPIRED, GRANTED } from "../../Components/constants";
import MealAcceptModel from "./MealAcceptModal";
import { useLocation } from "react-router-dom";
import Chat from "../../Components/Chat";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../../utils/socket";

const MealCard = ({ meal, color }) => {
  const [expanded, setExpanded] = useState(false); // Toggle expanded view
  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  const [status, setStatus] = useState(meal.status); // Current meal status
  const [awardedTo, setAwardedTo] = useState(meal.awarded || "none"); // Winner (if granted)
  const [showModal, setShowModal] = useState(false); // Modal for accept flow
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat visibility
  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
  });
  const [appliedList, setAppliedList] = useState(meal.applied); // List of applicants
  const { pathname } = useLocation(); // Get route path for conditional UI

  // Donor-side: setup real-time socket listener for new applications
  useEffect(() => {
    if (status !== ACTIVE) return;

    // Only connect once
    if (!socket.connected) socket.connect();

    // Join notification room based on donor ID
    socket.emit("joinNotificationRoom", meal.createdBy?._id);

    // Listen for new applicants
    socket.on("meal_applied", (data) => {
      if (data.mealId !== meal._id) return;

      setAppliedList((prevList) => [...prevList, data.newApplicant]);
    });

    return () => {
      socket.off("meal_applied");
    };
  }, []);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="w-full px-4 py-3 my-2 mb-0 border-b rounded-xl border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-300"
    >
      {/* If in general feed and meal granted, show award badge */}
      {pathname === "/donorDashBoard/generalfeed" &&
        status === GRANTED &&
        awardedTo && (
          <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md text-base font-semibold mb-4 shadow-sm">
            🏅 Meal Awarded to <span className="underline">{awardedTo}</span>
          </div>
        )}

      {/* Top Summary Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Donor Info + Meal Title */}
        <div className="flex items-center gap-4 w-full sm:w-[40%]">
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
            {firstLetter}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {meal.createdBy?.fullname || ""}
            </p>
            <p className={`text-base font-bold ${color} text-[17px]`}>
              {meal.title}
            </p>
          </div>
        </div>

        {/* Meal Info */}
        <div className="flex flex-col w-full sm:w-[30%] text-sm text-gray-600">
          <span>🍽️ {meal.amount} meals</span>
          <span>
            🕒 Created At:{" "}
            {format(new Date(meal.createdAt), "MM/dd/yyyy hh:mm a")}
          </span>
        </div>

        {/* Status & Applicants */}
        <div className="w-full sm:w-[20%] text-right">
          {status === ACTIVE && (
            <>
              <span>✅ {status}</span>
              <div className="flex justify-end items-center text-sm text-gray-700 mt-2">
                <p>👥 {appliedList.length} Applied</p>
              </div>
            </>
          )}
          {status === GRANTED && (
            <>
              <span>🏅 {status}</span>
              <p
                className="text-amber-600"
                onClick={() => {
                  setShowModal(true);
                  setSelectedUser({
                    selectedUserId: meal.awarded?.p_id,
                    selectedusername: meal.awarded?.p_name,
                  });
                }}
              >
                {meal.awarded?.p_name}
              </p>
            </>
          )}
          {status === EXPIRED && (
            <>
              <span>🚫 {status}</span>
            </>
          )}
        </div>
      </div>

      {/* Toggleable Detail Section */}
      {expanded && (
        <div className="mt-3 ml-0 sm:ml-14 border-t pt-3 text-sm text-gray-600 space-y-1 flex justify-between">
          {/* Meal Details */}
          <div className="mt-2">
            <p className="mb-1">
              <strong>Description:</strong> {meal.description}
            </p>
            <p className="mb-1">
              <strong>Location:</strong> {meal.location}
            </p>
            <p className="mb-1">
              <strong>Expired On:</strong>{" "}
              {format(new Date(meal.expiration), "MM/dd/yyyy hh:mm a")}
            </p>
          </div>

          {/* Applicants List */}
          <div className="transition-all duration-1000 my-4 mr-2">
            <div className="mb-2">
              <p className="text-sm font-bold text-gray-600 mb-1">Applicants:</p>
              {status === GRANTED ? (
                <p className="text-sm text-green-600 italic">
                  Meal has been awarded.
                </p>
              ) : status === EXPIRED ? (
                <p className="text-sm text-red-600 italic">
                  Meal has been expired.
                </p>
              ) : appliedList.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {appliedList.map((user, i) => (
                    <li
                      key={i}
                      className="transition transform duration-300 delay-150 hover:scale-110 mt-2 cursor-pointer"
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
        </div>
      )}

      {/* Modal to Accept/Manage Meal */}
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

      {/* Real-time Chat Box */}
      {isChatOpen && (
        <Chat
          selectedUserData={selectedUser}
          user={meal.createdBy}
          setIsChatOpen={setIsChatOpen}
          campaignId={meal._id}
        />
      )}
    </div>
  );
};

export default MealCard;
