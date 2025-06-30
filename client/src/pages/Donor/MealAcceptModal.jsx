import React, { useState, useEffect } from "react";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { EXPIRED, GRANTED } from "../../constants/constants";
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
            headers: { Accept: "application/json" },
          }
        );
        if (response.success) {
          setSelectedUser(response.UserData);
        } else {
          alert(response.error || "Failed to update status.");
        }
      } catch (err) {
        alert("Error fetching recipient data:", err);
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
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (data.success) {
        const { campaign } = data;

        toast.success(
          <div className="font-[Montserrat]">
            <p>Meal Granted Successfully!</p>
          </div>
        );

        // Filter out awarded users from applied list
        const filteredApplied = (campaign?.applied || []).filter((applied) => {
          return !campaign.awarded.some(
            (awarded) => awarded.p_id.toString() === applied.p_id._id.toString()
          );
        });
        setAppliedList(filteredApplied);
        setAwardedList(campaign?.awarded || []);
        if (setAwardedTo) setAwardedTo(selectedUser.fullname);

        // Update remaining in both parent and local
        if (setRemaining) setRemaining(data.remaining);
        setLocalRemaining(data.remaining);

        if (campaign?.status === GRANTED) {
          setActiveMeals((prev) =>
            prev.filter((meals) => meals._id !== campaign._id)
          );
          setGrantedMeals((prev) => [campaign, ...prev]);
        } else {
          setActiveMeals((prev) =>
            prev.map((meals) => (meals._id === campaign._id ? campaign : meals))
          );
        }

        selectedUserData.selectedUserStatus = GRANTED;
        setShowModal(false);
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      alert("Error updating status:", err);
    }
  }

  const isOwner = createdBy._id === user._id;
  const canAccept = isOwner && status !== GRANTED && status !== EXPIRED;
  const canChat = isOwner;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 font-[Montserrat]">
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
            <span className="font-bold">Name:</span> {selectedUser.fullname}
          </div>
          <div>
            <span className="font-bold">Email:</span> {selectedUser.email}
          </div>
          <div>
            <span className="font-bold">Phone:</span> {selectedUser.phone}
          </div>
          {selectedUser.organization && (
            <div>
              <span className="font-bold">Organization:</span>{" "}
              {selectedUser.organization}
            </div>
          )}

          <div>
            <span className="font-bold">Applied At:</span>{" "}
            {new Date(selectedUserData.appliedDate).toLocaleString("en-PK")}
          </div>

          <div>
            <span className="font-bold">Applied for:</span>{" "}
            {selectedUserData.appliedfor}{" "}
            {selectedUserData.appliedfor > 1 ? "persons" : "person"}
          </div>

          <div>
            {selectedUserData.selectedUserStatus === GRANTED && (
              <>
                <div className="mb-2">
                  <span className="font-bold">Awarded At:</span>{" "}
                  {new Date(selectedUserData.awardedDate).toLocaleString(
                    "en-PK"
                  )}
                </div>

                <div>
                  <span className="font-bold">Awarded for:</span>{" "}
                  {selectedUserData.awardedfor}{" "}
                  {selectedUserData.awardedfor > 1 ? "persons" : "person"}
                </div>
              </>
            )}
          </div>

          <div>
            <span className="font-bold">Status:</span>{" "}
            {selectedUserData.selectedUserStatus === GRANTED ? (
              <span className="text-green-700 font-semibold">🏅 Awarded</span>
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
              className="text-sm font-bold text-gray-700 whitespace-nowrap"
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
