import React from "react";
import MealCard from "../pages/Recipent/MealCard";

const ActiveMealsSection = ({ Meals, title }) => {
  return (
    <section className="w-full mx-auto bg-white border border-zinc-200 rounded-xl shadow-lg mt-4 mb-4 px-2 sm:px-4">
      <h2 className="text-lg sm:text-xl font-bold text-green-700 p-4 border-b">
        {title} Meals
      </h2>
      <div className="flex flex-col gap-4">
        {Meals.length ? (
          Meals.map((meal, i) => <MealCard key={i} meal={meal} />)
        ) : title === "Active" ? (
          <NoMeals
            message="No active meals found"
            hint="Start Applying on meals to see them here."
          />
        ) : (
          <NoMeals message="No Granted meals found" hint="" />
        )}
      </div>
    </section>
  );
};

// Reusable component for "no meals found" UI
const NoMeals = ({ message, hint }) => (
  <div className="flex flex-col items-center justify-center h-24 text-gray-500 text-center px-2">
    <p className="text-base sm:text-lg font-semibold">{message}</p>
    {hint && <p className="text-sm sm:text-base">{hint}</p>}
  </div>
);

export default ActiveMealsSection;
