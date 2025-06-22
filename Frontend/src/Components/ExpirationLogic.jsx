import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { EXPIRED } from "../Components/CONSTANTS";

function ExpirationLogic({ meals, onFilter, setBlacklistMeals }) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current || !Array.isArray(meals) || meals.length === 0) return;

    const now = new Date();

    const expired = meals
      .filter((meal) => new Date(meal.expiration) <= now)
      .map((meal) => ({ ...meal, status: EXPIRED }));

    const active = meals.filter((meal) => new Date(meal.expiration) > now);

    if (expired.length > 0) {
      toast.error(
        <div>
          <p className="font-bold text-lg mb-2">
            {expired.length} meal(s) expired:
          </p>
          <ul className="list-disc list-inside text-sm">
            {expired.map((meal, i) => (
              <li key={i}>{meal.title || "Unnamed Meal"}</li>
            ))}
          </ul>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          className: "text-red-700 bg-red-100 px-4 py-3 rounded-md shadow-lg",
          progressClassName: "bg-red-600",
        }
      );
    }

    // Filter active meals
    onFilter(active);

    // Append expired meals to blacklist
    if (typeof setBlacklistMeals === "function") {
      setBlacklistMeals((prev) => Array.isArray(prev) ? [...expired, ...prev] : [...expired]);
    }

    hasRun.current = true;
  }, [meals, onFilter, setBlacklistMeals]);

  return null;
}

export default ExpirationLogic;
