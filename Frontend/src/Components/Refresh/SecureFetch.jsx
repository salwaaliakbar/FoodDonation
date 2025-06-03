import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useSecureFetch() {
  const navigate = useNavigate();

  return async function secureFetch(url, options = {}, retry = true) {
    try {
      const res = await fetch(url, {
        ...options,
        credentials: "include",
      });
      const data = await res.json();

      if (res.status !== 401) return data;

      if (
        res.status === 401 &&
        (data.code === "TOKEN_MISSING" || data.code === "TOKEN_EXPIRE") &&
        retry
      ) {
        const refreshRes = await fetch("http://localhost:5000/api/refresh", {
          method: "POST",
          credentials: "include",
        });

        const refreshData = await refreshRes.json();

        if (refreshData.success) {
          return secureFetch(url, options, false);
        } else {
          // Check current path before showing toast
          const currentPath = window.location.pathname;

          const publicPaths = ["/", "/about", "/services", "/contact", "/ResetPassword"]; // add your public routes
          const isOnPublicPage =
            publicPaths.includes(currentPath) ||
            currentPath.startsWith("/ResetPassword");

          if (!isOnPublicPage) {
            toast.error("Session expired. Login again...", {
              onClose: () => navigate("/"),
              autoClose: 3000,
            });
          }
        }
      }

      return data;
    } catch (err) {
      console.error("secureFetch error:", err);
      throw err;
    }
  };
}
