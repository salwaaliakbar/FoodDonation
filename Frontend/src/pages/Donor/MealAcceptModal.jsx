import React, { useState, useEffect } from "react";
import { useSecureFetch } from "../../Components/Refresh/SecureFetch";
import { useChange } from "../../context/ChangeContext";
import { EXPIRED, GRANTED } from "../../Components/constants";
import { useData } from "../../context/UserContext";

function MealAcceptModel({
  mealId,
  createdBy,
  setShowModal,
  status,
  setStatus,
  setAwardedTo,
  setIsChatOpen,
  selectedUserData,
}) {
  const secureFetch = useSecureFetch();
  const [selectedUser, setSelectedUser] = useState({});
  const { setIsChangeActive, setIsChangeGranted } = useChange();
  const { user } = useData();

  // Fetch recipient data when modal opens
  useEffect(() => {
    async function fetchSelectedUserData() {
      try {
        const response = await secureFetch(
          `http://localhost:5000/api/getUserData/${selectedUserData.selectedUserId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        setSelectedUser(response.UserData);
      } catch (err) {
        console.error("Error fetching recipient data:", err);
      }
    }

    fetchSelectedUserData();
  }, [selectedUserData.selectedUserId]);

  // Handle meal acceptance
  async function handleAccept() {
    const confirmed = window.confirm("Are you sure you want to accept?");
    if (!confirmed) return;

    try {
      await secureFetch(
        `http://localhost:5000/api/updateStatus/${mealId}/${selectedUser._id}/${selectedUser.fullname}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      // Update UI and trigger data refresh
      setIsChangeActive(true);
      setIsChangeGranted(true);
      setStatus(GRANTED);
      setAwardedTo(selectedUser.fullname);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

  // Button permissions
  const isOwner = createdBy._id === user._id;
  const canAccept = isOwner && status !== GRANTED && status !== EXPIRED;
  const canChat = isOwner && status !== EXPIRED;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] animate-zoomIn shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex flex-col mb-4 items-center">
          <h2 className="text-xl font-semibold mt-3 text-gray-800 mb-6 text-center">
            Accept Meal Request
          </h2>
        </div>

        {/* Recipient Info */}
        <div className="space-y-2 text-sm text-gray-700 break-words">
          <div>
            <span className="font-medium">Name:</span> {selectedUser.fullname}
          </div>
          <div>
            <span className="font-medium">Email:</span> {selectedUser.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {selectedUser.phone}
          </div>
          {selectedUser.organization && (
            <div>
              <span className="font-medium">Organization:</span>{" "}
              {selectedUser.organization}
            </div>
          )}
          <div>
            <span className="font-medium">Status:</span>{" "}
            {status === GRANTED ? (
              <span className="text-gray-700 font-semibold">Allocated</span>
            ) : (
              <span className="text-yellow-600 font-semibold">⏳ Pending</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between mt-6">
          <button
            disabled={!canChat}
            onClick={() => {
              setIsChatOpen(true);
              setShowModal(false);
            }}
            className={`px-7 py-2 rounded transition text-white ${
              canChat
                ? "bg-green-800 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Start Chat
          </button>

          <button
            disabled={!canAccept}
            onClick={handleAccept}
            className={`px-9 py-2 rounded transition text-white ${
              canAccept
                ? "bg-green-800 hover:bg-green-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealAcceptModel;
