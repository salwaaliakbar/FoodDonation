import React, { useState, useEffect } from "react";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { ACTIVE, EXPIRED, GRANTED } from "../../Components/CONSTANTS";
import { useData } from "../../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChange } from "../../Context/ChangeContext";

function MealAcceptModel({
  mealId,
  createdBy,
  setShowModal,
  status,
  setAwardedTo,
  setIsChatOpen,
  selectedUserData,
  remaining,
  setRemaining,
  setAppliedList,
  setAwardedList,
}) {
  const secureFetch = useSecureFetch();
  const { setActiveMeals, setGrantedMeals } = useChange();
  const { user } = useData();

  const [selectedUser, setSelectedUser] = useState({});
  const [awardCount, setAwardCount] = useState("");
  const [localRemaining, setLocalRemaining] = useState(remaining || 0); // for dropdown

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

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

  async function handleAccept() {
    const confirmed = window.confirm("Are you sure you want to accept?");
    if (!confirmed) return;

    if (!awardCount) {
      alert("Please select how many meals to award.");
      return;
    }

    try {
      const data = await secureFetch(
        `http://localhost:5000/api/updateStatus/${mealId}/${selectedUser._id}/${selectedUser.fullname}/${awardCount}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        const { campaign } = data;

        toast.success("Meal Granted successfully!");
        setAppliedList(campaign?.applied || []);
        setAwardedList(campaign?.awarded || []);
        if (setAwardedTo) setAwardedTo(selectedUser.fullname);

        // Update remaining in both parent and local
        if (setRemaining) setRemaining(data.remaining);
        setLocalRemaining(data.remaining);

        if (campaign?.status === GRANTED) {
          setActiveMeals((prev) =>
            prev.filter((meals) => meals._id !== campaign._id)
          );
          setGrantedMeals(prev => [campaign, ...prev])
        } else {
          setActiveMeals((prev) =>
            prev.map((meals) =>
              meals._id === campaign._id ? campaign : meals
            )
          );
        }

        selectedUserData.selectedUserStatus = GRANTED;
        setShowModal(false);
      } else {
        console.log(data.error || "Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }

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
          <h2 className="text-xl font-semibold my-3 text-gray-800 text-center">
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
          {status === ACTIVE ? (
            <div>
              <span className="font-medium">Applied for:</span>{" "}
              {selectedUserData.appliedfor}{" "}
              {selectedUserData.appliedfor > 1 ? "persons" : "person"}
            </div>
          ) : (
            <div>
              <span className="font-medium">Awarded for:</span>{" "}
              {selectedUserData.appliedfor}{" "}
              {selectedUserData.appliedfor > 1 ? "persons" : "person"}
            </div>
          )}
          <div>
            <span className="font-medium">Status:</span>{" "}
            {selectedUserData.selectedUserStatus === GRANTED ? (
              <span className="text-gray-700 font-semibold">🏅 Awarded</span>
            ) : (
              <span className="text-yellow-600 font-semibold">⏳ Pending</span>
            )}
          </div>
        </div>

        {/* Dropdown to select award count */}
        {canAccept && selectedUserData.selectedUserStatus !== GRANTED && (
          <div className="mb-6 mt-2 flex items-center justify-between gap-3">
            <label
              htmlFor="awardCount"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Award meal for:
            </label>
            <select
              required
              id="awardCount"
              value={awardCount}
              onChange={(e) => setAwardCount(Number(e.target.value))}
              className="block border border-gray-300 rounded-md shadow-sm px-3 py-1 focus:outline-none focus:ring-green-800 focus:border-green-800 text-gray-700"
            >
              <option value="">Select Persons</option>
              {Array.from(
                {
                  length: Math.min(
                    Number(selectedUserData.appliedfor) || 0,
                    Number(localRemaining) || 0
                  ),
                },
                (_, i) => i + 1
              ).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "person" : "persons"}
                </option>
              ))}
            </select>
          </div>
        )}

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
            disabled={
              !canAccept || selectedUserData.selectedUserStatus === GRANTED
            }
            onClick={handleAccept}
            className={`px-9 py-2 rounded transition text-white ${
              canAccept && selectedUserData.selectedUserStatus !== GRANTED
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
