import React, { useState } from "react";
import { format } from "date-fns";
import MealAcceptModel from "./MealAcceptModal";
import Chat from "../../Components/Chat";
import { Trash2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useData } from "../../context/UserContext";
import { ACTIVE, GRANTED, EXPIRED } from "../../constants/constants";
import useJoinMealSocket from "../../customHooks/useJoinMealSocket";

const MealCard = ({ meal, color, handleDelete, status: currentStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  const [status, setStatus] = useState(meal.status);
  const [showModal, setShowModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedusername: "",
    appliedfor: 0,
    selectedUserStatus: "",
    appliedDate: "",
    awardedfor: "",
    awardedDate: "",
  });

  const fullAppliedList = meal.applied;

  const nonAwardedAppliedList = fullAppliedList.filter((applied) => {
    return !meal.awarded.some(
      (awarded) => awarded.p_id.toString() === applied.p_id._id.toString()
    );
  });

  const [appliedList, setAppliedList] = useState(nonAwardedAppliedList);
  const [awardedList, setAwardedList] = useState(meal.awarded);
  const { user } = useData();

  // call join meal socket hook
  useJoinMealSocket({ meal, status, setAppliedList });

  function getAppliedPersons(userId) {
    const entry = fullAppliedList.find(
      (a) => a.p_id._id?.toString() === userId?.toString()
    );
    return entry?.persons || 0;
  }

  function getAppliedDate(userId) {
    const entry = fullAppliedList.find(
      (a) => a.p_id._id?.toString() === userId?.toString()
    );
    return entry?.date || null;
  }

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="relative w-full px-4 py-3 my-2 border-b rounded-xl border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-[40%]">
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
            {firstLetter}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {meal?.createdBy?.fullname || ""}
            </p>
            <p className={`text-base font-extrabold ${color} text-[17px]`}>
              {meal?.title}
            </p>
          </div>
        </div>

        {status === ACTIVE && currentStatus === ACTIVE ? (
          <div className="flex flex-col w-full sm:w-[30%] text-sm text-gray-600">
            <span>🍽️ {meal?.amount} meals</span>
            <span>🥗 Remaining Meal {meal?.remaining}</span>
          </div>
        ) : (
          <div className="flex flex-col w-full sm:w-[30%] text-sm text-gray-600">
            <span>🍽️ {meal?.amount} meals</span>
            <span>
              🕒 Created At:{" "}
              {format(new Date(meal?.createdAt), "MM/dd/yyyy hh:mm a")}
            </span>
          </div>
        )}

        <div className="w-full sm:w-[20%] text-right">
          {status === ACTIVE && currentStatus === ACTIVE && (
            <div className="flex gap-3 justify-end">
              <div>
                <span>✅ {status}</span>
                <div className="flex justify-end items-center text-sm text-gray-700 mt-2">
                  <p>👥 {appliedList.length} Applied</p>
                </div>
              </div>
              {/* Trash Icon Bottom-Right */}
              <div>
                {meal.createdBy?._id === user?._id && (
                  <div
                    className=" bg-red-100 p-2 rounded-full shadow-md hover:bg-red-200 transition-colors mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(meal._id);
                    }}
                    title="Delete Meal"
                  >
                    <Trash2 className="w-4 h-4 text-red-700 hover:text-red-900 transition-transform duration-200 hover:scale-110" />
                  </div>
                )}
              </div>
            </div>
          )}
          {status === GRANTED && (
            <div className="mr-6">
              <span>🏅 {status}</span>
              <div className="flex justify-end items-center text-sm text-gray-700 mt-2">
                <p>👥 {awardedList.length} awarded</p>
              </div>
            </div>
          )}
          {(status === EXPIRED || currentStatus === EXPIRED) && (
            <div className="mr-6">
              <span>🚫 {currentStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Toggleable Details */}
      {expanded && (
        <div className="mt-3 ml-0 sm:ml-14 border-t pt-3 text-sm text-gray-600 space-y-1 flex justify-between flex-wrap">
          {/* Left Section: Details */}
          <div className="mt-2">
            <p className="mb-1">
              <strong>Description:</strong> {meal.description}
            </p>
            <p className="mb-1">
              <strong>Location:</strong> {meal.location}
            </p>
            <p className="mb-1">
              <strong>Created At:</strong>{" "}
              {format(new Date(meal?.createdAt), "MM/dd/yyyy hh:mm a")}
            </p>
            <p className="mb-1">
              <strong>Expired On:</strong>{" "}
              {format(new Date(meal?.expiration), "MM/dd/yyyy hh:mm a")}
            </p>
          </div>

          {/* Right Section: Applicants & Awarded */}
          <div className="transition-all duration-1000 my-4 mr-2 relative">
            {/* Applicants */}
            <div className="mb-4">
              <p className="text-sm font-bold text-gray-600 mb-1">
                Applicants:
              </p>
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
                          appliedfor: user.persons,
                          selectedUserStatus: ACTIVE,
                          appliedDate: user.date,
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

            {/* Awarded */}
            <div>
              <p className="text-sm font-bold text-gray-600 mb-1">Awarded:</p>
              {awardedList && awardedList.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-green-700">
                  {awardedList.map((aw, i) => (
                    <li
                      key={i}
                      className="transition transform duration-300 delay-150 hover:scale-110 mt-2 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedUser({
                          selectedUserId: aw?.p_id,
                          selectedusername: aw?.p_name,
                          awardedfor: aw?.a_person,
                          selectedUserStatus: GRANTED,
                          awardedDate: aw.a_date,
                          appliedfor: getAppliedPersons(aw?.p_id),
                          appliedDate: getAppliedDate(aw?.p_id),
                        });
                      }}
                    >
                      {aw.p_name} - {aw.a_person}{" "}
                      {aw.a_person > 1 ? "people" : "person"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No one has been awarded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <MealAcceptModel
          mealId={meal._id}
          createdBy={meal.createdBy}
          setShowModal={setShowModal}
          status={status}
          setStatus={setStatus}
          setIsChatOpen={setIsChatOpen}
          selectedUserData={selectedUser}
          remaining={meal.remaining}
          setAppliedList={setAppliedList}
          setAwardedList={setAwardedList}
        />
      )}

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
