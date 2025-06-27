import { useChange } from "../Context/ChangeContext";
import { useSecureFetch } from "./useSecureFetch";

export function useHandleDelete() {
  const { setIsChangeActive } = useChange();
  const secureFetch = useSecureFetch();

  return async function (id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete the campaign?"
    );
    if (!confirmed) return null;

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
          // alert("Campaign deleted successfully!");
          // setIsChangeActive(true);
          return id; // return the deleted campaign ID
        } else {
          alert(data.error || "Failed to delete campaign.");
          return null;
        }
      }
    } catch (err) {
      console.error("Error while deleting a campaign", err);
      return null;
    }
  };
}
