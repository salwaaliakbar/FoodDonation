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

      // Rate limit handling
      if (res.status === 429) {
        toast.error(data.error || "Too many requests. Please try again later.");
        throw new Error(data.error);
      }

      // Token expired or missing, attempt refresh
      if (
        res.status === 401 &&
        (data.code === "TOKEN_MISSING" || data.code === "TOKEN_EXPIRE") &&
        retry
      ) {
        let refreshData = {};

        try {
          const refreshRes = await fetch("http://localhost:5000/api/refresh", {
            method: "GET",
            credentials: "include",
          });

          // Silent ignore if no refresh token (first visit or expired session)
          if (refreshRes.status === 401) return;

          refreshData = await refreshRes.json();
        } catch (err) {
          console.warn("Silent refresh error:", err);
          return;
        }

        if (refreshData.success) {
          return secureFetch(url, options, false); // retry once
        } else {
          const currentPath = window.location.pathname;
          const publicPaths = ["/", "/about", "/services", "/contact", "/ResetPassword"];
          const isOnPublicPage =
            publicPaths.includes(currentPath) || currentPath.startsWith("/ResetPassword");

          const privatePaths = [
            "/recipent",
            "/recipent/profile",
            "/generalfeed",
            "/granted",
            "/active",
          ];
          const isOnPrivatePage =
            currentPath.startsWith("/donorDashBoard") || privatePaths.includes(currentPath);

          if (isOnPrivatePage) {
            toast.error("Session expired. Login again...", {
              onClose: () => navigate("/"),
              autoClose: 3000,
            });
          }

          return;
        }
      }

      // Generic error handler
      if (!res.ok) {
        toast.error(data?.error || "Something went wrong.");
        throw new Error(data?.error || "Request failed.");
      }

      return data;
    } catch (err) {
      const msg = (err?.message || "").toLowerCase();

      const knownErrors = [
        "too many requests",
        "expired token",
        "no token",
        "request failed",
        "unauthorized",
      ];

      const shouldToast = !knownErrors.some((e) => msg.includes(e));
      if (shouldToast) {
        toast.error("Something went wrong. Please try again later.");
      }

      // Only log unknown errors
      if (!msg.includes("unauthorized") && !msg.includes("token")) {
        console.error("secureFetch error:", err);
      }

      throw err;
    }
  };
}
