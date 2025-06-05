import React, { useState } from "react";
import MealAcceptModel from "./MealAcceptModal";
import { GRANTED, PENDING } from "../CONSTANTS";

const MealPostCard = ({ meal }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selecteduser, setSelectedUser] = useState({});
  const [status, setStatus] = useState(meal.status || PENDING);
  const [awardedTo, setAwardedTo] = useState(meal.awarded || 'none');

  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
      >
        {status === GRANTED && awardedTo && (
          <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md text-base font-semibold mb-4 shadow-sm">
            🏅 Meal Awarded to <span className="underline">{awardedTo}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-11 h-11 rounded-full text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
            {firstLetter}
          </div>
          <div>
            <h3 className="text-lg font-bold">{meal.createdBy.fullname}</h3>
            <p className="text-gray-500 text-sm">{meal.location}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">{meal.title}</h2>
        <p className="text-gray-700 mb-3">{meal.description}</p>

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

        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <p>⏰ {new Date(meal.createdAt).toLocaleString("en-PK")}</p>
          <p>👥 {meal.applied.length} Applied</p>
        </div>

        {expanded && (
          <div className="transition-all duration-1000 mt-8">
            <div className="mb-2">
              <p className="text-sm font-semibold text-gray-600 mb-1">
                Applicants:
              </p>
              {status !== "Accepted" ? (
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {meal.applied.map((user, i) => (
                    <li
                      key={i}
                      className="transition transform duration-300 delay-150 hover:font-bold mt-2 cursor-pointer"
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
                  Meal has been accepted. No more applicants can be selected.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

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
    </>
  );
};

export default MealPostCard;
