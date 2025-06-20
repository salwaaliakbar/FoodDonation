import { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { ACTIVE } from "../Components/CONSTANTS";
import { useChange } from "../Context/ChangeContext";

function useJoinMealSocket({ status, meal, setAppliedList }) {
  const socket = useSocket();
  const { setActiveMeals } = useChange();

  useEffect(() => {
    if (status !== ACTIVE) return;

    const handler = (data) => {
      if (data.mealId === meal._id) {
        setAppliedList((prev) => [data.newApplicant, ...prev]);
        setActiveMeals((prev) =>
          prev.map((meal) =>
            meal._id === data.mealId
              ? { ...meal, applied: [data.newApplicant, ...meal.applied] }
              : meal
          )
        );
      }
    };

    socket.on("meal_applied", handler);
    return () => socket.off("meal_applied", handler);
  }, [socket, status, meal._id, meal.createdBy?._id, setAppliedList]);
}

export default useJoinMealSocket;
