import React, { useState, useEffect } from "react";
import { useSecureFetch } from "../Refresh/SecureFetch";
import { useChange } from "../ContextAPIs/ChangeContext";
import { GRANTED } from "../CONSTANTS";
import { useData } from "../ContextAPIs/UserContext";

function MealAcceptModel({
  mealId,
  createdBy,
  setShowModal,
  selectedUserData,
  status,
  setStatus,
  setAwardedTo,
}) {
  const secureFetch = useSecureFetch();
  const [selectedUser, setSelectedUser] = useState({});
  const { setIsChangeActive, setIsChangeGranted } = useChange();
  const { user } = useData();

  useEffect(() => {
    async function fetchSelectedUserData() {
      try {
        const data = await secureFetch(
          `http://localhost:5000/api/getUserData/${selectedUserData._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSelectedUser(data.UserData);
      } catch (err) {
        console.error("Error fetching selected recipient data: ", err);
      }
    }

    fetchSelectedUserData();
  }, []);

  async function handleAccept() {
    const confirmed = window.confirm("Are you sure you want to accept?");
    if (confirmed) {
      try {
        await secureFetch(
          `http://localhost:5000/api/updateStatus/${mealId}/${selectedUser.fullname}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsChangeActive(true);
        setIsChangeGranted(true);
        setStatus(GRANTED);
        setAwardedTo(selectedUser.fullname);
        setShowModal(false);
      } catch (err) {
        console.error("Error updating status: ", err);
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] animate-zoomIn shadow-lg">
        <div className="flex flex-col mb-4 items-center">
          <h2 className="text-xl font-semibold mt-3 text-gray-800 mb-6">
            Accept Meal Request
          </h2>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
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
            <span className="font-medium">
              Status:{" "}
              {status === "Accepted" ? (
                <span className="text-green-600 font-semibold">🏅 Awarded</span>
              ) : (
                <span className="text-yellow-600 font-semibold">
                  ⏳ Pending
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={status === GRANTED || createdBy._id !== user._id}
            onClick={handleAccept}
            className={`px-4 py-2 rounded transition text-white  ${
              status === GRANTED || createdBy._id !== user._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
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
