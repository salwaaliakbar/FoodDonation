import { useEffect } from "react";
import { useData } from "../ContextAPIs/UserContext";
import { useChange } from "../ContextAPIs/ChangeContext"
import { useSecureFetch } from "./Refresh/SecureFetch";

function SessionInitializer() {
  const { setUser } = useData();
  const { setActiveMeals, setGrantedMeals, setBlacklistMeals } = useChange();
  const secureFetch = useSecureFetch();

  useEffect(() => {
    async function restoreSession() {
      try {
        const data = await secureFetch("http://localhost:5000/api/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (data?.success) {
          setUser(data.userDetails);
          setActiveMeals(data.activeMeals);
          setGrantedMeals(data.grantedMeals);
          setBlacklistMeals(data.blacklistMeals);
        }
      } catch (err) {
        console.error("Error during session restore:", err);
      }
    }

    restoreSession();
  }, []);

  return null; 
}

export default SessionInitializer;
