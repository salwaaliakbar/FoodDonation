import React, { useState, useEffect } from "react";
import MealCard from "./DonorMealCard";
import { useData } from "../ContextAPIs/UserContext";
import { useChange } from "../ContextAPIs/ChangeContext";

const ActiveMealsSection = ({ title: name, color, bg, status }) => {
  const { user } = useData();
  const {
    isChange,
    setIsChange,
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
    async function fetchMealData(status) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getHistoy?userId=${user._id}&status=${status}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      } catch (err) {
        console.error("Error fetching user campaigns:", err);
        return [];
      }
    }

    const fetchData = async () => {
      setLoading(true);

      // Simulate delay using setTimeout to show loader initially
      setTimeout(async () => {
        const activeData = await fetchMealData("Active");
        setActiveMeals(activeData);

        const grantedData = await fetchMealData("Awarded");
        setGrantedMeals(grantedData);

        const expiredData = await fetchMealData("Expired");
        setBlacklistMeals(expiredData);

        setLoading(false); // Stop loading after data is fetched
      }, 1000);
    };

    // Fetch data only when isChange is true
    if (isChange) {
      fetchData();
      setIsChange(false);
    }
  }, [user._id, isChange]);

  return (
    <section className="w-full mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4 mb-4">
      <h2 className={`text-xl font-bold ${color} p-4 border-b ${bg}`}>
        {name}
      </h2>

      {/* Show loading spinner or text before data is fetched */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-800"></div>
        </div>
      ) : (
        <>
          {/* Render active meals if status is 'Active' */}
          {status === "Active" &&
            activeMeals.map((meal, i) => (
              <MealCard key={i} meal={meal} color={color} status={status} />
            ))}

          {/* Render granted meals if status is 'Awarded' */}
          {status === "Awarded" &&
            grantedMeals.map((meal, i) => (
              <MealCard key={i} meal={meal} color={color} status={status} />
            ))}

          {/* Render expired meals if status is 'Expired' */}
          {status === "Expired" &&
            blacklistMeals.map((meal, i) => (
              <MealCard key={i} meal={meal} color={color} status={status} />
            ))}
        </>
      )}
    </section>
  );
};

export default ActiveMealsSection;
