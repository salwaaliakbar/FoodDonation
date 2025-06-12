import SideBar from "./DonorSidebar";
import Header from "./DonorHeader";
import { useState, useEffect } from "react";
import { useData } from "../../ContextAPIs/UserContext";
import Loader from "../Loader";
import MealPostCard from "./DonorMealPostCard";
import { useSecureFetch } from "../Refresh/SecureFetch";
import DonorSidebar from "./DonorSidebar";
import { ACTIVE } from "../constants";

function DonorGeneralFeed() {
  const [loading, setLoading] = useState(true);
  const [mealPosts, setMealPosts] = useState([]);
  const secureFetch = useSecureFetch()

  useEffect(() => {
    async function fetchMealFeedData() {
      try {
        const data = await secureFetch(
          `http://localhost:5000/api/generalFeed?status=${ACTIVE}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        
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
    <div className="flex">
      {/* <DonorSidebar /> */}
      <div className="w-full absolute right-0 bg-gray-200">
        <Header />
        <div className="md:mb-8 mt-25">
        <h1 className=" mb-4 text-3xl font-bold text-green-800 text-center m-4">
          General Meal Feed
        </h1>

        {loading ? (
          <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
            <Loader />
          </div>
        ) : mealPosts.length ? (
          <div className="w-[94%] min-h-[70vh] m-auto">
            {mealPosts.map((post, index) => (
              <MealPostCard
                key={post._id}
                meal={post}
                index={index}
                // setMealPosts={setMealPosts}
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
    </div>
  );
}

export default DonorGeneralFeed;
