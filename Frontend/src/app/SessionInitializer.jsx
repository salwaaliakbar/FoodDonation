import { useEffect } from "react";
import { useData } from "../context/UserContext";
import { useChange } from "../context/ChangeContext";
import { useSecureFetch } from "../customHooks/useSecureFetch";

function SessionInitializer() {
  const { setUser } = useData();
  const { setActiveMeals, setGrantedMeals, setBlacklistMeals } = useChange();
  const secureFetch = useSecureFetch();

  useEffect(() => {
    // Restore session data on app load
    async function restoreSession() {
      try {
        const data = await secureFetch("http://localhost:5000/api/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookies for auth
        });

        // If session is valid, update global state
        if (data?.success) {
          setUser(data.userDetails);
          setActiveMeals(data.activeMeals);
          setGrantedMeals(data.grantedMeals);
          setBlacklistMeals(data.blacklistMeals);
        }
      } catch (err) {
        console.error("Error during session restore:", err); // log failure
      }
    }

    restoreSession(); // run once on mount
  }, []);

  return null; // no UI to render
}

export default SessionInitializer;
