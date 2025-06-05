import React, { useState } from "react";
import { useEffect } from "react";
import { useSecureFetch } from "../Refresh/SecureFetch";
import { useChange } from "../ContextAPIs/ChangeContext";

function MealAcceptModel({ mealId, setShowModal, selectedUserData }) {
  const secureFetch = useSecureFetch();
  const [selectedUser, setSelectedUser] = useState({});
  
    const { setIsChangeActive, setIsChangeGranted } = useChange();

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
        console.error("Error fetching selected recepient data:  ", err);
      }
    }

    fetchSelectedUserData();
  }, []);

  async function handleAccept() {
    const confirmed = window.confirm("Are you sure you want to accept?");
    console.log(mealId);
    if (confirmed) {
      try {
        const data = await secureFetch(
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
      } catch (err) {
        console.error("Error fetching selected recepient data:  ", err);
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
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAccept();
              setShowModal(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealAcceptModel;
