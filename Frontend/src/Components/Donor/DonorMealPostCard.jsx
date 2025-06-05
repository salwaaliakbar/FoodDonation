import React, { useState } from "react";
import MealAcceptModel from "./MealAcceptModal";

const MealPostCard = ({ meal }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selecteduser, setSelectedUser] = useState({});

  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
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
            🍴 Meal for {meal.amount} {meal.amount > 1 ? "persons" : "person"}{" "}
          </p>
          <p>Status: {meal.status}</p>
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
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {meal.applied.map((user, i) => (
                  <li
                    key={i}
                    className="transition transform duration-300 delay-150 hover:font-bold mt-2"
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
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <MealAcceptModel
          mealId={meal._id}
          setShowModal={setShowModal}
          selectedUserData={selecteduser}
        />
      )}
    </>
  );
};

export default MealPostCard;
