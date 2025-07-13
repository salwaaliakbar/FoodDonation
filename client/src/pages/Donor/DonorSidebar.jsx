import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { useData } from "../../Context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useChange } from "../../Context/ChangeContext";
import { EllipsisVertical, X } from "lucide-react";
import ConfirmationDialog from "../../components/Common/ConfirmationDialog";
import StatusDialog from "../../components/Common/StatusDialog";

const DonorSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const { setUser } = useData();
  const {
    setIsChangeActive,
    setIsChangeGranted,
    setIsChangeExpired,
    setLoading,
    setActiveMeals,
    setGrantedMeals,
    setBlacklistMeals,
    setIsLoggedOut,
  } = useChange();

  // Show confirmation popup
  const handleLogout = () => {
    setConfirmation({
      show: true,
      message: "Are you sure you want to logout?",
    });
  };

  // Logout API call with side effects
  const confirmLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Logout failed");
      }

      setStatus({
        show: true,
        success: true,
        message: "Logged out successfully!",
        error: "",
      });

      setConfirmation({ show: false });
    } catch (err) {
      console.error("Logout failed:", err);
      setStatus({
        show: true,
        success: false,
        message: "Logout failed",
        error: err.message || String(err),
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
          no={() => setConfirmation({ ...confirmation, show: false })}
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
            if (status.success) {
              // Navigate first, then reset states after navigation completes
              navigate("/", { replace: true });
              setTimeout(() => {
                setActiveMeals([]);
                setGrantedMeals([]);
                setBlacklistMeals([]);
                setIsChangeActive(true);
                setIsChangeGranted(true);
                setIsChangeExpired(true);
                setIsLoggedOut(true);
                setLoading(false);
                setUser({});
              }, 50);
            }
          }}
        />
      )}

      {/* Sidebar toggle (Mobile only) */}
      <button
        className="fixed top-5 left-2 z-50 text-2xl lg:hidden transition-colors duration-300 text-green-800 w-10 h-10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <EllipsisVertical />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[60%] sm:w-[45%] md:w-[30%] lg:w-[20%] bg-white flex flex-col justify-between shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-20 border-b-[1.5px] border-b-green-800 flex items-center justify-center">
          <img
            className="md:w-80 md:h-19 w-50 h-15 rounded-full cursor-pointer"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 md:px-4 py-6 space-y-4 overflow-y-auto">
          <ul className="space-y-2">
            {[
              {
                path: "/donorDashBoard",
                icon: "fa-home",
                label: "Dashboard",
                exact: true,
              },
              {
                path: "/donorDashBoard/generalfeed",
                icon: "fa-newspaper-o",
                label: "General Field",
              },
              {
                path: "/donorDashBoard/history",
                icon: "fa-history",
                label: "Donation History",
              },
              {
                path: "/donorDashBoard/createCampaign",
                icon: "fa-bullhorn",
                label: "Create Campaigns",
              },
              {
                path: "/donorDashBoard/profile",
                icon: "fa-user-circle",
                label: "My Profile",
              },
            ].map(({ path, icon, label, exact }) => (
              <li key={path}>
                <NavLink to={path} end={exact}>
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive ? "bg-green-800 text-white" : ""
                      }`}
                    >
                      <i className={`fa ${icon} text-lg`}></i>
                      {label}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4">
          <button
            className="block w-full text-center px-4 py-2 bg-green-800 text-white font-bold text-lg rounded-lg transition-colors hover:bg-green-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DonorSidebar;
