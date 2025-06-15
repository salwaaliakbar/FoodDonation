import { useState, useEffect } from "react";
import Header from "./DonorHeader";
import MealPostCard from "./DonorMealPostCard";
import Loader from "../../Components/Loader";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { ACTIVE } from "../../Components/CONSTANTS";

function DonorGeneralFeed() {
  const [loading, setLoading] = useState(true);    // Track loading state
  const [mealPosts, setMealPosts] = useState([]);  // Store fetched meal posts
  const secureFetch = useSecureFetch();       // Authenticated fetch hook

  useEffect(() => {
    // Fetch general meal feed data
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
        if (!data.success) {
          alert(data.error || "Failed to fetch feed campaign.");
          return [];
        }

        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        console.error("Error fetching Feed Campaigns:", err);
        return [];
      }
    }

    // Wrapper to manage loading state with slight delay (UX-friendly)
    const fetchData = async () => {
      setLoading(true);

      setTimeout(async () => {
        const feedData = await fetchMealFeedData();
        setMealPosts(feedData);
        setLoading(false);
      }, 1000);
    };

    fetchData(); // Initial load
  }, []);

  return (
    <div className="flex">
      {/* Sidebar placeholder – uncomment if needed */}
      {/* <DonorSidebar /> */}

      <div className="w-full absolute right-0 bg-gray-200">
        <Header />

        <div className="md:mb-8 mt-25">
          <h1 className="mb-4 text-3xl font-bold text-green-800 text-center m-4">
            General Meal Feed
          </h1>

          {loading ? (
            // Show loading spinner while data is being fetched
            <div className="w-full flex min-h-[70vh] justify-center items-center py-16">
              <Loader />
            </div>
          ) : mealPosts.length ? (
            // Render fetched meal posts
            <div className="w-[94%] min-h-[70vh] m-auto">
              {mealPosts.map((post, index) => (
                <MealPostCard
                  key={post._id}
                  meal={post}
                  index={index}
                  // setMealPosts={setMealPosts} // Useful if allowing updates/removals
                />
              ))}
            </div>
          ) : (
            // Show fallback UI when no posts are available
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
