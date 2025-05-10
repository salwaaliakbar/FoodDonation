import React, { useEffect } from "react";
import MealCard from "./DonorMealCard";
import { useData } from "../ContextAPIs/UserContext";
import { useChange } from "../ContextAPIs/ChangeContext";
import { useSecureFetch } from "../Refresh/SecureFetch";

const ActiveMealsSection = ({ title: name, color, bg, status }) => {
  const { user } = useData();
  const secureFetch = useSecureFetch()
  
  const {
    isChangeActive,
    setIsChangeActive,
    isChangeGranted,
    setIsChangeGranted,
    isChangeExpired,
    setIsChangeExpired,
    loading,
    setLoading,
    activeMeals,
    setActiveMeals,
    grantedMeals,
    setGrantedMeals,
    blacklistMeals,
    setBlacklistMeals,
  } = useChange();

  useEffect(() => {
    // Logic for blacklist meals
    if (
      (status === "Active" || status === "Expired") &&
      activeMeals.length > 0
    ) {
      console.log("chk");
      const now = new Date();
      const expired = activeMeals
        .filter((meal) => new Date(meal.expiration) <= now)
        .map((meal) => ({ ...meal, status: "Expired" }));

      const stillActive = activeMeals.filter(
        (meal) => new Date(meal.expiration) > now
      );

      setActiveMeals(stillActive);
      setBlacklistMeals((prev) => [...prev, ...expired]);
    }

    //  Only fetch from DB when isChange is true
    if (
      (isChangeActive && status === "Active") ||
      (isChangeGranted && status === "Awarded") ||
      (isChangeExpired && status === "Expired")
    ) {
      fetchData();
    }
  }, [user?._id, isChangeActive, isChangeGranted, isChangeExpired, status]);

  async function fetchMealData(status) {
    try {
      const data = await secureFetch(
        `http://localhost:5000/api/getHistoy?userId=${user?._id}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return Array.isArray(data.campaigns) ? data.campaigns : [];
    } catch (err) {
      console.error("Error fetching user campaigns:", err);
      return [];
    }
  }

  async function fetchData() {
    setLoading(true);

    setTimeout(async () => {
      console.log("abcd");
      if (status === "Active") {
        const activeData = await fetchMealData("Active");
        setActiveMeals(activeData);
        setIsChangeActive(false);
      } else if (status === "Awarded") {
        const grantedData = await fetchMealData("Awarded");
        setGrantedMeals(grantedData);
        setIsChangeGranted(false);
      } else if (status === "Expired") {
        const expiredData = await fetchMealData("Expired");
        setBlacklistMeals(expiredData);
        setIsChangeExpired(false);
      }

      setLoading(false);
    }, 1000);
  }

  return (
    <section className="w-full mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4 mb-4">
      <h2
        className={`text-[23px] font-bold ${color} p-4 border-b ${bg} rounded-t-xl`}
      >
        {name}
      </h2>

      {/* Show loading spinner before data is fetched */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-800"></div>
        </div>
      ) : (
        <>
          {/* Render active meals if status is 'Active' */}
          {status === "Active" ? (
            activeMeals.length > 0 ? (
              activeMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-lg font-semibold">No active meals found</p>
                <p className="text-sm">Start adding meals to see them here.</p>
              </div>
            )
          ) : null}

          {/* Render granted meals if status is 'Awarded' */}
          {status === "Awarded" ? (
            grantedMeals.length > 0 ? (
              grantedMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-lg font-semibold">No granted meals found</p>
                <p className="text-sm">Check back later for updates.</p>
              </div>
            )
          ) : null}

          {/* Render expired meals if status is 'Expired' */}
          {status === "Expired" ? (
            blacklistMeals.length > 0 ? (
              blacklistMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-lg font-semibold">No expired meals found</p>
                <p className="text-sm">
                  All meals are currently active or awarded.
                </p>
              </div>
            )
          ) : null}
        </>
      )}
    </section>
  );
};

export default ActiveMealsSection;
