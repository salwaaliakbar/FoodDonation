import SideBar from "./DonorSidebar";
import Header from "./DonorHeader";
import { useState, useEffect } from "react";
import { useData } from "../ContextAPIs/UserContext";
import Loader from "../Loader";
import MealPostCard from "../Recipent/MealPostCard";

function DonorGeneralFeed() {
  const [loading, setLoading] = useState(true);
  const [mealPosts, setMealPosts] = useState([]);
  const { user } = useData();

  useEffect(() => {
    async function fetchMealFeedData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/generalFeed?userId=${
            user._id
          }&status=${"Active"}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        // console.log(data.message);  // Error Message or Replied Message from server
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
        // console.log(feedData);  // Consoling the data for checking\
        // console.log

        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-[80%] absolute right-0 bg-gray-200">
        <Header />
        <h1 className="text-3xl font-bold mb-8 text-green-600 text-center m-4">
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
  );
}

export default DonorGeneralFeed;
