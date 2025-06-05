import React, { useState } from "react";
import { format } from "date-fns";
import { ACTIVE, EXPIRED, GRANTED } from "../constants";
import MealAcceptModel from "./MealAcceptModal";

const MealCard = ({ meal, color }) => {
  const [expanded, setExpanded] = useState(false);
  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";
  const [status, setStatus] = useState(meal.status);
  const [awardedTo, setAwardedTo] = useState(meal.awarded || "none");
  const [showModal, setShowModal] = useState(false);
  const [selecteduser, setSelectedUser] = useState({});

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="w-full px-4 py-3 my-2 mb-0 border-b rounded-xl border-gray-300 hover:bg-gray-100 cursor-pointer transition-all duration-300"
    >
      {status === GRANTED && awardedTo && (
        <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md text-base font-semibold mb-4 shadow-sm">
          🏅 Meal Awarded to <span className="underline">{awardedTo}</span>
        </div>
      )}
      {/* Row Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Photo + User + Title */}
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

        {/* Middle: Quick Info */}
        <div className="flex flex-col w-full sm:w-[30%] text-sm text-gray-600">
          <span>🍽️ {meal.amount} meals</span>
          <span>
            🕒 Created At:{" "}
            {format(new Date(meal.createdAt), "MM/dd/yyyy hh:mm a")}
          </span>
        </div>

        {/* Right Side: Applicants */}
        <div className="w-full sm:w-[20%] text-right">
          {meal.status === ACTIVE && (
            <>
              <span>
                ✅ {meal.status} <p className="text-yellow-600"></p>
              </span>
              <div className="flex justify-end items-center text-sm text-gray-700 mt-2">
                <p>👥 {meal.applied.length} Applied</p>
              </div>
            </>
          )}
          {meal.status === GRANTED && (
            <>
              <span>
                🏅 {meal.status} <p className="text-green-600"></p>
              </span>
              {console.log("awarded", meal.awarded)}
              <p className="text-amber-600">{meal.awarded}</p>
            </>
          )}
          {meal.status === EXPIRED && (
            <>
              <span>
                🚫 {meal.status} <p className="text-red-800"></p>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-3 ml-0 sm:ml-14 border-t pt-3 text-sm text-gray-600 space-y-1 flex justify-between">
          <div className="mt-2">
            <p className="mb-1">
              <strong>Description:</strong> {meal.description}
            </p>
            <p className="mb-1">
              <strong>Location:</strong> {meal.location}
            </p>
            <p className="mb-1">
              <strong>Expired On: </strong>{" "}
              {format(new Date(meal.expiration), "MM/dd/yyyy hh:mm a")}
            </p>
          </div>
          <div className="transition-all duration-1000 my-4 mr-2">
            <div className="mb-2">
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
              ) : meal.applied.length > 0 ? (
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {meal.applied.map((user, i) => (
                    <li
                      key={i}
                      className="transition transform duration-300 delay-150 hover:scale-110 mt-2 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedUser(user.p_id);
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

      {showModal && (
        <MealAcceptModel
          mealId={meal._id}
          createdBy={meal.createdBy}
          setShowModal={setShowModal}
          selectedUserData={selecteduser}
          status={status}
          setStatus={setStatus}
          setAwardedTo={setAwardedTo}
        />
      )}
    </div>
  );
};

export default MealCard;
