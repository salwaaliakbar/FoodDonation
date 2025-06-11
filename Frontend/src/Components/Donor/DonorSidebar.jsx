import React, { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { useData } from "../ContextAPIs/UserContext";
import "font-awesome/css/font-awesome.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useChange } from "../ContextAPIs/ChangeContext";

const DonorSidebar = () => {
  const navigate = useNavigate();
  const { setUser } = useData();
  const {
    setIsChangeActive,
    setIsChangeGranted,
    setIsChangeExpired,
    setLoading,
    setActiveMeals,
    setGrantedMeals,
    setBlacklistMeals,
    setIsLoggedOut
  } = useChange();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      await fetch("http://localhost:5000/api/logout", {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      setActiveMeals([])
      setGrantedMeals([])
      setBlacklistMeals([])
      setIsChangeActive(true);
      setIsChangeGranted(true);
      setIsChangeExpired(true);
      setIsLoggedOut(true)
      setLoading(false);
      navigate("/");
    } else {
      alert("Logout cancelled");
    }
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile */}
      <button
        className=" fixed top-5 left-2 z-50 text-2xl text-green-800 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className={`fa ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[55%] sm:w-[50%] md:w-[30%] lg:w-[20%] bg-white flex flex-col justify-between shadow-lg z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="h-20 border-b-[1.5px] border-b-green-800 flex items-center justify-center">
          <img
            className="md:w-80 md:h-19 w-50 h-15 rounded-full cursor-pointer"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 md:px-4 py-6 space-y-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink to="/donorDashBoard" end>
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-800 text-white" : ""
                    }`}
                  >
                    <i className="fa fa-home text-lg"></i>
                    Dashboard
                  </div>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/donorDashBoard/generalfeed">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-800 text-white" : ""
                    }`}
                  >
                    <i className="fa fa-newspaper-o text-lg"></i>
                    General Field
                  </div>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/donorDashBoard/history">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-800 text-white" : ""
                    }`}
                  >
                    <i className="fa fa-history text-lg"></i>
                    Donation History
                  </div>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/donorDashBoard/createCampaign">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-800 text-white" : ""
                    }`}
                  >
                    <i className="fa fa-bullhorn text-lg"></i>
                    Create Campaigns
                  </div>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/donorDashBoard/profile">
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-2 mx-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive ? "bg-green-800 text-white" : ""
                    }`}
                  >
                    <i className="fa fa-user-circle text-lg"></i>
                    My Profile
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4">
          <button
            href="#"
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
