import { useState, useEffect } from "react";
import React from "react";
import SideBar from "./SideBar";
import Loader from "../../Components/Loader";
import AppliedMealPostCard from "./AppliedMealPostCard";
import { useData } from "../../context/UserContext";

const ActiveMeals = () => {
  const [loading, setLoading] = useState(true);
  const [mealPosts, setMealPosts] = useState([]);
  const { user } = useData();

  useEffect(() => {
    async function fetchMealFeedData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/activeFeed?userId=${user?._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        console.error("Error fetching Feed Campaigns:", err);
        return [];
      }
    }

    const fetchData = async () => {
      setLoading(true);
      setTimeout(async () => {
        const feedData = await fetchMealFeedData();
        setMealPosts(feedData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-200">
        {/* Main content */}
        <div className="flex-1 pt-25 px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-6 font-[Poppins]">
            Active Meals
          </h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader />
            </div>
          ) : mealPosts.length > 0 ? (
            <div className="w-full max-w-7xl mx-auto space-y-4">
              {mealPosts.map((post, index) => (
                <AppliedMealPostCard
                  key={post._id}
                  mealData={post}
                  index={index}
                  setMealPosts={setMealPosts}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg font-semibold">
                No Active Meals to display
              </p>
              <p className="text-sm">
                Start Applying on Meals, they’ll appear here in your feed.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveMeals;
