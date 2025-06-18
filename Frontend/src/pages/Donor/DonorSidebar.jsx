import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { useData } from "../../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useChange } from "../../Context/ChangeContext";

const DonorSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Global state context
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

  // Handle logout logic
  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return alert("Logout cancelled");

    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        credentials: "include",
      });

      // Reset states
      setUser(null);
      setActiveMeals([]);
      setGrantedMeals([]);
      setBlacklistMeals([]);
      setIsChangeActive(true);
      setIsChangeGranted(true);
      setIsChangeExpired(true);
      setIsLoggedOut(true);
      setLoading(false);

      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Something went wrong during logout.");
    }
  };

  return (
    <div>
      {/* Hamburger toggle (Mobile only) */}
      <button
        className="fixed top-5 left-2 z-50 text-2xl text-green-800 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className={`fa ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-screen w-[55%] sm:w-[50%] md:w-[30%] lg:w-[20%] bg-white flex flex-col justify-between shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        {/* Logo area */}
        <div className="h-20 border-b-[1.5px] border-b-green-800 flex items-center justify-center">
          <img
            className="md:w-80 md:h-19 w-50 h-15 rounded-full cursor-pointer"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Navigation links */}
        <nav className="flex-1 md:px-4 py-6 space-y-4 overflow-y-auto">
          <ul className="space-y-2">
            {[
              { path: "/donorDashBoard", icon: "fa-home", label: "Dashboard", exact: true },
              { path: "/donorDashBoard/generalfeed", icon: "fa-newspaper-o", label: "General Field" },
              { path: "/donorDashBoard/history", icon: "fa-history", label: "Donation History" },
              { path: "/donorDashBoard/createCampaign", icon: "fa-bullhorn", label: "Create Campaigns" },
              { path: "/donorDashBoard/profile", icon: "fa-user-circle", label: "My Profile" },
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

        {/* Logout */}
        <div className="px-4 py-4">
          <button
            className="block w-full text-center px-4 py-2 bg-green-800 text-white font-bold text-lg rounded-lg transition-colors hover:bg-green-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorSidebar;
