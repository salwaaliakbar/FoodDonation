import { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { ACTIVE } from "../Components/CONSTANTS";

function useJoinMealSocket({ status, meal, setAppliedList }) {
  const socket = useSocket();

  useEffect(() => {
    if (status !== ACTIVE) return;

    socket.emit("joinNotificationRoom", meal.createdBy?._id);

    const handler = (data) => {
      if (data.mealId === meal._id) {
        setAppliedList((prev) => [...prev, data.newApplicant]);
      }
    };

    socket.on("meal_applied", handler);
    return () => socket.off("meal_applied", handler);
  }, [socket, status, meal._id, meal.createdBy?._id, setAppliedList]);
}

export default useJoinMealSocket;
