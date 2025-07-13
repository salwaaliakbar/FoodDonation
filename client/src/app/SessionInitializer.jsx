import { useEffect } from "react";
import { useData } from "../Context/UserContext";
import { useSecureFetch } from "../customHooks/useSecureFetch";
import { useChange } from "../Context/ChangeContext";

function SessionInitializer() {
  const { setUser } = useData();
  const { setActiveMeals, setGrantedMeals, setBlacklistMeals } = useChange();
  const secureFetch = useSecureFetch();

  useEffect(() => {
    // Restore session data on app load
    async function restoreSession() {
      try {
        const data = await secureFetch("http://localhost:5000/api/me", {
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
