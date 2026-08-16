import { useEffect } from "react";
import { useData } from "../context/UserContext";
import { useSecureFetch } from "../customHooks/useSecureFetch";
import { useChange } from "../context/ChangeContext";
import { API_BASE_URL } from "../config/api";

function SessionInitializer() {
  const { setUser } = useData();
  const { setActiveMeals, setGrantedMeals, setBlacklistMeals } = useChange();
  const secureFetch = useSecureFetch();

  useEffect(() => {
    // Restore session data on app load
    async function restoreSession() {
      try {
        const data = await secureFetch(`${API_BASE_URL}/api/me`, {
          method: "GET",
          credentials: "include",
        });

        if (data?.success) {
          console.log("restored session");
          setUser(data.userDetails);
          setActiveMeals(data.activeMeals);
          setGrantedMeals(data.grantedMeals);
          setBlacklistMeals(data.blacklistMeals);
        }
      } catch (err) {
        if (err?.response?.status !== 401) {
          console.error("Error during session restore:", err);
        }
      }
    }

    restoreSession();
  }, []);

  return null;
}

export default SessionInitializer;
