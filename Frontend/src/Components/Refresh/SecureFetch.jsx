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

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text);
      }

      // Handle rate limit errors
      if (res.status === 429) {
        toast.error(
          data.message || "Too many requests. Please try again later."
        );
        throw new Error(data.message);
      }

      // Handle token expiration
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
          const currentPath = window.location.pathname;
          const publicPaths = [
            "/",
            "/about",
            "/services",
            "/contact",
            "/ResetPassword",
          ];
          const isOnPublicPage =
            publicPaths.includes(currentPath) ||
            currentPath.startsWith("/ResetPassword");

          const privatePaths = [
            "/recipent",
            "/recipent/profile",
            "/generalfeed",
            "/granted",
            "/active",
          ];
          const isOnPrivatePage =
            currentPath.startsWith("/donorDashBoard") ||
            privatePaths.includes(currentPath);

          if (isOnPrivatePage) {
            toast.error("Session expired. Login again...", {
              onClose: () => navigate("/"),
              autoClose: 3000,
            });
          }
        }

        return;
      }

      // Generic error handling
      if (!res.ok) {
        console.log(res);
        toast.error(data?.message || "Something went wrong.");
        throw new Error(data?.message || "Request failed.");
      }

      return data;
    } catch (err) {
      console.error("secureFetch error:", err);
      const msg = err.message.toLowerCase();
      if (
        !msg.includes("too many requests") &&
        !msg.includes("session expired")
      ) {
        toast.error("Something went wrong. Please try again later.");
      }
      throw err;
    }
  };
}
