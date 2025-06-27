import { useState, useEffect } from "react";
import MealPostCard from "./DonorMealPostCard";
import Loader from "../../Components/Loader";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { ACTIVE } from "../../constants/constants";
import { useHandleDelete } from "../../customHooks/useHandleDelete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";

function DonorGeneralFeed() {
  const [loading, setLoading] = useState(true);
  const [mealPosts, setMealPosts] = useState([]);
  const secureFetch = useSecureFetch();
  const deleteMeal = useHandleDelete();

  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const locationSearch = queryParams.get("location");

  useEffect(() => {
    async function fetchMealFeedData() {
      try {
        const data = await secureFetch(
          `http://localhost:5000/api/generalFeed?status=${ACTIVE}${
            locationSearch ? `&location=${locationSearch}` : ""
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!data.success) {
          alert(data.error || "Failed to fetch feed campaign.");
          return [];
        }

        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        alert("Error fetching Feed Campaigns:", err);
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

  // Delete meal and remove from UI
  const handleDelete = async (id) => {
    const deletedId = await deleteMeal(id);
    if (deletedId) {
      toast.success(
        <div className="font-[Montserrat]">
          <p>Meal Deleted Successfully!</p>
        </div>
      );
      setMealPosts((prev) => prev.filter((meal) => meal._id !== deletedId));
      setActiveMeals((prev) => prev.filter((meal) => meal._id !== deletedId));
    }
  };

  return (
    <div className="flex">
      <div className="w-full absolute right-0 bg-gray-200">
        <div className="md:mb-8 mt-25">
          <h1 className="mb-4 text-3xl font-bold text-green-800 text-center m-4 font-[Poppins]">
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
                  handleDelete={handleDelete}
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
