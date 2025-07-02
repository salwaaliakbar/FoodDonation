import React, { useState } from "react";
import MealAcceptModel from "./MealAcceptModal";
import { ACTIVE, EXPIRED, GRANTED } from "../../constants/constants";
import { useLocation } from "react-router-dom";
import Chat from "../../Components/Chat";
import { Trash2 } from "lucide-react";
import { useData } from "../../context/UserContext";
import useJoinMealSocket from "../../customHooks/useJoinMealSocket";

const MealPostCard = ({ meal, handleDelete }) => {
  const [expanded, setExpanded] = useState(false); // Toggle detail view
  const [showModal, setShowModal] = useState(false); // Show accept modal
  const [isChatOpen, setIsChatOpen] = useState(false); // Show chat box
  const { user } = useData();
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

  // Removing awardeds from applied list
  const nonAwardedAppliedList = fullAppliedList.filter((applied) => {
    return !meal.awarded.some(
      (awarded) => awarded.p_id.toString() === applied.p_id._id.toString()
    );
  });

  const [remaining, setRemaining] = useState(meal.remaining);
  const [appliedList, setAppliedList] = useState(nonAwardedAppliedList);
  const [awardedList, setAwardedList] = useState(meal.awarded);
  const [status, setStatus] = useState(meal.status); // Track meal status
  const [awardedTo, setAwardedTo] = useState(""); // Track winner
  const { pathname } = useLocation(); // Get current route
  // Get first letter of donor name
  const firstLetter = meal.createdBy?.fullname?.charAt(0).toUpperCase() || "U";

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
    <>
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-lg shadow-md p-6 mb-4 w-full cursor-pointer transition-all duration-1000"
      >
        {/* Only show awarded banner if in generalfeed and meal is granted */}
        {pathname === "/donorDashBoard/generalfeed" && awardedTo && (
          <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md text-base font-semibold mb-4 shadow-sm">
            🏅 Meal Awarded to <span className="underline">{awardedTo}</span>
          </div>
        )}

        <div className="flex justify-between">
          {/* Donor info and location */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-11 h-11 rounded-full text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800">
              {firstLetter}
            </div>
            <div>
              <h3 className="text-lg font-bold">{meal.createdBy?.fullname}</h3>
              <p className="text-gray-500 text-sm">{meal.location}</p>
            </div>
          </div>
          <div>
            {meal.createdBy?._id === user?._id ? (
              <div
                className="bg-red-100 p-2 rounded-full shadow-md hover:bg-red-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(meal._id);
                }}
                title="Delete Meal"
              >
                <Trash2 className=" text-red-700 hover:text-red-900 transition-transform duration-200 hover:scale-110" />
              </div>
            ) : (
              <div
                className="bg-gray-100 p-2 rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Trash2 className="text-gray-600  shadow-2xl mt-4 cursor-not-allowed disabled" />
              </div>
            )}
          </div>
        </div>

        {/* Meal title & description */}
        <h2 className="text-xl font-semibold mb-2">{meal.title}</h2>
        <p className="text-gray-700 mb-3">{meal.description}</p>

        {/* Meal meta: quantity + status */}
        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <div>
            <p>
              🍴 Meal for {meal.amount} {meal.amount > 1 ? "persons" : "person"}
            </p>
            <p className="mt-2">
              🥗 Remaining Meal for {remaining}{" "}
              {remaining > 1 ? "persons" : "person"}
            </p>
          </div>
        </div>

        {/* Time and applicant count */}
        <div className="flex justify-between items-center text-sm text-gray-700 mt-2">
          <p>⏰ {new Date(meal.createdAt).toLocaleString("en-PK")}</p>
          <p>👥 {appliedList.length} Applied</p>
        </div>

        {expanded && (
          <div className="transition-all duration-1000 mt-8">
            <div className="mb-2">
              {/* Meal status logic */}
              {status === GRANTED ? (
                <p className="text-sm text-green-600 italic">
                  Meal has been awarded.
                </p>
              ) : status === EXPIRED ? (
                <p className="text-sm text-red-600 italic">
                  Meal has been expired.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between">
              {/* Applicants Section */}
              <div className="md:w-1/2 md:pr-6">
                <p className="text-sm font-bold text-gray-600 mb-1">
                  Applicants:
                </p>
                {appliedList?.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {appliedList.map((user, i) => (
                      <li
                        key={i}
                        className="transition transform duration-300 delay-150 hover:font-medium mt-2 cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedUser({
                            selectedUserId: user.p_id?._id,
                            selectedusername: user.p_id?.fullname,
                            appliedfor: user.persons,
                            selectedUserStatus: ACTIVE,
                            appliedDate: user.date,
                          });
                        }}
                      >
                        {user.p_id?.fullname} - {user.persons}{" "}
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

              {/* Awarded Section */}
              <div className="md:w-1/2 md:pl-60 ">
                <p className="text-sm font-bold text-gray-600 mb-1">Awarded:</p>
                {awardedList && awardedList.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm text-green-700">
                    {awardedList.map((aw, i) => (
                      <li
                        key={i}
                        className="transition transform duration-300 delay-150 hover:font-medium mt-2 cursor-pointer"
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
      </div>
      {/* Modal for awarding meal */}
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
          remaining={meal.remaining}
          setRemaining={setRemaining}
          setAppliedList={setAppliedList}
          setAwardedList={setAwardedList}
        />
      )}

      {/* Chat between donor and selected person */}
      {isChatOpen && (
        <Chat
          selectedUserData={selectedUser}
          user={meal.createdBy}
          setIsChatOpen={setIsChatOpen}
          campaignId={meal._id}
        />
      )}
    </>
  );
};

export default MealPostCard;
