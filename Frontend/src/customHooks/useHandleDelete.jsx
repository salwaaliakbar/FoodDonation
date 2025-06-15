import { useChange } from "../context/ChangeContext";
import { useSecureFetch } from "./useSecureFetch";

// call delete end point
export function useHandleDelete() {
  const { setIsChangeActive } = useChange();
  const secureFetch = useSecureFetch();

  return async function ( id ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete the camapign?"
    );
    if (!confirmed) return;

    try {
      if (id) {
        const data = await secureFetch(
          `http://localhost:5000/api/deleteCampaign/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (data.success) {
          alert("Campaign deleted successfully!");
          setIsChangeActive(true);
        } else {
          alert(data.error || "Failed to delete camapign.");
        }
      }
    } catch (err) {
      console.error("Error while deleting a camapign", err);
    }
  }
}
