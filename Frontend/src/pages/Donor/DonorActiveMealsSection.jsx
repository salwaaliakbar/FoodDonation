import React, { useEffect } from "react";
import MealCard from "./DonorMealCard";
import { useData } from "../../context/UserContext";
import { useChange } from "../../context/ChangeContext";
import { useSecureFetch } from "../../Components/Refresh/SecureFetch";
import { ACTIVE, GRANTED, EXPIRED } from "../../Components/constants";

const ActiveMealsSection = ({ title: name, color, bg, status }) => {
  const { user } = useData();
  const secureFetch = useSecureFetch();

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
    isLoggedout,
    setIsLoggedOut,
  } = useChange();

  useEffect(() => {
    // Move expired meals from activeMeals to blacklistMeals
    if ((status === ACTIVE || status === EXPIRED) && activeMeals?.length > 0) {
      const now = new Date();
      const expired = activeMeals
        .filter((meal) => new Date(meal.expiration) <= now)
        .map((meal) => ({ ...meal, status: EXPIRED }));

      const stillActive = activeMeals.filter(
        (meal) => new Date(meal.expiration) > now
      );

      setActiveMeals(stillActive);
      setBlacklistMeals((prev) => [...prev, ...expired]);
    }

    // Prevent redundant fetch if user has logged out and logged back in
    if (isLoggedout) {
      setIsLoggedOut(false);
    } else {
      // Conditionally fetch data based on status-specific change flags
      if (
        (isChangeActive && status === ACTIVE) ||
        (isChangeGranted && status === GRANTED) ||
        (isChangeExpired && status === EXPIRED)
      ) {
        fetchData();
      }
    }
  }, [user?._id, isChangeActive, isChangeGranted, isChangeExpired, status]);

  // Fetch campaign data for a specific status
  async function fetchMealData(status) {
    try {
      if (user?._id) {
        const data = await secureFetch(
          `http://localhost:5000/api/getHistoy?userId=${user._id}&status=${status}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      }
    } catch (err) {
      console.error("Error fetching user campaigns:", err);
    }
    return [];
  }

  // Fetch and update meals based on current status
  async function fetchData() {
    setLoading(true);

    // Simulate delay for loading UI
    setTimeout(async () => {
      if (status === ACTIVE) {
        const activeData = await fetchMealData(ACTIVE);
        setActiveMeals(activeData);
        setIsChangeActive(false);
      } else if (status === GRANTED) {
        const grantedData = await fetchMealData(GRANTED);
        setGrantedMeals(grantedData);
        setIsChangeGranted(false);
      } else if (status === EXPIRED) {
        const expiredData = await fetchMealData(EXPIRED);
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

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-800"></div>
        </div>
      ) : (
        <>
          {/* Render Meals based on status */}
          {status === ACTIVE && (
            activeMeals?.length > 0 ? (
              activeMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} status={ACTIVE} />
              ))
            ) : (
              <NoMeals message="No active meals found" hint="Start adding meals to see them here." />
            )
          )}

          {status === GRANTED && (
            grantedMeals?.length > 0 ? (
              grantedMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} status={GRANTED} />
              ))
            ) : (
              <NoMeals message="No granted meals found" hint="Check back later for updates." />
            )
          )}

          {status === EXPIRED && (
            blacklistMeals?.length > 0 ? (
              blacklistMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} status={EXPIRED} />
              ))
            ) : (
              <NoMeals
                message="No expired meals found"
                hint="All meals are currently active or awarded."
              />
            )
          )}
        </>
      )}
    </section>
  );
};

// Reusable component for "no meals found" UI
const NoMeals = ({ message, hint }) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <p className="text-lg font-semibold">{message}</p>
    <p className="text-sm">{hint}</p>
  </div>
);

export default ActiveMealsSection;
