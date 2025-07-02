import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import "font-awesome/css/font-awesome.min.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../context/UserContext";
import { useChange } from "../../Context/ChangeContext";
import { EllipsisVertical, X } from "lucide-react";
import ConfirmationDialog from "../../components/Common/ConfirmationDialog";
import StatusDialog from "../../components/Common/StatusDialog";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { setUser } = useData();
  const {
    setIsChangeActive,
    setIsChangeGranted,
    setIsChangeExpired,
    setLoading,
  } = useChange();

  const [confirmation, setConfirmation] = useState({
    show: false,
    message: "",
  });

  const [status, setStatus] = useState({
    show: false,
    success: true,
    message: "",
    error: "",
  });

  // Show confirmation popup
  const handleLogout = () => {
    setConfirmation({
      show: true,
      message: "Are you sure you want to logout?",
    });
  };

  // Confirmed logout logic
  const confirmLogout = async () => {
    setConfirmation({ show: false });

    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Logout failed");
      }

      // Reset states
      setUser(null);
      setIsChangeActive(true);
      setIsChangeGranted(true);
      setIsChangeExpired(true);
      setLoading(false);

      setStatus({
        show: true,
        success: true,
        message: "Logged out successfully!",
        error: "",
      });
    } catch (err) {
      console.error("Logout failed:", err);
      setStatus({
        show: true,
        success: false,
        message: "Logout failed",
        error: err.message,
      });
    }
  };

  return (
    <>
      {/* Confirmation Dialog */}
      {confirmation.show && (
        <ConfirmationDialog
          message={confirmation.message}
          yes={confirmLogout}
          no={() => setConfirmation({ show: false })}
        />
      )}

      {/* Status Dialog */}
      {status.show && (
        <StatusDialog
          message={status.message}
          success={status.success}
          error={status.error}
          onClose={() => {
            setStatus({ ...status, show: false });
            if (status.success) navigate("/");
          }}
        />
      )}

      {/* Sidebar Toggle (Mobile Only) */}
      <button
        className="fixed top-5 left-2 z-50 text-2xl lg:hidden transition-colors duration-300 text-green-800 w-10 h-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <EllipsisVertical />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen w-[60%] sm:w-[45%] md:w-[30%] lg:w-[20%] bg-white flex flex-col justify-between shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-20 border-b-[1.5px] border-b-green-700 flex items-center justify-center">
          <Link to="/recipent" onClick={() => setIsSidebarOpen(false)}>
            <img
              className="md:w-80 md:h-19 w-50 h-15 rounded-full cursor-pointer"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 md:px-4 py-6 space-y-4 overflow-y-auto">
          <ul className="space-y-2">
            {[
              { path: "/recipent", icon: "fa-home", label: "Dashboard" },
              {
                path: "/recipent/generalfeed",
                icon: "fa-newspaper-o",
                label: "General Feed",
              },
              {
                path: "/recipent/active",
                icon: "fa-cutlery",
                label: "Active Meals",
              },
              {
                path: "/recipent/granted",
                icon: "fa-check-circle",
                label: "Granted Meals",
              },
              {
                path: "/recipent/profile",
                icon: "fa-user-circle",
                label: "My Profile",
              },
            ].map(({ path, icon, label }) => (
              <li key={path}>
                <Link to={path} onClick={() => setIsSidebarOpen(false)}>
                  <div
                    className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPath === path ? "bg-green-800 text-white" : ""
                    }`}
                  >
                    <i className={`fa ${icon} text-lg`}></i>
                    {label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4">
          <button
            className="block w-full text-center px-4 py-2 bg-green-900 text-white font-bold text-lg rounded-lg transition-colors hover:bg-green-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
