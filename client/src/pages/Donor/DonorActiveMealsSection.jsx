import React, { useEffect } from "react";
import MealCard from "./DonorMealCard";
import { useData } from "../../context/UserContext";
import { useSecureFetch } from "../../customHooks/useSecureFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHandleDelete } from "../../customHooks/useHandleDelete";
import { useChange } from "../../Context/ChangeContext";
import { ACTIVE, GRANTED, EXPIRED } from "../../constants/constants";

const ActiveMealsSection = ({ title: name, color, bg, status }) => {
  const { user } = useData();
  const secureFetch = useSecureFetch();
  const deleteMeal = useHandleDelete();

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

  // Fetch data only when status-specific flag is true
  useEffect(() => {
    if (isLoggedout) {
      setIsLoggedOut(false);
    } else {
      if (
        (isChangeActive && status === ACTIVE) ||
        (isChangeGranted && status === GRANTED) ||
        (isChangeExpired && status === EXPIRED)
      ) {
        fetchData();
      }
    }
  }, [user?._id, isChangeActive, isChangeGranted, isChangeExpired, status]);

  async function fetchMealData(status) {
    try {
      if (user?._id) {
        const data = await secureFetch(
          `http://localhost:5000/api/getHistoy?userId=${user._id}&status=${status}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!data.success) {
          alert(data.error || "Failed to fetch user campaigns.");
          return [];
        }
        return Array.isArray(data.campaigns) ? data.campaigns : [];
      }
    } catch (err) {
      console.error("Error fetching user campaigns:", err);
    }
    return [];
  }

  async function fetchData() {
    setLoading(true);
    setTimeout(async () => {
      if (status === ACTIVE) {
  const activeData = await fetchMealData(ACTIVE);
  setActiveMeals((prev) => {
    const existingIds = new Set(prev.map((meal) => meal._id));
    const newMeals = activeData.filter((meal) => !existingIds.has(meal._id));
    return [...prev, ...newMeals];
  });
  setIsChangeActive(false);
} else if (status === GRANTED) {
  const grantedData = await fetchMealData(GRANTED);
  setGrantedMeals((prev) => {
    const existingIds = new Set(prev.map((meal) => meal._id));
    const newMeals = grantedData.filter((meal) => !existingIds.has(meal._id));
    return [...prev, ...newMeals];
  });
  setIsChangeGranted(false);
} else if (status === EXPIRED) {
  const expiredData = await fetchMealData(EXPIRED);
  setBlacklistMeals((prev) => {
    const existingIds = new Set(prev.map((meal) => meal._id));
    const newMeals = expiredData.filter((meal) => !existingIds.has(meal._id));
    return [...prev, ...newMeals];
  });
  setIsChangeExpired(false);
}


      setLoading(false);
    }, 1000);
  }

  // expired meals from activeMeals to blacklistMeals without refetch
  useEffect(() => {
    if (
      status !== ACTIVE ||
      !Array.isArray(activeMeals) ||
      activeMeals.length === 0
    )
      return;

    const now = new Date();
    const expired = activeMeals
      .filter((meal) => new Date(meal.expiration) <= now)
      .map((meal) => ({ ...meal, status: EXPIRED }));

    const stillActive = activeMeals.filter(
      (meal) => new Date(meal.expiration) > now
    );

    if (expired.length > 0) {
      setActiveMeals(stillActive);
      setBlacklistMeals((prev) => {
        const newIds = new Set(prev.map((m) => m._id));
        const uniqueExpired = expired.filter((m) => !newIds.has(m._id));
        return [...uniqueExpired, ...prev];
      });

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
  }, [activeMeals, status]);

  const handleDelete = async (id) => {
    const deletedId = await deleteMeal(id);
    if (deletedId) {
      toast.success("Meal deleted successfully!");
      setActiveMeals((prev) => prev.filter((meal) => meal._id !== deletedId));
    }
  };

  return (
    <section className="w-full mx-auto bg-white border-[1px] border-zinc-200 rounded-xl shadow-lg mt-4 mb-4">
      <h2
        className={`text-[23px] font-bold ${color} p-4 border-b ${bg} rounded-t-xl`}
      >
        {name}
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-800"></div>
        </div>
      ) : (
        <>
          {status === ACTIVE &&
            (activeMeals?.length > 0 ? (
              activeMeals.map((meal, i) => (
                <MealCard
                  key={i}
                  meal={meal}
                  color={color}
                  status={ACTIVE}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <NoMeals
                message="No active meals found"
                hint="Start adding meals to see them here."
              />
            ))}

          {status === GRANTED &&
            (grantedMeals?.length > 0 ? (
              grantedMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} status={GRANTED} />
              ))
            ) : (
              <NoMeals
                message="No granted meals found"
                hint="Check back later for updates."
              />
            ))}

          {status === EXPIRED &&
            (blacklistMeals?.length > 0 ? (
              blacklistMeals.map((meal, i) => (
                <MealCard key={i} meal={meal} color={color} status={EXPIRED} />
              ))
            ) : (
              <NoMeals
                message="No expired meals found"
                hint="All meals are currently active or awarded."
              />
            ))}
        </>
      )}
    </section>
  );
};

const NoMeals = ({ message, hint }) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <p className="text-lg font-semibold">{message}</p>
    <p className="text-sm">{hint}</p>
  </div>
);

export default ActiveMealsSection;
