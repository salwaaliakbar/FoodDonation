import React, { useEffect, useState } from "react";
import MealPostCard from "./MealPostCard";
import SideBar from "./SideBar";
import Loader from "../../Components/Loader";
import { useData } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const GeneralFeed = () => {
  const [loading, setLoading] = useState(true);
  const [mealPosts, setMealPosts] = useState([]);
  const { user } = useData();

  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const locationSearch = queryParams.get("location");

  useEffect(() => {
    async function fetchMealFeedData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/generalFeed?userId=${
            user._id
          }&status=Active${
            locationSearch ? `&location=${locationSearch}` : ""
          }`,
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
  }, [locationSearch]);

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-200 ">
        {/* Optional Sidebar */}
        {/* <SideBar /> */}

        <div className="flex-1 w-full pt-25 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-6 font-[Poppins]">
            General Meal Feed
          </h1>

          {loading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Loader />
            </div>
          ) : mealPosts.length ? (
            <div className="grid gap-6 grid-cols-1 max-w-7xl mx-auto">
              {mealPosts.map((post, index) => (
                <MealPostCard
                  key={post._id}
                  meal={post}
                  index={index}
                  setMealPosts={setMealPosts}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg font-semibold">No meals to display</p>
              <p className="text-sm">
                Once meals are added, they’ll appear here in your feed.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralFeed;
